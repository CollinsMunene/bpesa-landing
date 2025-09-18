import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Wallet, DollarSign, CheckCircle, AlertCircle, Loader2, LogOut, RefreshCw } from "lucide-react";

import { ethers } from "ethers";
import { useAccount, useBalance, useDisconnect } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

// Contract addresses
const RESERVE_CONTRACT = "0xb04F128Ba4F504C752b4Cb538B516774c15F0781";
const USDC_CONTRACT = "0x06efdbff2a14a7c8e15944d1f4a48f9f95f663a4";
const BKES_CONTRACT = "0xd62fBDd984241BcFdEe96915b43101912a9fcE69";

// Contract ABIs
const RESERVE_ABI = [
  {
    "inputs": [
      {"internalType": "address", "name": "token", "type": "address"}, 
      {"internalType": "uint256", "name": "amount", "type": "uint256"}
    ],
    "name": "deposit",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
   {
      "inputs": [
        {
          "internalType": "address",
          "name": "token",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        }
      ],
      "name": "depositTo",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
];

const ESCROW_ABI = [
  {
      "inputs": [
        {
          "internalType": "address",
          "name": "token",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "depositLiquidity",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
];


const ERC20_ABI = [
  {
    "inputs": [{"internalType": "address", "name": "spender", "type": "address"}, {"internalType": "uint256", "name": "amount", "type": "uint256"}],
    "name": "approve",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "owner", "type": "address"}],
    "name": "balanceOf",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "owner", "type": "address"}, {"internalType": "address", "name": "spender", "type": "address"}],
    "name": "allowance",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  }
];

async function fetchUsdToKes() {
  try {
    const res = await fetch("https://open.er-api.com/v6/latest/USD");
    const data = await res.json();
    return data?.rates?.KES || null;
  } catch (err) {
    console.error("Failed to fetch exchange rate", err);
    return null;
  }
}


export default function AgentDepositPage() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const { data: usdcBalance, isLoading: isLoadingBalance, refetch: refetchBalance } = useBalance({
    address,
    token: USDC_CONTRACT,
  });
  // For bKES balance
  const { data: bkesBalance, isLoading: isLoadingBkes, refetch: refetchBkes } = useBalance({
    address,
    token: BKES_CONTRACT,
  });

  const [depositAmount, setDepositAmount] = useState("");
  const [isDepositing, setIsDepositing] = useState(false);
  const [depositStatus, setDepositStatus] = useState(null); // 'success' | 'error' | null
  const [txHash, setTxHash] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
    // Tab state
  const [activeTab, setActiveTab] = useState<"agent" | "liquidity">("agent");
  const [lockAmount, setLockAmount] = useState("");
  const [isLocking, setIsLocking] = useState(false);
  const [lockStatus, setLockStatus] = useState<null | "success" | "error">(null);
  const [lockError, setLockError] = useState("");

   // ✅ NEW state for exchange rate
  const [usdToKes, setUsdToKes] = useState<number | null>(null);

   // ✅ Fetch exchange rate on mount
  useEffect(() => {
    fetchUsdToKes().then((rate) => {
      if (rate) setUsdToKes(rate);
    });
  }, []);
  
  async function handleDeposit() {
    if (!depositAmount || parseFloat(depositAmount) <= 0) {
      setErrorMessage("Please enter a valid amount greater than 0");
      return;
    }
    // --- Validate To Address ---
    if (!toAddress || !ethers.isAddress(toAddress)) {
      setErrorMessage("Please enter a valid recipient address.");
      return;
    }
    // --- End validation ---

    const depositValue = parseFloat(depositAmount);
    const balanceValue = parseFloat(usdcBalance?.formatted || "0");

    if (depositValue > balanceValue) {
      setErrorMessage(`Insufficient balance. You have ${balanceValue} USDC available.`);
      return;
    }

    if (balanceValue === 0) {
      setErrorMessage("You have no USDC balance. Please add USDC to your wallet first.");
      return;
    }

    try {
      setIsDepositing(true);
      setDepositStatus(null);
      setErrorMessage("");

      // use ethers signer
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const usdc = new ethers.Contract(USDC_CONTRACT, ERC20_ABI, signer);
      const reserve = new ethers.Contract(RESERVE_CONTRACT, RESERVE_ABI, signer);

      // const toBkesSend = (depositAmount * usdToKes)

      const amountWei = ethers.parseUnits(depositAmount, 6);

      // check allowance
      const allowance = await usdc.allowance(address, RESERVE_CONTRACT);
      if (allowance < amountWei) {
        const approveTx = await usdc.approve(RESERVE_CONTRACT, amountWei);
        await approveTx.wait();
      }

      // deposit
      const depositTx = await reserve.depositTo(USDC_CONTRACT, amountWei,toAddress);
      await depositTx.wait();

      setDepositStatus("success");
      setTxHash(depositTx.hash);
      setDepositAmount("");
      
      // Refresh balance after successful deposit
      setTimeout(() => {
        refetchBalance();
      }, 2000);

    } catch (err) {
      console.error(err);
      setDepositStatus("error");
      setErrorMessage(err.message || "Transaction failed. Please try again.");
    } finally {
      setIsDepositing(false);
    }
  }

  console.log("inserted amount:", depositAmount);

  function formatAddress(addr) {
    if (!addr) return "";
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  }

  const handleDisconnect = () => {
    disconnect();
    setDepositAmount("");
    setDepositStatus(null);
    setErrorMessage("");
  };

  const balanceValue = parseFloat(usdcBalance?.formatted || "0");
  const depositValue = parseFloat(depositAmount || "0");
  const hasBalance = balanceValue > 0;
  const isAmountValid = depositValue > 0 && depositValue <= balanceValue;
  console.log("balanceValue", balanceValue);
  console.log("depositValue", depositValue);
  console.log("is valid", isAmountValid);



  // Handler for locking liquidity (using bKES)
  async function handleLockLiquidity() {
    if (!lockAmount || parseFloat(lockAmount) <= 0) {
      setLockError("Please enter a valid amount greater than 0");
      return;
    }

    const lockValue = parseFloat(lockAmount);
    const bkesBalanceValue = parseFloat(bkesBalance?.formatted || "0");

    if (lockValue > bkesBalanceValue) {
      setLockError(`Insufficient balance. You have ${bkesBalanceValue} bKES available.`);
      return;
    }

    if (bkesBalanceValue === 0) {
      setLockError("You have no bKES balance. Please add bKES to your wallet first.");
      return;
    }

    try {
      setIsLocking(true);
      setLockStatus(null);
      setLockError("");

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const bkes = new ethers.Contract(BKES_CONTRACT, ERC20_ABI, signer);
      const escrow = new ethers.Contract(RESERVE_CONTRACT, ESCROW_ABI, signer);

      const amountWei = ethers.parseUnits(lockAmount, 18); // bKES usually has 18 decimals

      // check allowance
      const allowance = await bkes.allowance(address, RESERVE_CONTRACT);
      if (allowance < amountWei) {
        const approveTx = await bkes.approve(RESERVE_CONTRACT, amountWei);
        await approveTx.wait();
      }

      // lock liquidity
      const lockTx = await escrow.depositLiquidity(BKES_CONTRACT, amountWei);
      await lockTx.wait();

      setLockStatus("success");
      setLockAmount("");

      setTimeout(() => {
        refetchBkes();
      }, 2000);

    } catch (err) {
      setLockStatus("error");
      setLockError(err.message || "Transaction failed. Please try again.");
    } finally {
      setIsLocking(false);
    }
  }

  // --- Add To Address state and logic ---
  const [toAddress, setToAddress] = useState(address || "");

  useEffect(() => {
    // Get ?toaddress from URL if present
    const params = new URLSearchParams(window.location.search);
    const param = params.get("toaddress");
    if (param && ethers.isAddress(param)) {
      setToAddress(param);
    } else if (address) {
      setToAddress(address);
    }
  }, [address]);
  // --- End To Address logic ---

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
            <a href='/'><button className="inline-flex items-center text-primary hover:text-primary/80 transition-colors mb-6">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </button></a>

          {/* Tabs */}
          <div className="flex justify-center mb-8">
            <button
              className={`px-6 py-2 rounded-t-lg font-semibold border-b-2 transition-colors ${
                activeTab === "agent"
                  ? "border-primary text-primary bg-white"
                  : "border-transparent text-muted-foreground bg-muted/30"
              }`}
              onClick={() => setActiveTab("agent")}
            >
              Agent Loader
            </button>
            {/* <button
              className={`px-6 py-2 rounded-t-lg font-semibold border-b-2 transition-colors ${
                activeTab === "liquidity"
                  ? "border-primary text-primary bg-white"
                  : "border-transparent text-muted-foreground bg-muted/30"
              }`}
              onClick={() => setActiveTab("liquidity")}
            >
              Liquidity Locker
            </button> */}
          </div>

          {/* Tab Content */}
          {activeTab === "agent" ? (
            <>
              {/* Header */}
              <div className="text-center mb-8">

                <div className="flex items-center justify-center space-x-1 mb-6">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-xl">B</span>
                  </div>
                  <span className="text-3xl font-bold text-primary">pesa</span>
                </div>
                <h1 className="text-4xl font-bold mb-4">Agent Float Loader</h1>
                <p className="text-xl text-muted-foreground max-w-md mx-auto">
                  Deposit USDC to receive bKES tokens for agent operations.
                </p>
              </div>

              {/* Wallet Connect */}
              {!isConnected ? (
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Wallet className="w-5 h-5 mr-2" />
                      Connect Wallet
                    </CardTitle>
                    <CardDescription>
                      Connect your wallet to start depositing USDC to the treasury.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-center">
                      <ConnectButton showBalance={false} chainStatus="icon" />
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <>
                  {/* Wallet Info */}
                  <Card className="mb-6">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="text-sm text-muted-foreground">Connected Wallet</p>
                          <p className="font-medium">{formatAddress(address)}</p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">USDC Balance</p>
                            <p className="font-medium flex items-center space-x-2">
                              {isLoadingBalance ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <>
                                  <span className={`${!hasBalance ? 'text-red-500' : ''}`}>
                                    {usdcBalance?.formatted || "0"} USDC
                                  </span>
                                  <button
                                    onClick={() => refetchBalance()}
                                    className="text-muted-foreground hover:text-primary transition-colors"
                                    title="Refresh balance"
                                  >
                                    <RefreshCw className="w-3 h-3" />
                                  </button>
                                </>
                              )}
                            </p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleDisconnect}
                            className="flex items-center space-x-1"
                          >
                            <LogOut className="w-3 h-3" />
                            <span>Disconnect</span>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Low Balance Warning */}
                  {!hasBalance && (
                    <Card className="mb-6 border-yellow-200 bg-yellow-50">
                      <CardContent className="pt-6">
                        <div className="flex items-start space-x-3">
                          <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                          <div className="flex-1">
                            <p className="font-medium text-yellow-900">No USDC Balance</p>
                            <p className="text-sm text-yellow-700 mt-1">
                              You need USDC in your wallet to make a deposit. Please add USDC to your wallet first.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Success Message */}
                  {depositStatus === "success" && (
                    <Card className="mb-6 border-green-200 bg-green-50">
                      <CardContent className="pt-6">
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                          <div className="flex-1">
                            <p className="font-medium text-green-900">Deposit Successful!</p>
                            <p className="text-sm text-green-700 mt-1">
                              Your USDC has been deposited. bKES tokens will be minted shortly.
                              Kindly check you bKES balance.
                            </p>
                            {txHash && (
                              <a
                                href={`https://scrollscan.com/tx/${txHash}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-green-600 mt-2 font-mono hover:underline block"
                              >
                                View on Explorer: {formatAddress(txHash)}
                              </a>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Error Message */}
                  {depositStatus === "error" && (
                    <Card className="mb-6 border-red-200 bg-red-50">
                      <CardContent className="pt-6">
                        <div className="flex items-start space-x-3">
                          <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                          <div className="flex-1">
                            <p className="font-medium text-red-900">Deposit Failed</p>
                            <p className="text-sm text-red-700 mt-1">
                              {errorMessage || "There was an error processing your deposit. Please try again."}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Input Validation Error */}
                  {errorMessage && depositStatus !== "error" && (
                    <Card className="mb-6 border-red-200 bg-red-50">
                      <CardContent className="pt-6">
                        <div className="flex items-start space-x-3">
                          <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-sm text-red-700">{errorMessage}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Deposit Form */}
                  <Card className="mb-8">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <DollarSign className="w-5 h-5 mr-2" />
                        Deposit USDC
                      </CardTitle>
                      <CardDescription>
                        Enter the amount of USDC you want to deposit. You'll receive equivalent bKES tokens.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="amount">Amount (USDC)</Label>
                          <div className="relative">
                            <Input
                              id="amount"
                              type="number"
                              placeholder="Enter amount"
                              value={depositAmount}
                              onChange={(e) => {
                                setDepositAmount(e.target.value);
                                setErrorMessage("");
                              }}
                              min="0"
                              step="0.01"
                              max={balanceValue}
                              className="pl-8"
                              disabled={!hasBalance}
                            />
                            <DollarSign className="w-4 h-4 absolute left-2.5 top-3 text-muted-foreground" />
                          </div>
                          {hasBalance && (
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>Available: {balanceValue} USDC</span>
                              <button
                                onClick={() => setDepositAmount(balanceValue.toString())}
                                className="text-primary hover:underline"
                                type="button"
                              >
                                Use Max
                              </button>
                            </div>
                          )}
                        </div>

                        {/* --- To Address Field --- */}
                        <div className="space-y-2">
                          <Label htmlFor="to-address">To Address</Label>
                          <Input
                            id="to-address"
                            type="text"
                            placeholder="Recipient wallet address"
                            value={toAddress}
                            onChange={(e) => setToAddress(e.target.value)}
                            className="pl-8"
                            autoComplete="off"
                          />
                          <p className="text-xs text-muted-foreground">
                            By default, this is your connected wallet. You can send to another address.
                          </p>
                        </div>
                        {/* --- End To Address Field --- */}

                        <div className="bg-muted/50 rounded-lg p-4">
                          <div className="flex justify-between text-sm">
                            <span>You will receive:</span>
                            <span className="font-medium">
                              {depositAmount && isAmountValid 
                                ? `${(Number(depositAmount) * usdToKes).toFixed(5)} bKES` 
                                : "0 bKES"}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            {usdToKes
                              ? `1 USDC ≈ ${usdToKes.toFixed(2)} bKES (based on USD→KES rate)`
                              : "Fetching live USD→KES rate..."}
                          </p>
                        </div>

                        <Button
                          onClick={handleDeposit}
                          disabled={isDepositing || !hasBalance || !isAmountValid}
                          className="w-full"
                          size="lg"
                        >
                          {isDepositing ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Processing Deposit...
                            </>
                          ) : !hasBalance ? (
                            <>
                              <AlertCircle className="w-4 h-4 mr-2" />
                              No USDC Balance
                            </>
                          ) : !isAmountValid ? (
                            <>
                              <DollarSign className="w-4 h-4 mr-2" />
                              Enter Valid Amount
                            </>
                          ) : (
                            <>
                              <DollarSign className="w-4 h-4 mr-2" />
                              Deposit USDC
                            </>
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}

                {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Mint Ratio</h3>
                 <p className="text-sm text-muted-foreground">
                    {usdToKes
                      ? `1 USDC ≈ ${usdToKes.toFixed(2)} bKES (based on USD→KES rate)`
                      : "Fetching live USD→KES rate..."}
                  </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Instant Mint</h3>
                <p className="text-sm text-muted-foreground">
                  bKES tokens are minted immediately after deposit
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Wallet className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Secure Treasury</h3>
                <p className="text-sm text-muted-foreground">
                  Your USDC is safely stored in our audited Reserve
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Terms */}
          <p className="text-center text-sm text-muted-foreground">
            By depositing USDC, you agree to our terms of service.
          </p>
            </>
          ) : (
            // Liquidity Locker UI (similar to deposit, but for locking)
            <>
              <div className="text-center mb-8">
                <div className="flex items-center justify-center space-x-1 mb-6">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-xl">B</span>
                  </div>
                  <span className="text-3xl font-bold text-primary">pesa</span>
                </div>
                <h1 className="text-4xl font-bold mb-4">Liquidity Locker</h1>
                <p className="text-xl text-muted-foreground max-w-md mx-auto">
                  Lock bKES tokens to your liquidity pool
                </p>
              </div>

              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <DollarSign className="w-5 h-5 mr-2" />
                    Lock bKES
                  </CardTitle>
                  <CardDescription>
                    Enter the amount of bKES you want to lock in the pool.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="lock-amount">Amount (bKES)</Label>
                      <div className="relative">
                        <Input
                          id="lock-amount"
                          type="number"
                          placeholder="Enter amount"
                          value={lockAmount}
                          onChange={(e) => {
                            const val = e.target.value;
                            // Allow empty string, block negatives
                            if (val === "" || Number(val) >= 0) {
                              setLockAmount(val);
                            } else {
                              setLockAmount("0");
                            }
                            setLockError("");
                          }}
                          min="0"
                          step="0.01"
                          max={parseFloat(bkesBalance?.formatted || "0")}
                          className="pl-8"
                          disabled={parseFloat(bkesBalance?.formatted || "0") === 0}
                        />
                        <DollarSign className="w-4 h-4 absolute left-2.5 top-3 text-muted-foreground" />
                      </div>
                      {parseFloat(bkesBalance?.formatted || "0") > 0 && (
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Available: {bkesBalance?.formatted || "0"} bKES</span>
                          <button
                            onClick={() => setLockAmount(bkesBalance?.formatted || "0")}
                            className="text-primary hover:underline"
                            type="button"
                          >
                            Use Max
                          </button>
                        </div>
                      )}
                    </div>

                    <Button
                      onClick={handleLockLiquidity}
                      disabled={isLocking || parseFloat(bkesBalance?.formatted || "0") === 0 || !(parseFloat(lockAmount) > 0 && parseFloat(lockAmount) <= parseFloat(bkesBalance?.formatted || "0"))}
                      className="w-full"
                      size="lg"
                    >
                      {isLocking ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Locking...
                        </>
                      ) : (
                        <>
                          <DollarSign className="w-4 h-4 mr-2" />
                          Lock bKES
                        </>
                      )}
                    </Button>

                    {/* Success/Error messages */}
                    {lockStatus === "success" && (
                      <div className="text-green-600 text-sm mt-2">Liquidity locked successfully!</div>
                    )}
                    {lockStatus === "error" && (
                      <div className="text-red-600 text-sm mt-2">{lockError}</div>
                    )}
                    {lockError && lockStatus !== "error" && (
                      <div className="text-red-600 text-sm mt-2">{lockError}</div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </>
          )}

        
        </div>
      </div>
    </div>
  );
}