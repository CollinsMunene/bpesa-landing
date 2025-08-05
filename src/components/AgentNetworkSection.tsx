import { MapPin, Users, DollarSign, Globe, Zap, Shield } from "lucide-react";

const AgentNetworkSection = () => {
  return (
    <section className="py-20 px-4 lg:px-8 bg-gradient-to-br from-background to-primary/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Powered by Our
            <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent ml-3">
              Agent Network
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A decentralized network of local agents who provide cash-in and cash-out services, 
            earning fees while serving their communities.
          </p>
        </div>

        {/* Visual Network Representation */}
        <div className="relative mb-16">
          <div className="flex items-center justify-center">
            {/* Central Hub */}
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center shadow-lg animate-pulse">
                <Globe className="w-16 h-16 text-primary-foreground" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
              </div>
            </div>

            {/* Agent Nodes */}
            {Array.from({ length: 8 }).map((_, index) => {
              const angle = (index * 360) / 8;
              const radius = 200;
              const x = Math.cos((angle * Math.PI) / 180) * radius;
              const y = Math.sin((angle * Math.PI) / 180) * radius;
              
              return (
                <div
                  key={index}
                  className="absolute"
                  style={{
                    transform: `translate(${x}px, ${y}px)`,
                  }}
                >
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center border-2 border-primary/30 hover:border-primary transition-all duration-300 hover:scale-110">
                    <MapPin className="w-8 h-8 text-primary" />
                  </div>
                  {/* Connection Lines */}
                  <div 
                    className="absolute top-1/2 left-1/2 w-0.5 bg-gradient-to-r from-primary/50 to-transparent"
                    style={{
                      height: `${radius - 32}px`,
                      transformOrigin: 'center',
                      transform: `rotate(${angle + 180}deg) translateY(-50%)`,
                    }}
                  ></div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-card rounded-2xl p-8 border border-border/50 text-center hover:border-primary/20 transition-all duration-300">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-3xl font-bold mb-2">10,000+</h3>
            <p className="text-muted-foreground">Active Agents Worldwide</p>
          </div>
          
          <div className="bg-card rounded-2xl p-8 border border-border/50 text-center hover:border-primary/20 transition-all duration-300">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-3xl font-bold mb-2">$2M+</h3>
            <p className="text-muted-foreground">Agent Earnings This Month</p>
          </div>
          
          <div className="bg-card rounded-2xl p-8 border border-border/50 text-center hover:border-primary/20 transition-all duration-300">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-3xl font-bold mb-2">50+</h3>
            <p className="text-muted-foreground">Countries Served</p>
          </div>
        </div>

        {/* How It Works for Agents */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold mb-6">Become an Agent, Earn Income</h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold mb-2">Secure & Trusted</h4>
                  <p className="text-muted-foreground">KYC-verified agents with escrow protection and automated settlement.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold mb-2">Instant Settlement</h4>
                  <p className="text-muted-foreground">Earn 0.5% commission on every transaction with instant stablecoin settlement.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold mb-2">Community Impact</h4>
                  <p className="text-muted-foreground">Serve your community while building a sustainable income stream.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-gradient-to-br from-primary/10 to-primary-glow/10 rounded-2xl p-8">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold">Agent Dashboard</h4>
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-primary/5 rounded-lg">
                    <span className="text-sm">Today's Earnings</span>
                    <span className="font-bold text-primary">$47.50</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-primary/5 rounded-lg">
                    <span className="text-sm">Transactions</span>
                    <span className="font-bold">23</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-primary/5 rounded-lg">
                    <span className="text-sm">Available Liquidity</span>
                    <span className="font-bold text-green-600">$2,340</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating earning indicators */}
            <div className="absolute -top-4 -right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-bounce">
              +$5.50
            </div>
            <div className="absolute top-1/2 -left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-bold animate-pulse">
              New Transaction
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgentNetworkSection;