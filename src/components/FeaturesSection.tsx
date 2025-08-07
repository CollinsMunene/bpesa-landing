import { Lock, Users, Coins, Zap, Shield, Globe } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Agent Network",
    description: "Deposit and withdraw cash at thousands of local agents worldwide. Anyone can become an agent and earn from providing liquidity."
  },
  {
    icon: Zap,
    title: "Instant Transfers",
    description: "Send money with just a phone number in seconds. No Telcos, No bank accounts, no long forms, no waiting days for transfers."
  },
  {
    icon: Globe,
    title: "Any Currency, Anywhere",
    description: "Works with USD, EUR, KES, NGN, GHS and more across borders."
  },
  {
    icon: Coins,
    title: "Ultra-Low Fees",
    description: "No hidden fees, no exchange rate markups, no monthly charges."
  },
  {
    icon: Shield,
    title: "No Technicalities Needed",
    description: "Simple and works globally. Blockchain technology handles security while you focus on sending money."
  },
  {
    icon: Lock,
    title: "Decentralized & Secure",
    description: "Your money, your control. Built on blockchain technology with bank-level security and no single point of failure."
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 px-4 lg:px-8 bg-gradient-to-br from-background to-primary/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Global Money Transfer
            <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent ml-3">
              Made Simple
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Send money across borders as easily as sending a text message. 
            Our agent network makes cash-in and cash-out available everywhere.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-card rounded-2xl p-8 border border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-lg">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;