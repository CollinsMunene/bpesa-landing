import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CreditCard, Send, Download, Upload, ShoppingCart, Phone, AlertCircle } from "lucide-react";
import Header from "@/components/Header";
import ChatSidebar from "@/components/ChatSidebar";
import { withdraw } from "viem/zksync";


const TransactionFees = () => {
  const [selectedCurrency, setSelectedCurrency] = useState("KES");

  const currencies = ["KES", "USD"];

  // P2P Transfer Fees
  const p2pFees = {
    KES: [
      { range: "1 - 100", fee: "Free" },
      { range: "101 - 2500", fee: "KES 5" },
      { range: "2,501 - 10,000", fee: "KES 30" },
      { range: "10,001 - 50,000", fee: "KES 45" },
      { range: "50,001 - 750,000", fee: "KES 50" }
    ],
    USD: [
      { range: "1+", fee: "$1" }
    ]
  };

  const merchantFees = {
    KES: [
      { range: "1 - 49", payfee: "KES 0" },
      { range: "50 - 100", payfee: "KES 0"},
      { range: "101 - 500", payfee: "KES 4" },
      { range: "501 - 1,000", payfee: "KES 9" },
      { range: "1,001 - 1,500", payfee: "KES 13"},
      { range: "1,501 - 2,500", payfee: "KES 18" },
      { range: "2,501 - 3,500", payfee: "KES 23" },
      { range: "3,501 - 5,000", payfee: "KES 32" },
      { range: "5,001 - 7,500", payfee: "KES 40" },
      { range: "7,501 - 10,000", payfee: "KES 46" },
      { range: "10,001 - 15,000", payfee: "KES 55" },
      { range: "15,001 - 20,000", payfee: "KES 60" },
      { range: "20,001 - 25,000", payfee: "KES 65" },
      { range: "25,001 - 30,000", payfee: "KES 70" },
      { range: "30,001 - 35,000", payfee: "KES 81" },
      { range: "35,001 - 40,000", payfee: "KES 97" },
      { range: "40,001 - 45,000", payfee: "KES 101" },
      { range: "45,001 - 50,000", payfee: "KES 106" },
      { range: "50,001 - 70,000", payfee: "KES 106" },
      { range: "70,001 - 250,000", payfee: "KES 106" },
    ],

    USD: [
      { range: "1+", payfee: "Work in progress" }
    ]
  };
  const withdrawFees = {
    KES: [
      { range: "50 - 100", withdrawalFee: "KES 11", agentCommission: "KES 11" },       // 5 + 6
      { range: "101 - 500", withdrawalFee: "KES 29", agentCommission: "KES 18" },      // 9 + 9
      { range: "501 - 1,000", withdrawalFee: "KES 29", agentCommission: "KES 21" },    // 10 + 11
      { range: "1,001 - 1,500", withdrawalFee: "KES 29", agentCommission: "KES 24" },  // 11 + 13
      { range: "1,501 - 2,500", withdrawalFee: "KES 29", agentCommission: "KES 28" },  // 12 + 16
      { range: "2,501 - 3,500", withdrawalFee: "KES 52", agentCommission: "KES 34" },  // 13 + 21
      { range: "3,501 - 5,000", withdrawalFee: "KES 69", agentCommission: "KES 41" },  // 15 + 26
      { range: "5,001 - 7,500", withdrawalFee: "KES 87", agentCommission: "KES 52" },  // 21 + 31
      { range: "7,501 - 10,000", withdrawalFee: "KES 115", agentCommission: "KES 65" },// 29 + 36
      { range: "10,001 - 15,000", withdrawalFee: "KES 167", agentCommission: "KES 87" },// 41 + 46
      { range: "15,001 - 20,000", withdrawalFee: "KES 185", agentCommission: "KES 117" },// 56 + 61
      { range: "20,001 - 35,000", withdrawalFee: "KES 197", agentCommission: "KES 157" },// 88 + 69
      { range: "35,001 - 50,000", withdrawalFee: "KES 278", agentCommission: "KES 280" },// 136 + 144
      { range: "50,001 - 150,000", withdrawalFee: "KES 309", agentCommission: "KES 379" },// 178 + 201
    ],
    USD: [
      { range: "1+", withdrawalFee: "work in progress", agentCommission: "work in progress" }
    ]
  };


  // Withdrawal and Deposit Fees (Bank/Mobile Money vs Agent)
  // const withdrawalFees = {
  //   KES: {
  //     bank: "KES 20 + 1.5%",
  //     agent: "KES 50"
  //   },
  //   USD: {
  //     bank: "$2.00 + 1.5%",
  //     agent: "$5.00"
  //   },
  //   EUR: {
  //     bank: "€1.80 + 1.5%",
  //     agent: "€4.00"
  //   },
  //   GBP: {
  //     bank: "£1.50 + 1.5%",
  //     agent: "£3.50"
  //   }
  // };

  // const depositFees = {
  //   KES: {
  //     bank: "Free",
  //     agent: "Free"
  //   },
  //   USD: {
  //     bank: "Free",
  //     agent: "Free"
  //   },
  //   EUR: {
  //     bank: "Free",
  //     agent: "Free"
  //   },
  //   GBP: {
  //     bank: "Free",
  //     agent: "Free"
  //   }
  // };

  // Other transaction fees
  // const otherFees = {
  //   KES: {
  //     paybill: "KES 10 + 0.5%",
  //     buyGoods: "KES 15 + 0.75%"
  //   },
  //   USD: {
  //     paybill: "$1.00 + 0.5%",
  //     buyGoods: "$1.50 + 0.75%"
  //   },
  //   EUR: {
  //     paybill: "€0.80 + 0.5%",
  //     buyGoods: "€1.20 + 0.75%"
  //   },
  //   GBP: {
  //     paybill: "£0.70 + 0.5%",
  //     buyGoods: "£1.00 + 0.75%"
  //   }
  // };

  // const transactionTypes = [
  //   {
  //     icon: Phone,
  //     title: "Paybill",
  //     description: "Pay bills and utilities",
  //     fee: otherFees[selectedCurrency].paybill
  //   },
  //   {
  //     icon: ShoppingCart,
  //     title: "Buy Goods",
  //     description: "Purchase from merchants",
  //     fee: otherFees[selectedCurrency].buyGoods
  //   }
  // ];

  const inProgressFeatures = [
    {
      icon: Download,
      title: "Withdrawal Fees",
      description: "Cash out to bank, mobile money, or through our agent network",
      status: "Coming Soon"
    },
    {
      icon: Upload,
      title: "Deposit Fees",
      description: "Add money to your Bpesa wallet through various channels",
      status: "Free"
    },
    {
      icon: Phone,
      title: "Paybill",
      description: "Pay bills and utilities",
      status: "In Progress"
    },
    {
      icon: ShoppingCart,
      title: "Buy Goods",
      description: "Purchase from merchants",
      status: "In Progress"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <Header />
          <div className="text-center mb-8">
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Transparent and competitive fees for all your digital payment needs across multiple currencies.
            </p>
          </div>

          {/* Currency Selector */}
          <div className="flex justify-center mb-8">
            <div className="flex space-x-2 bg-muted p-1 rounded-lg">
              {currencies.map((currency) => (
                <Button
                  key={currency}
                  variant={selectedCurrency === currency ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedCurrency(currency)}
                  className="px-6"
                >
                  {currency}
                </Button>
              ))}
            </div>
          </div>

          {/* P2P Transfer Fees */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Send className="w-5 h-5 mr-2" />
                Bpesa Users Transfer Fees - {selectedCurrency}
              </CardTitle>
              <CardDescription>
                Send money directly to other Bpesa users with our competitive rates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-semibold">Transaction Amount</th>
                      <th className="text-left py-3 px-4 font-semibold">Fee</th>
                    </tr>
                  </thead>
                  <tbody>
                    {p2pFees[selectedCurrency].map((fee, index) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-muted/50" : ""}>
                        <td className="py-3 px-4">{fee.range}</td>
                        <td className="py-3 px-4 font-medium text-primary">{fee.fee}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

        {/* Withdraw Transfer Fees */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Send className="w-5 h-5 mr-2" />
                Bpesa User withdraw & Agent commissions - {selectedCurrency}
              </CardTitle>
              <CardDescription>
                Withdraw money from your Bpesa account via Bpesa Agents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-semibold">Transaction Amount</th>
                      <th className="text-left py-3 px-4 font-semibold"> Withdrawal Fee</th>
                      <th className="text-left py-3 px-4 font-semibold">Agent Commission</th>
                    </tr>
                  </thead>
                  <tbody>
                    {withdrawFees[selectedCurrency].map((fee, index) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-muted/50" : ""}>
                        <td className="py-3 px-4">{fee.range}</td>
                        <td className="py-3 px-4 font-medium text-primary">{fee.withdrawalFee}</td>
                        <td className="py-3 px-4 font-medium text-primary">{fee.agentCommission}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

           {/* Merchant Transfer Fees */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Send className="w-5 h-5 mr-2" />
                Pay Goods & Services - {selectedCurrency}
              </CardTitle>
              <CardDescription>
                Pay for goods and services using Bpesa at registered merchants via Bpay
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-semibold">Transaction Amount</th>
                      <th className="text-left py-3 px-4 font-semibold">Fee</th>
                    </tr>
                  </thead>
                  <tbody>
                    {merchantFees[selectedCurrency].map((fee, index) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-muted/50" : ""}>
                        <td className="py-3 px-4">{fee.range}</td>
                        <td className="py-3 px-4 font-medium text-primary">{fee.payfee}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>



          {/* <div className="mb-8">
                <h2 className="text-2xl font-bold mb-6 text-center">Additional Features</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {inProgressFeatures.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <Card key={index} className="relative overflow-hidden">
                        <div className="absolute top-4 right-4">
                          
                          <div className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            {feature.status}
                          </div>
                        </div>
                        <CardContent className="pt-6 opacity-75">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                            <Icon className="w-6 h-6 text-primary" />
                          </div>
                          <h3 className="font-semibold mb-2">{feature.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {feature.description}
                          </p>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div> */}

          {/* Fee Information */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="w-5 h-5 mr-2" />
                Fee Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2 text-primary">What's Included</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Real-time transaction processing</li>
                    <li>• 24/7 customer support</li>
                    <li>• Advanced security features</li>
                    <li>• Transaction history & receipts</li>
                    <li>• Multi-currency support</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-primary">Important Notes</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• All fees are clearly displayed before confirmation</li>
                    <li>• No hidden charges or surprise fees</li>
                    <li>• Exchange rates updated in real-time</li>
                    <li>• Free deposits across all currencies</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <Card className="text-center bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <h3 className="text-2xl font-bold mb-2">Ready to Get Started?</h3>
              <p className="text-muted-foreground mb-6">
                Join thousands of users already on our network and be the first to experience these competitive rates.
              </p>
              <button onClick={() => window.history.back()}>
                <Button size="lg" className="px-8">
                  Download App
                </Button>
              </button>
            </CardContent>
          </Card>

          {/* Footer Note */}
          <p className="text-center text-sm text-muted-foreground mt-8">
            * Fees are subject to change. Current rates shown are effective as of launch. 
            All transactions are processed securely and fees are transparently displayed before confirmation.
          </p>
        </div>
      </div>
      {/* <ChatSidebar /> */}
    </div>
  );
};

export default TransactionFees;