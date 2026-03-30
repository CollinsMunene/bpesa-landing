import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const coming = [
  {
    emoji: "🛡️",
    title: "Micro-Insurance",
    desc: "Parametric insurance - crop protection, health coverage, device insurance. Claims paid automatically, no paperwork.",
    tag: "Coming soon",
  },
  {
    emoji: "📈",
    title: "Stock & ETF Access",
    desc: "Buy fractional shares of global stocks and ETFs directly in Bpesa. Equities on the same programmable rails.",
    tag: "Coming soon",
  },
  {
    emoji: "🏦",
    title: "Lending & Credit",
    desc: "Collateral-backed loans using your KES balance or Deal positions. Borrow without a bank account. Programatically enforced.",
    tag: "Coming soon",
  },
  {
    emoji: "🌍",
    title: "More Currencies",
    desc: "NGN, UGX, TZS, USD - programmable local currencies for Nigeria, Uganda, Tanzania and more. Same infrastructure, local money.",
    tag: "Coming soon",
  },
];

const ComingSoonSection = () => (
  <section id="coming-soon" className="py-24 px-4 lg:px-8 bg-slate-50">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-primary/8 text-primary rounded-full px-4 py-1.5 text-sm font-medium border border-primary/15 mb-5">
          What's coming next
        </div>
        <h2 className="text-4xl font-bold text-slate-900 tracking-tight mb-4">
          The platform keeps growing.<br />
          <span className="text-primary">Join early.</span>
        </h2>
        <p className="text-lg text-slate-500 max-w-lg mx-auto">
          Bpesa is infrastructure, not just an app. These products are being built on the same open rails - available to all users automatically.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
        {coming.map((c) => (
          <div key={c.title} className="bg-white rounded-2xl border border-slate-100 p-6 flex flex-col gap-4 hover:shadow-md hover:border-primary/20 transition-all group">
            <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-2xl group-hover:bg-primary/8 transition-colors">
              {c.emoji}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-bold text-slate-800">{c.title}</h3>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">{c.desc}</p>
            </div>
            <span className="text-xs font-semibold text-slate-400 bg-slate-100 rounded-full px-3 py-1 w-fit">{c.tag}</span>
          </div>
        ))}
      </div>

      {/* Waitlist CTA */}
      <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 md:p-12 text-center text-white">
        <h3 className="text-2xl font-bold mb-3">Be first to access every new product.</h3>
        <p className="text-white/70 mb-6 max-w-md mx-auto">
          Follow us for updates. We'll announce the moment insurance, stocks, lending and new currencies go live.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href="https://x.com/bpesaplatform" target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-bold gap-2 rounded-xl px-8">
              Follow on X <ArrowRight className="w-4 h-4" />
            </Button>
          </a>
          <a href="https://linkedin.com/company/bpesaplatform" target="_blank" rel="noopener noreferrer">
            <Button size="lg" variant="outline" className="bg-transparent border-white/30 text-white hover:bg-white/10 hover:text-white rounded-xl px-8 gap-2">
              Follow on LinkedIn <ArrowRight className="w-4 h-4" />
            </Button>
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default ComingSoonSection;
