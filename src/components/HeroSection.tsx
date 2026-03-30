import { ArrowRight, Shield, Zap, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

const DashboardMockup = () => (
  <div className="relative w-[260px] mx-auto">
    {/* Phone frame */}
    <div className="relative bg-slate-900 rounded-[44px] p-3 shadow-2xl shadow-primary/30 ring-1 ring-white/10">
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-slate-900 rounded-full z-10" />
      <div className="bg-[#f0f4ff] rounded-[36px] overflow-hidden" style={{ height: 520 }}>
        {/* Status bar */}
        <div className="bg-[#0f3460] flex justify-between items-center px-6 pt-8 pb-3">
          <span className="text-white/70 text-[10px]">9:41</span>
          <div className="flex gap-1 items-center">
            <div className="w-3 h-1.5 bg-white/70 rounded-sm" />
            <div className="w-1 h-1.5 bg-white/70 rounded-sm" />
          </div>
        </div>
        {/* Balance card */}
        <div className="bg-[#0f3460] px-5 pb-6">
          <p className="text-white/60 text-[11px] mb-0.5">Good morning</p>
          <p className="text-white text-sm font-semibold">Hillary 👋</p>
          <div className="mt-3 bg-white/10 rounded-2xl p-4">
            <p className="text-white/60 text-[10px] mb-1">KES</p>
            <p className="text-white text-2xl font-bold tracking-tight">KES 24,580</p>
            <div className="flex items-center gap-1.5 mt-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-emerald-300 text-[10px]">Live</span>
            </div>
          </div>
        </div>
        {/* Quick actions */}
        <div className="px-4 -mt-3">
          <div className="bg-white rounded-2xl shadow-sm p-3 grid grid-cols-4 gap-1">
            {[
              { icon: "↑", label: "Send", color: "bg-blue-100 text-blue-700" },
              { icon: "↓", label: "Receive", color: "bg-emerald-100 text-emerald-700" },
              { icon: "🏪", label: "Cash Out", color: "bg-orange-100 text-orange-700" },
              { icon: "📈", label: "Earn", color: "bg-purple-100 text-purple-700" },
            ].map((a) => (
              <div key={a.label} className="flex flex-col items-center gap-1">
                <div className={`w-9 h-9 rounded-xl ${a.color} flex items-center justify-center text-sm`}>{a.icon}</div>
                <span className="text-[9px] text-slate-500">{a.label}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Transactions */}
        <div className="px-4 mt-3">
          <p className="text-[10px] text-slate-400 font-semibold mb-2 uppercase tracking-wider">Recent</p>
          <div className="space-y-1.5">
            {[
              { name: "James M.", type: "Sent", amount: "-KES 500", positive: false },
              { name: "Agent CBD", type: "Cash Out", amount: "-KES 2,000", positive: false },
              { name: "Yield reward", type: "Earned", amount: "+KES 180", positive: true },
            ].map((t) => (
              <div key={t.name} className="flex items-center justify-between bg-white rounded-xl p-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-[10px] font-medium text-slate-700">{t.name}</p>
                    <p className="text-[9px] text-slate-400">{t.type}</p>
                  </div>
                </div>
                <span className={`text-[11px] font-semibold ${t.positive ? "text-emerald-600" : "text-slate-600"}`}>
                  {t.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    {/* Floating badges */}
    <div className="absolute -right-6 top-20 bg-white rounded-xl shadow-lg px-3 py-2 flex items-center gap-2 border border-slate-100">
      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
      <span className="text-[11px] font-semibold text-slate-700">144 TPS</span>
    </div>
    <div className="absolute -left-8 bottom-28 bg-white rounded-xl shadow-lg px-3 py-2 border border-slate-100">
      <p className="text-[10px] text-slate-400">Tx finalised in</p>
      <p className="text-[12px] font-bold text-primary">~2 seconds</p>
    </div>
  </div>
);

const HeroSection = () => (
  <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/40 to-white pt-12 pb-24 px-4 lg:px-8">
    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-400/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

    <div className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Copy */}
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 bg-primary/8 text-primary rounded-full px-4 py-1.5 text-sm font-medium border border-primary/15">
            <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
            Programmable Money · Open Infrastructure
          </div>
          <div className="space-y-4">
            <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 leading-[1.08] tracking-tight">
              The financial<br />network built<br />
              <span className="text-primary">on open money</span>
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed max-w-md">
              Bpesa is the programmable money layer for Africa - powering agents, users, merchants, and developers from a single open infrastructure.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href="/download">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white gap-2 rounded-xl px-6">
                Download App <ArrowRight className="w-4 h-4" />
              </Button>
            </a>
            <a href="#agents">
              <Button size="lg" variant="outline" className="border-primary/30 text-primary hover:bg-primary/5 rounded-xl px-6">
                Become an Agent
              </Button>
            </a>
          </div>
          <div className="flex flex-wrap gap-5 pt-1">
            {[
              { icon: Shield, text: "Non-custodial" },
              { icon: Zap, text: "~2s finality" },
              { icon: Globe, text: "Cross-border native" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-1.5 text-sm text-slate-500">
                <Icon className="w-4 h-4 text-emerald-500" />
                <span>{text}</span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100">
            {[
              { value: "~9.7M", label: "Daily Active Users capacity" },
              { value: "144 TPS", label: "API throughput" },
              { value: "0%", label: "Error rate" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-xl font-bold text-primary">{s.value}</p>
                <p className="text-xs text-slate-400 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Phone */}
        <div className="flex justify-center lg:justify-end">
          <DashboardMockup />
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
