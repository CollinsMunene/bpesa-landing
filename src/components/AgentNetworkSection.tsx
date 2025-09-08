import React, { useState, useEffect } from 'react';
import { MapPin, Users, DollarSign, Globe, Zap, Shield, TrendingUp, Network, Activity, ArrowRight, Wallet, Clock } from "lucide-react";

const AgentNetworkSection = () => {
  const [activeTransactions, setActiveTransactions] = useState(0);
  // const [totalEarnings, setTotalEarnings] = useState(2147483);
  // const [agentCount, setAgentCount] = useState(12847);
  const [pulseNodes, setPulseNodes] = useState(new Set());

  // Simulate real-time activity
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTransactions(prev => Math.max(0, prev + Math.floor(Math.random() * 3) - 1));
      // setTotalEarnings(prev => prev + Math.floor(Math.random() * 50));
      // setAgentCount(prev => prev + Math.floor(Math.random() * 5) - 2);
      
      // Random node pulse animation
      const nodeIndex = Math.floor(Math.random() * 12);
      setPulseNodes(prev => {
        const newSet = new Set(prev);
        newSet.add(nodeIndex);
        setTimeout(() => {
          setPulseNodes(current => {
            const updated = new Set(current);
            updated.delete(nodeIndex);
            return updated;
          });
        }, 2000);
        return newSet;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const agentNodes = Array.from({ length: 12 }, (_, index) => {
    const layer = index < 6 ? 1 : 2;
    const angleOffset = layer === 1 ? 0 : 30;
    const nodesInLayer = layer === 1 ? 6 : 6;
    const layerIndex = index % 6;
    const angle = (layerIndex * 360) / nodesInLayer + angleOffset;
    const radius = layer === 1 ? 180 : 280;
    
    return {
      id: index,
      angle,
      radius,
      layer,
      earnings: Math.floor(Math.random() * 500) + 100,
      transactions: Math.floor(Math.random() * 50) + 10,
      country: ['🇰🇪', '🇳🇬', '🇬🇭', '🇺🇬', '🇹🇿', '🇷🇼', '🇺🇸', '🇬🇧', '🇩🇪', '🇫🇷', '🇪🇸', '🇮🇹', '🇳🇱', '🇸🇪', '🇨🇦', '🇦🇺'][Math.floor(Math.random() * 16)]
    };
  });

  return (
    <section className="py-24 px-4 lg:px-8 bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950 text-white relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.3) 0%, transparent 50%), 
                           radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.3) 0%, transparent 50%)`,
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 bg-blue-500/10 backdrop-blur-sm border border-blue-400/20 rounded-full px-6 py-2 mb-6">
            <Network className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-blue-300">Decentralized Infrastructure</span>
          </div>
          
          <h2 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight">
            <span className="block">Global Agent</span>
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Network
            </span>
          </h2>
          
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            A self-sustaining ecosystem where anyone becomes a liquidity provider, 
            earning from every transaction while enabling instant cash access worldwide.
          </p>
        </div>

        {/* Live Network Visualization */}
        <div className="relative mb-24">
          <div className="flex items-center justify-center min-h-[600px]">
            {/* Central Hub */}
            <div className="relative z-20">
              <div className="w-40 h-40 bg-gradient-to-br from-blue-500 via-purple-600 to-cyan-500 rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/50 relative">
                <div className="w-32 h-32 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
                  <Globe className="w-16 h-16 text-white" />
                </div>
                
                {/* Pulse rings */}
                <div className="absolute inset-0 rounded-full border-2 border-blue-400/30 animate-ping"></div>
                <div className="absolute inset-0 rounded-full border-2 border-purple-400/30 animate-ping" style={{ animationDelay: '1s' }}></div>
                
                {/* Live stats overlay */}
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                  {activeTransactions + 47} live
                </div>
              </div>
            </div>

            {/* Agent Nodes */}
            {agentNodes.map((node) => {
              const x = Math.cos((node.angle * Math.PI) / 180) * node.radius;
              const y = Math.sin((node.angle * Math.PI) / 180) * node.radius;
              const isPulsing = pulseNodes.has(node.id);
              
              return (
                <div key={node.id}>
                  {/* Connection Line */}
                  <div
                    className="absolute z-10"
                    style={{
                      left: '50%',
                      top: '50%',
                      width: `${node.radius}px`,
                      height: '2px',
                      background: `linear-gradient(90deg, 
                        rgba(59, 130, 246, 0.6) 0%, 
                        rgba(147, 51, 234, 0.4) 50%, 
                        rgba(6, 182, 212, 0.6) 100%)`,
                      transformOrigin: 'left center',
                      transform: `rotate(${node.angle}deg)`,
                    }}
                  >
                    {/* Data flow animation */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-transparent w-8 h-full animate-pulse opacity-60"></div>
                  </div>

                  {/* Agent Node */}
                  <div
                    className="absolute z-20 group cursor-pointer"
                    style={{
                      left: '50%',
                      top: '50%',
                      transform: `translate(${x - 40}px, ${y - 40}px)`,
                    }}
                  >
                    <div className={`relative w-20 h-20 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl flex items-center justify-center border-2 transition-all duration-500 hover:scale-125 hover:border-cyan-400 ${
                      isPulsing ? 'border-green-400 scale-110 shadow-xl shadow-green-400/50' : 'border-slate-600/50'
                    }`}>
                      <div className="text-2xl">{node.country}</div>
                      
                      {/* Earnings indicator */}
                      {/* <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-2 py-1 rounded text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        ${node.earnings}/day
                      </div> */}
                      
                      {/* Transaction count */}
                      {/* <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-2 py-1 rounded text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                        {node.transactions} tx
                      </div> */}

                      {/* Activity pulse */}
                      {isPulsing && (
                        <div className="absolute inset-0 rounded-2xl border-2 border-green-400 animate-ping"></div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Live Stats Banner */}
          {/* <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl px-8 py-4">
            <div className="flex items-center space-x-8 text-sm">
              <div className="flex items-center space-x-2">
                <Activity className="w-4 h-4 text-green-400" />
                <span className="text-slate-300">Live Transactions:</span>
                <span className="text-white font-bold">{activeTransactions + 156}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-blue-400" />
                <span className="text-slate-300">Active Agents:</span>
                <span className="text-white font-bold">{agentCount.toLocaleString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-purple-400" />
                <span className="text-slate-300">Network Earnings:</span>
                <span className="text-white font-bold">${totalEarnings.toLocaleString()}</span>
              </div>
            </div>
          </div> */}
        </div>

        {/* Enhanced Stats Grid */}
        {/* <div className="grid md:grid-cols-4 gap-6 mb-20">
          {[
            { icon: Users, value: "15,000+", label: "Global Agents", color: "from-blue-500 to-cyan-500", accent: "text-blue-400" },
            { icon: DollarSign, value: "$5.2M", label: "Monthly Earnings", color: "from-green-500 to-emerald-500", accent: "text-green-400" },
            { icon: Globe, value: "78", label: "Countries", color: "from-purple-500 to-pink-500", accent: "text-purple-400" },
            { icon: Clock, value: "<30s", label: "Avg Settlement", color: "from-orange-500 to-red-500", accent: "text-orange-400" }
          ].map((stat, index) => (
            <div key={index} className="group relative">
              <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 hover:bg-white/10">
                <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform`}>
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-4xl font-bold mb-2 text-center">{stat.value}</h3>
                <p className="text-slate-400 text-center text-sm">{stat.label}</p>
                
              
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-20 rounded-3xl transition-opacity duration-500 blur-xl`}></div>
              </div>
            </div>
          ))}
        </div> */}

        {/* Agent Benefits Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div>
              <h3 className="text-4xl font-bold mb-6 leading-tight">
                Turn Your Capital Into
                <span className="block bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  Passive Income
                </span>
              </h3>
              <p className="text-xl text-slate-300 leading-relaxed">
                Join thousands earning daily commissions by providing liquidity to your community. 
                No technical knowledge required, just cash and a smartphone.
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  icon: Shield,
                  title: "Zero-Risk Protocol",
                  description: "Smart contracts and escrow ensure your funds are always protected. KYC-verified network with automated dispute resolution."
                },
                {
                  icon: Zap,
                  title: "Instant Settlements",
                  description: "Earn 0.5-1% per transaction with instant settlement. No waiting periods or complex withdrawal processes."
                },
                {
                  icon: TrendingUp,
                  title: "Scaling Rewards",
                  description: "Higher transaction volumes unlock premium rates. Top agents earn $2,000+ monthly serving their communities."
                }
              ].map((benefit, index) => (
                <div key={index} className="flex items-start space-x-6 group">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform border border-white/10">
                    <benefit.icon className="w-7 h-7 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold mb-3 text-white">{benefit.title}</h4>
                    <p className="text-slate-300 leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-8">
              <button className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105 flex items-center space-x-3">
                <span>Become an Agent</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Enhanced Agent Dashboard Mock */}
          <div className="relative">
            <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <div>
                  {/* <h4 className="text-2xl font-bold text-white">Dashboard</h4> */}
                  <p className="text-slate-400">Real-time earnings tracking</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-green-400">Live</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl p-6 border border-green-500/20">
                  <div className="flex items-center justify-between mb-4">
                    <Wallet className="w-8 h-8 text-green-400" />
                    <span className="text-2xl font-bold text-white">$247</span>
                  </div>
                  <p className="text-sm text-slate-300">Today's Earnings</p>
                  <p className="text-xs text-green-400 mt-1">+$23 from yesterday</p>
                </div>

                <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl p-6 border border-blue-500/20">
                  <div className="flex items-center justify-between mb-4">
                    <Activity className="w-8 h-8 text-blue-400" />
                    <span className="text-2xl font-bold text-white">34</span>
                  </div>
                  <p className="text-sm text-slate-300">Transactions</p>
                  <p className="text-xs text-blue-400 mt-1">+15% vs avg</p>
                </div>
              </div>

              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-slate-300">Available Liquidity</span>
                  <span className="text-2xl font-bold text-white">${(4750 + Math.floor(Math.random() * 1000)).toLocaleString()}</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2 mb-2">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full w-3/4"></div>
                </div>
                <p className="text-xs text-slate-400">Optimal earning</p>
              </div>
            </div>

            {/* Floating Notifications */}
            <div className="absolute -top-6 -right-6 bg-green-500 text-white px-4 py-2 rounded-2xl text-sm font-bold shadow-xl animate-bounce">
              +$12.50 earned
            </div>
            <div className="absolute top-1/2 -left-6 bg-blue-500 text-white px-4 py-2 rounded-2xl text-sm font-bold shadow-xl animate-pulse">
              Instant Commissions
            </div>
            <div className="absolute -bottom-4 left-1/4 bg-purple-500 text-white px-4 py-2 rounded-2xl text-sm font-bold shadow-xl">
              Rank: Top 5%
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgentNetworkSection;