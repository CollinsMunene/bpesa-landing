import { Lock, Eye, Code2 } from "lucide-react";

const pillars = [
  {
    icon: Lock,
    title: "Your money. Always.",
    subtitle: "Non-custodial by design",
    desc: "Bpesa never holds your money. Your funds live in your wallet. No one - can seize what you own.",
    contrast: "MNOs can freeze your account at any time.",
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
  },
  {
    icon: Eye,
    title: "Every transaction is verifiable.",
    subtitle: "Transparent",
    desc: "Every Bpesa transaction is recorded. You can verify any transfer independently — no trust required.",
    contrast: "MNOs ledger is a private database.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
  },
  {
    icon: Code2,
    title: "Money that runs code.",
    subtitle: "Programmable rails",
    desc: "Because of how Bpesa is built, money can follow rules - earn automatically, split payments on conditions, settle commissions without any middleman. Bpesa is a platform.",
    contrast: "MNOs is a closed ledger. Bpesa is a platform.",
    color: "text-purple-400",
    bg: "bg-purple-500/10 border-purple-500/20",
  },
];

const WhyOpenMoneySection = () => (
  <section id="why" className="py-24 px-4 lg:px-8 bg-slate-950">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-white/8 text-slate-300 rounded-full px-4 py-1.5 text-sm font-medium border border-white/10 mb-5">
          Why open money matters
        </div>
        <h2 className="text-4xl font-bold text-white tracking-tight mb-4">
          Not just faster payments.<br />
          <span className="text-primary" style={{ color: "#60a5fa" }}>A different kind of money.</span>
        </h2>
        <p className="text-lg text-slate-400 max-w-xl mx-auto">
          Centralised money can be taken away. Programmable, open money can't.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {pillars.map((p) => (
          <div key={p.title} className={`rounded-2xl border ${p.bg} p-7 flex flex-col gap-5`}>
            <div className={`w-10 h-10 rounded-xl ${p.bg} border flex items-center justify-center`}>
              <p.icon className={`w-5 h-5 ${p.color}`} />
            </div>
            <div>
              <p className={`text-xs font-semibold uppercase tracking-wider mb-2 ${p.color}`}>{p.subtitle}</p>
              <h3 className="text-xl font-bold text-white leading-snug mb-3">{p.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{p.desc}</p>
            </div>
            <div className="mt-auto pt-4 border-t border-white/8">
              <p className="text-slate-500 text-xs italic">{p.contrast}</p>
            </div>
          </div>
        ))}
      </div>

      {/* TPS comparison strip */}
      <div className="mt-12 bg-white/5 border border-white/10 rounded-2xl p-8">
        <p className="text-slate-400 text-sm text-center mb-6 font-medium uppercase tracking-wider">Performance vs industry average</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { label: "Bpesa API TPS", value: "144.95", note: "Measured · March 2026", color: "text-blue-400" },
            { label: "MNOs avg TPS", value: "~150", note: "Centralised DB · reversible", color: "text-slate-400" },
            { label: "Bpesa daily capacity", value: "19.4M", note: "transactions / day", color: "text-emerald-400" },
            { label: "Transaction finality", value: "~2s", note: "Cryptographic · permanent", color: "text-purple-400" },
          ].map((s) => (
            <div key={s.label}>
              <p className={`text-3xl font-black ${s.color} mb-1`}>{s.value}</p>
              <p className="text-white text-sm font-medium">{s.label}</p>
              <p className="text-slate-500 text-xs mt-1">{s.note}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default WhyOpenMoneySection;
