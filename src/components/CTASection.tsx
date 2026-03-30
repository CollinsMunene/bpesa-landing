import { Button } from "@/components/ui/button";
import { ArrowRight, Smartphone } from "lucide-react";

const CTASection = () => (
  <section id="cta" className="py-24 px-4 lg:px-8 bg-white">
    <div className="max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Users */}
        <div className="bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-8 md:p-10 text-white flex flex-col gap-6">
          <div className="w-12 h-12 bg-white/15 rounded-2xl flex items-center justify-center">
            <Smartphone className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-white/60 text-sm font-medium mb-2">For users</p>
            <h3 className="text-2xl font-bold mb-3">Start recieving money.<br />No bank needed.</h3>
            <p className="text-white/70 text-sm leading-relaxed">
              Download Bpesa, create your wallet in 2 minutes, and send money anywhere - to any Bpesa number, at near-zero fees.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <a href="/download">
              <Button size="lg" className="w-full bg-white text-primary hover:bg-white/90 font-bold gap-2 rounded-xl">
                Download Bpesa <ArrowRight className="w-4 h-4" />
              </Button>
            </a>
            <p className="text-white/50 text-xs text-center">Android · iOS coming soon · Huawei coming soon</p>
          </div>
        </div>

        {/* Agents */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 md:p-10 text-white flex flex-col gap-6 border border-emerald-500/20">
          <div className="w-12 h-12 bg-emerald-500/20 rounded-2xl flex items-center justify-center">
            <span className="text-2xl">🏪</span>
          </div>
          <div>
            <p className="text-emerald-400 text-sm font-medium mb-2">For agents</p>
            <h3 className="text-2xl font-bold mb-3">Run your own<br />Bpesa agent location.</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Earn commissions on every transaction you process. Top agents earn KES 20,000+ per month. Download the agent app and apply today.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <a href="/download?app=agent">
              <Button size="lg" className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold gap-2 rounded-xl">
                Download Agent App <ArrowRight className="w-4 h-4" />
              </Button>
            </a>
            <a href="/transaction_bands">
              <Button size="lg" variant="outline" className="w-full bg-transparent border-white/20 text-white hover:bg-white/10 hover:text-white rounded-xl gap-2">
                View commission rates <ArrowRight className="w-4 h-4" />
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom trust strip */}
      <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-slate-400">
        {[
          "Available on Android",
          "iOS coming soon",
          "Agent network in 50+ countries",
          "Near-zero transaction fees",
          "Built in Africa, for the world",
        ].map((t) => (
          <span key={t} className="flex items-center gap-2">
            <span className="w-1 h-1 bg-slate-300 rounded-full" />
            {t}
          </span>
        ))}
      </div>
    </div>
  </section>
);

export default CTASection;
