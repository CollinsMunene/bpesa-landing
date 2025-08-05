import { Lock, Users, Coins, Zap, Shield, Globe } from "lucide-react";

const features = [
  {
    icon: Lock,
    title: "You Own Your Money",
    description: "No bank can freeze your account. No government can block your payments. Your keys, your coins, your freedom."
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Send money to anyone in seconds, not days. Whether it's across the street or across continents."
  },
  {
    icon: Coins,
    title: "Stable & Reliable",
    description: "Built for everyday use with stable currencies like cUSD and USDT. No wild price swings, just dependable value."
  },
  {
    icon: Shield,
    title: "Simple & Secure",
    description: "No complicated seed phrases or technical jargon. Just download and start sending money safely."
  },
  {
    icon: Users,
    title: "Community First",
    description: "Built by Africans, for Africans. Connect with local agents, merchants, and your community."
  },
  {
    icon: Globe,
    title: "Works Everywhere",
    description: "Send money to family abroad, pay local merchants, or save for the future - all from one app."
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 px-4 lg:px-8 bg-gradient-to-br from-background to-primary/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Built for
            <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent ml-3">
              Real People
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We believe everyone deserves access to simple, secure, and affordable financial tools. 
            That's why we built Bpesa.
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