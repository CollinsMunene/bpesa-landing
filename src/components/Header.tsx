import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full py-5 px-4 lg:px-8 sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
      <nav className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center space-x-1">
          <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">B</span>
          </div>
          <span className="text-xl font-bold text-primary">pesa</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
          <a href="#offerings" className="text-slate-600 hover:text-primary transition-colors">Products</a>
          <a href="#agents" className="text-slate-600 hover:text-primary transition-colors">For Agents</a>
          <a href="#builders" className="text-slate-600 hover:text-primary transition-colors">Builders</a>
          <a href="/transaction_bands" className="text-slate-600 hover:text-primary transition-colors">Fees</a>
        </div>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <a href="#agents">
            <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-white transition-all">
              Become an Agent
            </Button>
          </a>
          <a href="#cta">
            <Button size="sm" className="bg-primary hover:bg-primary/90 text-white">
              Download App
            </Button>
          </a>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100" onClick={() => setOpen(!open)}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden mt-3 pb-4 border-t border-slate-100 pt-4 flex flex-col gap-3 px-4 text-sm font-medium">
          <a href="#offerings" onClick={() => setOpen(false)} className="text-slate-600 py-2">Products</a>
          <a href="#agents" onClick={() => setOpen(false)} className="text-slate-600 py-2">For Agents</a>
          <a href="#builders" onClick={() => setOpen(false)} className="text-slate-600 py-2">Builders</a>
          <a href="/transaction_bands" onClick={() => setOpen(false)} className="text-slate-600 py-2">Fees</a>
          <div className="flex flex-col gap-2 pt-2">
            <a href="#agents" onClick={() => setOpen(false)}>
              <Button variant="outline" size="sm" className="w-full border-primary text-primary">Become an Agent</Button>
            </a>
            <a href="#cta" onClick={() => setOpen(false)}>
              <Button size="sm" className="w-full bg-primary text-white">Download App</Button>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
