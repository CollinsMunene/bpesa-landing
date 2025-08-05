import { Button } from "@/components/ui/button";
import { ArrowRight, Smartphone, Shield, Zap } from "lucide-react";

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
                Like M-Pesa, Globally
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0">
              Send money to anyone with just a phone number. Deposit and withdraw cash 
              at local agents. Works with any currency, anywhere in the world.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="hero" size="lg" className="text-lg px-8 py-3">
                Download App
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline-hero" size="lg" className="text-lg px-8 py-3">
                Join Waitlist
              </Button>
            </div>
            
            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 mt-12 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-primary" />
                <span>Bank-level security</span>
              </div>
              <div className="flex items-center space-x-2">
                <Smartphone className="w-4 h-4 text-primary" />
                <span>Works offline</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-primary font-bold">$0.01</span>
                <span>transaction fees</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative z-10 mx-auto w-72 h-[600px] bg-gradient-to-br from-gray-900 to-gray-800 rounded-[3rem] p-2 shadow-2xl">
              <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden">
                <div className="h-full bg-gradient-to-br from-primary/20 to-primary-glow/20 flex flex-col items-center justify-center p-8">
                  <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mb-6">
                    <span className="text-primary-foreground font-bold text-3xl">B</span>
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-4">Bpesa Wallet</h3>
                  <div className="space-y-4 w-full">
                    <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4">
                      <p className="text-sm text-muted-foreground">Balance</p>
                      <p className="text-2xl font-bold">$1,234.56</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-primary text-primary-foreground rounded-lg p-3 text-center">
                        <p className="text-xs">Send</p>
                      </div>
                      <div className="bg-primary-glow text-primary-foreground rounded-lg p-3 text-center">
                        <p className="text-xs">Receive</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary-glow/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;