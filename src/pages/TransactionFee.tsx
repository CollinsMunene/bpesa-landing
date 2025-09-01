import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CreditCard, Send, Download, Upload, ShoppingCart, Phone, AlertCircle } from "lucide-react";
import Header from "@/components/Header";
import ChatSidebar from "@/components/ChatSidebar";


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
      status: "Coming Soon"
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
                Transfer Fees - {selectedCurrency}
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

          <div className="mb-8">
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
              </div>

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
                    <li>• Percentage fees are calculated on transaction amount</li>
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
      <ChatSidebar />
    </div>
  );
};

export default TransactionFees;