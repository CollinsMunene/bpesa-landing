import { useEffect, useState } from "react";
import { ArrowRight, TrendingUp, Users, Zap, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const AgentEarningsMockup = () => (
  <div className="relative w-[240px] mx-auto">
    <div className="bg-slate-800 rounded-[40px] p-3 shadow-2xl ring-1 ring-white/10">
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-4 bg-slate-800 rounded-full z-10" />
      <div className="bg-[#0f1f3d] rounded-[32px] overflow-hidden" style={{ height: 460 }}>
        <div className="flex justify-between items-center px-5 pt-8 pb-2">
          <span className="text-white/50 text-[10px]">9:41</span>
          <div className="w-3 h-1.5 bg-white/50 rounded-sm" />
        </div>
        <div className="px-5 pb-3">
          <p className="text-white/50 text-[11px]">Bpesa Agent</p>
          <p className="text-white text-sm font-bold">Wanjiku K. 🏪</p>
        </div>
        <div className="mx-4 bg-emerald-500/20 border border-emerald-500/30 rounded-2xl p-4 mb-3">
          <p className="text-emerald-300 text-[10px] mb-1">Available to claim</p>
          <p className="text-white text-2xl font-bold">KES 2,340</p>
          <div className="flex gap-3 mt-3">
            <div className="flex-1 bg-white/5 rounded-lg p-2">
              <p className="text-white/40 text-[9px]">Cash-out</p>
              <p className="text-white text-[11px] font-semibold">KES 1,820</p>
            </div>
            <div className="flex-1 bg-white/5 rounded-lg p-2">
              <p className="text-white/40 text-[9px]">Deposits</p>
              <p className="text-white text-[11px] font-semibold">KES 520</p>
            </div>
          </div>
          <div className="mt-3 bg-emerald-500 rounded-xl py-2 text-center">
            <span className="text-white text-[11px] font-semibold">Claim Earnings</span>
          </div>
        </div>
        <div className="mx-4 space-y-2">
          <p className="text-white/40 text-[10px] font-semibold uppercase tracking-wider">Today</p>
          {[
            { label: "Transactions", value: "34", delta: "+15%", pos: true },
            { label: "Float available", value: "KES 47,200", delta: null, pos: null },
            { label: "All-time earned", value: "KES 89,440", delta: "↑", pos: true },
          ].map((s) => (
            <div key={s.label} className="flex justify-between items-center bg-white/5 rounded-xl px-3 py-2">
              <span className="text-white/50 text-[10px]">{s.label}</span>
              <div className="flex items-center gap-1">
                <span className="text-white text-[11px] font-semibold">{s.value}</span>
                {s.delta && <span className={`text-[9px] ${s.pos ? "text-emerald-400" : "text-blue-400"}`}>{s.delta}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <div className="absolute -right-6 top-16 bg-emerald-500 text-white rounded-xl shadow-lg px-3 py-2 text-center">
      <p className="text-[10px] font-bold">Top agents earn</p>
      <p className="text-[14px] font-black">KES 20K+/mo</p>
    </div>
  </div>
);

const AgentNetworkSection = () => {
  const [count, setCount] = useState(47);
  useEffect(() => {
    const id = setInterval(() => setCount((c) => c + Math.floor(Math.random() * 3)), 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="agents" className="relative py-24 px-4 lg:px-8 bg-gradient-to-br from-slate-950 via-[#0a1628] to-slate-950 overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      {/* Animated background nodes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i / 12) * 360;
            const r = 320;
            const x = Math.cos((angle * Math.PI) / 180) * r;
            const y = Math.sin((angle * Math.PI) / 180) * r;
            return (
              <div
                key={i}
                className="absolute w-2 h-2 bg-emerald-400 rounded-full animate-pulse"
                style={{ transform: `translate(${x}px, ${y}px)`, animationDelay: `${i * 0.25}s` }}
              />
            );
          })}
        </div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-emerald-500/15 text-emerald-400 rounded-full px-4 py-1.5 text-sm font-medium border border-emerald-500/20">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              The distribution moat
            </div>
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold text-white leading-[1.1] tracking-tight">
                Agents are the<br />
                <span className="text-emerald-400">last mile.</span>
              </h2>
              <p className="text-lg text-slate-400 leading-relaxed max-w-md">
                Every Bpesa agent is a physical access point - turning digital money into cash and back again. The bigger the network, the more powerful it becomes for everyone on it.
              </p>
            </div>

            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-5 py-3 w-fit">
              <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-white font-semibold">{count}</span>
              <span className="text-slate-400 text-sm">transactions active right now</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: TrendingUp, title: "Earn per transaction", desc: "0.5–1% commission on every cash-in and cash-out you process" },
                { icon: Zap, title: "Instant settlement", desc: "Commissions hit your agent wallet in real time" },
                { icon: ShieldCheck, title: "Transaction protection", desc: "KYC required, automated disputes, no manual handling risk" },
                { icon: Users, title: "Network effect", desc: "As the network grows, more users come to you - naturally" },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="bg-white/5 border border-white/[0.08] rounded-2xl p-4 hover:bg-white/8 transition-colors">
                  <Icon className="w-5 h-5 text-emerald-400 mb-2" />
                  <p className="text-white text-sm font-semibold mb-1">{title}</p>
                  <p className="text-slate-400 text-xs leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a href="/download?app=agent">
                <Button size="lg" className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold gap-2 rounded-xl px-6">
                  Download Agent App <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
              <a href="/transaction_bands">
                <Button size="lg" variant="outline" className="bg-transparent border-white/20 text-white hover:bg-white/10 hover:text-white rounded-xl px-6">
                  View commission rates
                </Button>
              </a>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <AgentEarningsMockup />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgentNetworkSection;
