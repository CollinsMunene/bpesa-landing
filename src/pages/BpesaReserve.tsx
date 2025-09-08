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

// Contract ABIs
const TREASURY_ABI = [
  {
    "inputs": [{"internalType": "address", "name": "token", "type": "address"}, {"internalType": "uint256", "name": "amount", "type": "uint256"}],
    "name": "deposit",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
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

  const [depositAmount, setDepositAmount] = useState("");
  const [isDepositing, setIsDepositing] = useState(false);
  const [depositStatus, setDepositStatus] = useState(null); // 'success' | 'error' | null
  const [txHash, setTxHash] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
      const treasury = new ethers.Contract(RESERVE_CONTRACT, TREASURY_ABI, signer);

      // const toBkesSend = (depositAmount * usdToKes)

      const amountWei = ethers.parseUnits(depositAmount, 6);

      // check allowance
      const allowance = await usdc.allowance(address, RESERVE_CONTRACT);
      if (allowance < amountWei) {
        const approveTx = await usdc.approve(RESERVE_CONTRACT, amountWei);
        await approveTx.wait();
      }

      // deposit
      const depositTx = await treasury.deposit(USDC_CONTRACT, amountWei);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">

          {/* Header */}
          <div className="text-center mb-8">
            <button className="inline-flex items-center text-primary hover:text-primary/80 transition-colors mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </button>
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
            All deposits are final and bKES tokens are non-refundable.
          </p>
        </div>
      </div>
    </div>
  );
}