import { Twitter, Mail, Linkedin } from "lucide-react";

const Footer = () => (
  <footer className="py-16 px-4 lg:px-8 bg-slate-950 text-white">
    <div className="max-w-6xl mx-auto">
      <div className="grid md:grid-cols-4 gap-10 mb-12">
        {/* Brand */}
        <div className="md:col-span-2">
          <a href="/" className="flex items-center space-x-1 mb-5">
            <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <span className="text-xl font-bold text-white">pesa</span>
          </a>
          <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-sm">
            The programmable money layer for Africa. Built on open infrastructure, powered by a growing agent network.
          </p>
          <div className="flex gap-3">
            <a href="https://x.com/bpesaplatform" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-white/8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-colors">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="https://linkedin.com/company/bpesaplatform" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-white/8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="mailto:info@bpesa.net" className="w-9 h-9 bg-white/8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-colors">
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Product */}
        <div>
          <h3 className="font-semibold text-white mb-4 text-sm">Product</h3>
          <ul className="space-y-3 text-slate-400 text-sm">
            <li><a href="#offerings" className="hover:text-white transition-colors">Products</a></li>
            <li><a href="#agents" className="hover:text-white transition-colors">For Agents</a></li>
            <li><a href="#builders" className="hover:text-white transition-colors">For Builders</a></li>
            <li><a href="/transaction_bands" className="hover:text-white transition-colors">Transaction Bands</a></li>
            <li><a href="/docs" className="hover:text-white transition-colors">Docs</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="font-semibold text-white mb-4 text-sm">Support</h3>
          <ul className="space-y-3 text-slate-400 text-sm">
            <li><a href="mailto:info@bpesa.net" className="hover:text-white transition-colors">Contact Us</a></li>
            <li><a href="https://x.com/Bpesa1" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Follow on X</a></li>
            <li><a href="/privacy-policy.html" className="hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="mailto:support@bpesa.net" className="hover:text-white transition-colors">Account Deletion</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/8 pt-8 flex flex-col md:flex-row justify-between items-center gap-3 text-slate-500 text-xs">
        <p>© 2026 Bpesa. A product of Devligence & BytePesa Ltd, registered in Kenya.</p>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
          <span>All systems operational</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
