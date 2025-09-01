import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Smartphone,
  Shield,
  Zap,
  Banknote,
  ArrowUpRight,
  ArrowDownLeft,
} from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative py-20 px-4 lg:px-8 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary-glow/5"></div>

      <div className="relative max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              <span>Borderless money transfer</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Send Money
              <br />
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                Globally
              </span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0">
              Send money to anyone with just a phone number. Deposit and
              withdraw cash at local agents. Works with any currency, anywhere
              in the world.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="hero" size="lg" className="text-lg px-8 py-3" 
              onClick={() => {
                  const section = document.getElementById("CTA");
                  section?.scrollIntoView({ behavior: "smooth" });
                }}>
                Download App
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>

              <Link to="/waitlist">
                <Button
                  variant="outline-hero"
                  size="lg"
                  className="text-lg px-8 py-3"
                >
                  Join Waitlist
                </Button>
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 mt-12 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-primary" />
                <span>Bank-level security</span>
              </div>
              <div className="flex items-center space-x-2">
                <Banknote className="w-4 h-4 text-primary" />
                <span>Multi Currency</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-primary font-bold">Near Zero</span>
                <span>fees</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10 mx-auto w-72 h-[600px] bg-gradient-to-br from-gray-900 to-gray-800 rounded-[3rem] p-2 shadow-2xl border border-gray-700">
              <div className="w-full h-full bg-gradient-to-br from-slate-50 to-white rounded-[2.5rem] overflow-hidden">
                {/* Status bar */}
                <div className="bg-black text-white text-xs px-6 py-2 flex justify-between items-center">
                  <span>9:41</span>
                  <div className="flex space-x-1">
                    <div className="w-4 h-2 bg-white rounded-sm"></div>
                    <div className="w-4 h-2 bg-white rounded-sm"></div>
                    <div className="w-4 h-2 bg-white rounded-sm"></div>
                  </div>
                </div>

                {/* App content */}
                <div className="h-full bg-gradient-to-br from-primary/10 to-primary-glow/10 flex flex-col p-6">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg">
                      <span className="text-primary-foreground font-bold text-xl">
                        B
                      </span>
                    </div>
                    <div className="w-8 h-8 bg-primary/20 rounded-full"></div>
                  </div>

                  {/* Balance card */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg mb-6">
                    <p className="text-sm text-muted-foreground mb-2">
                      Total Balance
                    </p>
                    <p className="text-3xl font-bold text-primary mb-2">
                      $1,234.56
                    </p>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <p className="text-xs text-green-600">
                        {" "}
                        47+ agents nearby
                      </p>
                    </div>
                  </div>

                  {/* Quick actions */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="bg-primary text-primary-foreground rounded-xl p-4 text-center shadow-lg">
                      <ArrowUpRight
                        size={24}
                        className="w-8 h-8 bg-white/20 rounded-lg mx-auto mb-2"
                      />

                      <p className="text-xs font-medium">Send</p>
                    </div>
                    <div className="bg-primary-glow text-primary-foreground rounded-xl p-4 text-center shadow-lg">
                      {/* <div className="w-8 h-8 bg-white/20 rounded-lg mx-auto mb-2"></div> */}
                      <ArrowDownLeft
                        size={24}
                        className="w-8 h-8 bg-white/20 rounded-lg mx-auto mb-2"
                      />
                      <p className="text-xs font-medium">Withdraw</p>
                    </div>
                  </div>

                  {/* Recent transactions */}
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 flex-1">
                    <p className="text-sm font-medium mb-3">Recent</p>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary/20 rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-xs font-medium">Agent Deposit</p>
                          <p className="text-xs text-muted-foreground">
                            +$50.00
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary/20 rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-xs font-medium">To John (+1234)</p>
                          <p className="text-xs text-muted-foreground">
                            -$25.00
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary-glow/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-1/2 -right-6 w-20 h-20 bg-primary/5 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
