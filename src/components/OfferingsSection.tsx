import { ArrowUpRight } from "lucide-react";

const offerings = [
  {
    status: "live",
    label: "P2P Transfers",
    desc: "Send money to any Bpesa account number instantly. Near-zero fees.",
    screen: (
      <div className="bg-white rounded-xl p-3 space-y-2 text-left">
        <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Send Money</p>
        <div className="bg-slate-50 rounded-lg p-2">
          <p className="text-[9px] text-slate-400">To</p>
          <p className="text-[11px] font-semibold text-slate-700">0212 345 678</p>
        </div>
        <div className="bg-slate-50 rounded-lg p-2">
          <p className="text-[9px] text-slate-400">Amount</p>
          <p className="text-[14px] font-bold text-primary">KES 1,500</p>
        </div>
        <div className="flex justify-between text-[9px] text-slate-400 px-1">
          <span>Fee</span><span className="text-emerald-600 font-medium">KES 5</span>
        </div>
        <div className="bg-primary rounded-lg py-2 text-center">
          <span className="text-white text-[11px] font-semibold">Send →</span>
        </div>
      </div>
    ),
    color: "from-blue-50 to-indigo-50",
    dot: "bg-blue-500",
  },
  {
    status: "live",
    label: "Save & Earn",
    desc: "Lock KES into Deal positions. Earn passive income on your balance.",
    screen: (
      <div className="bg-white rounded-xl p-3 space-y-2 text-left">
        <div className="flex justify-between items-center">
          <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Save & Earn</p>
          <span className="text-[10px] font-bold text-purple-600 bg-purple-100 rounded-full px-2 py-0.5">8.5% APY</span>
        </div>
        <div className="grid grid-cols-3 gap-1">
          {["30 days", "60 days", "90 days"].map((d, i) => (
            <div key={d} className={`rounded-lg py-1.5 text-center text-[9px] font-medium ${i === 1 ? "bg-primary text-white" : "bg-slate-100 text-slate-500"}`}>{d}</div>
          ))}
        </div>
        <div className="bg-slate-50 rounded-lg p-2">
          <p className="text-[9px] text-slate-400">Lock amount</p>
          <p className="text-[13px] font-bold text-slate-700">KES 10,000</p>
        </div>
        <div className="flex justify-between text-[9px] px-1">
          <span className="text-slate-400">You'll earn</span>
          <span className="text-emerald-600 font-bold">+KES 1,395</span>
        </div>
        <div className="bg-purple-600 rounded-lg py-2 text-center">
          <span className="text-white text-[11px] font-semibold">Lock & Earn</span>
        </div>
      </div>
    ),
    color: "from-purple-50 to-fuchsia-50",
    dot: "bg-purple-500",
  },
  {
    status: "live",
    label: "Agent Cash In / Out",
    desc: "Physical network of agents for depositing and withdrawing cash. Agents earn commissions per transaction.",
    screen: (
      <div className="bg-white rounded-xl p-3 space-y-2 text-left">
        <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Agents Nearby</p>
        <div className="bg-slate-100 rounded-lg overflow-hidden" style={{ height: 60, position: "relative" }}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-[10px] text-slate-400">📍 Map view</div>
          </div>
          {[
            { top: "30%", left: "25%" },
            { top: "55%", left: "60%" },
            { top: "20%", left: "70%" },
          ].map((pos, i) => (
            <div key={i} className="absolute w-3 h-3 bg-emerald-500 rounded-full border-2 border-white shadow" style={pos} />
          ))}
        </div>
        <div className="bg-emerald-50 rounded-lg p-2 flex justify-between items-center">
          <div>
            <p className="text-[10px] font-semibold text-slate-700">Westlands CBD</p>
            <p className="text-[9px] text-slate-400">0.4 km away · Open</p>
          </div>
          <div className="bg-emerald-600 text-white text-[9px] font-semibold px-2 py-1 rounded-lg">Cash Out</div>
        </div>
      </div>
    ),
    color: "from-emerald-50 to-teal-50",
    dot: "bg-emerald-500",
  },
  {
    status: "live",
    label: "Merchant Payments",
    desc: "Accept KES payments with ~2s finality. No chargebacks, instant settlement, programmable receipts.",
    screen: (
      <div className="bg-white rounded-xl p-3 space-y-2 text-left">
        <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Pay Merchant</p>
        <div className="bg-slate-50 rounded-xl p-3 text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-xl mx-auto mb-2 flex items-center justify-center">
            <span className="text-2xl">🏬</span>
          </div>
          <p className="text-[11px] font-bold text-slate-700">Nairobi Supermart</p>
          <p className="text-[14px] font-bold text-primary mt-1">KES 3,250</p>
        </div>
        <div className="bg-primary rounded-lg py-2 text-center">
          <span className="text-white text-[11px] font-semibold">Confirm Payment</span>
        </div>
      </div>
    ),
    color: "from-orange-50 to-amber-50",
    dot: "bg-orange-500",
  },
];

const OfferingsSection = () => (
  <section id="offerings" className="py-24 px-4 lg:px-8 bg-white">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-slate-100 rounded-full px-4 py-1.5 text-sm font-medium text-slate-600 mb-5">
          What's built on Bpesa
        </div>
        <h2 className="text-4xl font-bold text-slate-900 tracking-tight mb-4">
          One infrastructure.<br />
          <span className="text-primary">Multiple products.</span>
        </h2>
        <p className="text-lg text-slate-500 max-w-xl mx-auto">
          Every offering shares the same programmable rails - open, composable, and built for real people.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {offerings.map((o) => (
          <div key={o.label} className={`rounded-2xl bg-gradient-to-b ${o.color} border border-white p-5 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow`}>
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${o.dot}`} />
                <span className={`text-[11px] font-semibold uppercase tracking-wide ${o.status === "live" ? "text-emerald-600" : "text-slate-400"}`}>
                  {o.status === "live" ? "Live" : "Coming soon"}
                </span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-300" />
            </div>

            {/* Screen mockup */}
            <div className="rounded-xl overflow-hidden shadow-sm border border-slate-100/80">
              {o.screen}
            </div>

            {/* Label + desc */}
            <div>
              <h3 className="font-bold text-slate-800 mb-1">{o.label}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{o.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default OfferingsSection;
