import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Wanjiku",
    location: "Agent in Nairobi, Kenya",
    quote: "I earn $200 monthly as a Bpesa agent. Customers love that they can send money to Dubai or London as easily as to Mombasa.",
    rating: 5
  },
  {
    name: "Ahmed Hassan",
    location: "Cairo, Egypt",
    quote: "My brother in Canada sends me money in seconds. I withdraw Egyptian pounds at the agent down the street. No banks needed.",
    rating: 5
  },
  {
    name: "Maria Santos",
    location: "Manila, Philippines",
    quote: "Working abroad, I can now send pesos to my family instantly. The agent network makes cash pickup so convenient.",
    rating: 5
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 px-4 lg:px-8 bg-gradient-to-br from-primary/5 to-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Trusted by
            <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent ml-3">
              Real People
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real stories from users and agents in our global network. 
            From remittances to local payments, Bpesa works everywhere.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-card rounded-2xl p-8 border border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-lg">
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-lg mb-6 leading-relaxed">
                "{testimonial.quote}"
              </blockquote>
              <div>
                <p className="font-bold text-foreground">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;