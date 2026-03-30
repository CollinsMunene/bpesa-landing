import { ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const CodeBlock = () => (
  <div className="bg-slate-900 rounded-2xl overflow-hidden border border-white/10 shadow-xl text-left">
    <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-slate-800/60">
      <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
      <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
      <span className="text-slate-500 text-xs ml-2 font-mono">Gateway · p2pTransfer</span>
    </div>
    <pre className="px-5 py-5 text-xs font-mono leading-relaxed overflow-x-auto">
      <span className="text-slate-500">{"// Send KES via meta-transaction (gasless)\n"}</span>
      <span className="text-blue-400">{"function "}</span>
      <span className="text-yellow-300">{"p2pTransfer"}</span>
      <span className="text-white">{"(\n"}</span>
      <span className="text-white">{"  "}</span><span className="text-green-400">{"address "}</span><span className="text-orange-300">{"from"}</span><span className="text-slate-500">{",    // sender\n"}</span>
      <span className="text-white">{"  "}</span><span className="text-green-400">{"address "}</span><span className="text-orange-300">{"to"}</span><span className="text-slate-500">{",      // recipient\n"}</span>
      <span className="text-white">{"  "}</span><span className="text-green-400">{"uint256 "}</span><span className="text-orange-300">{"amount"}</span><span className="text-slate-500">{",  // receiver amount\n"}</span>
      <span className="text-white">{"  "}</span><span className="text-green-400">{"uint256 "}</span><span className="text-orange-300">{"fee"}</span><span className="text-slate-500">{",     // fee\n"}</span>
      <span className="text-white">{"  "}</span><span className="text-green-400">{"address "}</span><span className="text-orange-300">{"currency"}</span><span className="text-slate-500">{", // KES \n"}</span>
      <span className="text-white">{"  "}</span><span className="text-green-400">{"uint256 "}</span><span className="text-orange-300">{"deadline"}</span><span className="text-slate-500">{", // expiry\n"}</span>
      <span className="text-white">{"  "}</span><span className="text-green-400">{"bytes "}</span><span className="text-orange-300">{"signature"}</span><span className="text-slate-500">{" // Signature\n"}</span>
      <span className="text-white">{")"}</span>
      <span className="text-blue-400">{" external"}</span>
      <span className="text-white">{" { ... }\n\n"}</span>
      <span className="text-slate-500">{"// Emits: TransferExecuted\n"}</span>
      <span className="text-slate-500">{"// Audited · Open source · No permission needed"}</span>
    </pre>
  </div>
);

const BuildersSection = () => (
  <section id="builders" className="py-24 px-4 lg:px-8 bg-white">
    <div className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Code */}
        <div>
          <CodeBlock />
        </div>

        {/* Copy */}
        <div className="space-y-7">
          <div className="inline-flex items-center gap-2 bg-slate-100 rounded-full px-4 py-1.5 text-sm font-medium text-slate-600">
            For developers & builders
          </div>
          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-slate-900 tracking-tight leading-[1.1]">
              Build on open<br />
              <span className="text-primary">money rails.</span>
            </h2>
            <p className="text-lg text-slate-500 leading-relaxed">
              Bpesa's architecture is open source. Any developer can build products on top - yield protocols, merchant tools, micro-lending, insurance - without asking permission.
            </p>
          </div>

          <div className="space-y-3">
            {[
              // { title: "Gateway", desc: "Send, deposit, cash-out, merchant pay — the core transfer layer" },
              // { title: "Deal", desc: "Lock/unlock yield positions — time-based bKES rewards" },
              // { title: "FeeSplit.sol", desc: "Automated protocol fee distribution to vaults" },
              // { title: "bKES (ERC-20)", desc: "The programmable Kenyan shilling — 18 decimal" },
            ].map((c) => (
              <div key={c.title} className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-primary/20 hover:bg-blue-50/40 transition-all">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary text-xs font-bold">{"{ }"}</span>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 text-sm">{c.title}</p>
                  <p className="text-slate-400 text-xs mt-0.5">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            {/* <a href="https://sepolia.basescan.org/address/0xBA12aB174337fcc5D99E77A47E55982c9F6baeb1" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white gap-2 rounded-xl px-6">
                View <ExternalLink className="w-4 h-4" />
              </Button>
            </a> */}
            <a href="mailto:info@bpesa.net">
              <Button size="lg" variant="outline" className="border-primary/30 text-primary hover:bg-primary/5 rounded-xl px-6 gap-2">
                Talk to the team <ArrowRight className="w-4 h-4" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default BuildersSection;
