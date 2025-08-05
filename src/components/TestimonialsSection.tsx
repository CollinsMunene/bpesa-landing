import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Amara Okafor",
    location: "Lagos, Nigeria",
    quote: "I used to wait 3 days for my money to reach my family in Ghana. Now it takes 30 seconds. Bpesa changed everything.",
    rating: 5
  },
  {
    name: "David Mutua",
    location: "Nairobi, Kenya",
    quote: "No more expensive bank fees eating my small business profits. Bpesa helps me keep more of what I earn.",
    rating: 5
  },
  {
    name: "Fatima Diallo",
    location: "Dakar, Senegal",
    quote: "My daughter in France can send me money instantly now. As a mother, this peace of mind is priceless.",
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
            See how Bpesa is helping people across Africa take control of their financial future.
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