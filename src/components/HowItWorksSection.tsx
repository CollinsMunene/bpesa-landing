import { Smartphone, Send, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: Smartphone,
    title: "Download & Sign Up",
    description: "Get started in under 2 minutes. No paperwork, no long forms. Just your phone number."
  },
  {
    icon: Send,
    title: "Add Money",
    description: "Top up using mobile money, bank transfer, or visit a local agent in your area."
  },
  {
    icon: CheckCircle,
    title: "Send & Receive",
    description: "Pay anyone instantly with just their phone number. Pay bills, merchants, or send to family."
  }
];

const HowItWorksSection = () => {
  return (
    <section className="py-20 px-4 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Getting Started is
            <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent ml-3">
              Simple
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            No technical knowledge required. If you can send a text message, you can use Bpesa.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary-glow rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <step.icon className="w-10 h-10 text-primary-foreground" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-full w-full">
                  <div className="w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;