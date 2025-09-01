import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full py-6 px-4 lg:px-8">
      <nav className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-xl">B</span>
          </div>
          <span className="text-2xl font-bold text-primary">pesa</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <a href="/#features" className="text-foreground hover:text-primary transition-colors">
            Features
          </a>
          {/* <a href="#security" className="text-foreground hover:text-primary transition-colors">
            Security
          </a> */}
          <a href="/transaction_bands" className="text-foreground hover:text-primary transition-colors">
            Transaction Bands
          </a>
        </div>
        
        <Link to="/waitlist">
          <Button variant="hero" size="lg">
            Join Waitlist
          </Button>
        </Link>
      </nav>
    </header>
  );
};

export default Header;