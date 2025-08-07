import { Button } from "@/components/ui/button";
import { ArrowRight, Download } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-20 px-4 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="relative">
          {/* Background elements */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary-glow/10 to-primary/10 rounded-3xl blur-3xl"></div>

          <div className="relative bg-gradient-to-br from-primary to-primary-glow rounded-3xl p-12 lg:p-16 text-primary-foreground">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Ready to Take Control?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join our global network of users and agents. Send money across
              borders, earn from providing liquidity, and experience true
              financial freedom.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button
                variant="secondary"
                size="lg"
                className="text-lg px-8 py-3 bg-white text-primary hover:bg-white/90"
              >
                <Download className="w-5 h-5 mr-2" />
                Download for iOS
              </Button>
              <Button
                variant="secondary"
                size="lg"
                className="text-lg px-8 py-3 bg-white text-primary hover:bg-white/90"
              >
                <Download className="w-5 h-5 mr-2" />
                Download for Android
              </Button>
            </div>

            <Link to="/waitlist">
              <Button
                variant="outline"
                size="lg"
                className="text-lg text-primary px-8 py-3 border-white hover:bg-white hover:text-primary"
              >
                Join Our Waitlist
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>

            <div className="mt-8 text-sm opacity-75">
              <p>
                Available on iOS and Android • Agent network in 50+ countries •
                Near Zero transaction fees
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
