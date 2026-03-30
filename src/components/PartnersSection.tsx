import { Star } from "lucide-react";

const partners = [
   {
    name: "Pretium",
    type: "Super Agent",
    logo: "/partners/pretium.webp",
    website: "https://pretium.africa"
  },
  {
    name: "ElementPay",
    type: "Super Agent",
    logo: "/partners/elementpay.png",
    website: "https://elementpay.net"
  },
  {
    name: "Devligence",
    type: "Technology Partner",
    logo: "https://devligence.com/logo.png",
    website: "https://devligence.com"
  },
];

const PartnersSection = () => {
  return (
    <section className="py-20 px-4 lg:px-8 bg-gradient-to-br from-primary/5 to-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Collaboration
            <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent ml-3">
              with Leading Partners
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We partner with top super agents and technology providers to deliver seamless, reliable cross-border payments. Together, we expand access to financial services worldwide.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {partners.map((partner, index) => (
            <a href={partner.website} target="_blank" rel="noopener noreferrer"><div key={index} className="bg-card rounded-2xl p-8 border border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-lg">
              <div className="flex mb-4">
              
                <img src={partner.logo} alt={partner.name} className="h-12" />
              </div>
             
              <div>
                <p className="font-bold text-foreground">{partner.name}</p>
                <p className="text-sm text-muted-foreground">{partner.type}</p>
              </div>
            </div></a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;