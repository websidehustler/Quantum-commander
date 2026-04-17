/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer
} from "recharts";
import NeonParticles from "./NeonParticles";
import ClickableFunnel from "./ClickableFunnel";
import { motion } from "motion/react";

export default function QuantumNeuralCommander() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/analytics");
        const json = await res.json();
        setData(json);
      } catch (e) {
        console.error("Fetch failed", e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 15000);
    return () => clearInterval(interval);
  }, []);

  if (loading || !data) {
    return (
      <div className="min-h-screen bg-cyber-bg flex items-center justify-center text-cyber-cyan">
        <div className="text-center">
          <motion.div 
            className="text-7xl mb-6"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ⚡
          </motion.div>
          <p className="tracking-[8px] text-xl uppercase font-mono">Quantum Core Awakening...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[768px] min-w-[1024px] bg-cyber-bg text-white overflow-hidden relative font-sans selection:bg-cyber-cyan selection:text-black">
      <NeonParticles />

      {/* CRT Scanline Overlay from Theme */}
      <div className="fixed inset-0 pointer-events-none z-30 crt-overlay opacity-50" />
      <div className="fixed inset-0 pointer-events-none z-40 bg-gradient-to-b from-transparent via-cyber-cyan/5 to-transparent animate-scanline" />

      <div className="relative z-50 p-8 max-w-[1024px] mx-auto h-[768px] flex flex-col">
        {/* Header Section */}
        <header className="flex justify-between items-end border-b border-cyber-border pb-5 mb-6">
          <div className="title-group">
            <h1 
              className="glitch text-[42px] font-black tracking-[8px] text-cyber-cyan uppercase leading-none after:content-[attr(data-text)] after:absolute after:left-[2px] after:top-0 after:text-cyber-pink after:opacity-40 after:z-[-1] after:bg-transparent"
              data-text="QUANTUM NEURAL COMMANDER"
            >
              QUANTUM NEURAL COMMANDER
            </h1>
            <div className="font-mono text-cyber-cyan text-[12px] tracking-[2px] mt-1 opacity-80 uppercase">
              SYSTEM STATUS: OPTIMIZED // NODE_ID: 0x88F2 // LINK: STABLE
            </div>
          </div>
          <motion.button 
            whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(0, 243, 255, 0.4)" }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 bg-transparent border-2 border-cyber-cyan text-cyber-cyan font-bold text-xs tracking-[2px] uppercase transition-all shadow-[0_0_15px_rgba(0,243,255,0.2)]"
          >
            Execute Protocol
          </motion.button>
        </header>

        {/* KPI Row */}
        <div className="grid grid-cols-4 gap-5 mb-6">
          {[
            { label: "TOTAL_TRAFFIC", value: data.views.toLocaleString(), trend: "↑ 18.4% GAIN", isUp: true },
            { label: "CONVERSION_INDEX", value: `${data.ctr}%`, trend: "↑ 0.8% PERIOD", isUp: true },
            { label: "NEURAL_SCANS", value: data.scans.toLocaleString(), trend: "↓ 2.1% DROP", isUp: false },
            { label: "TOTAL_REVENUE", value: `$${data.revenue}`, trend: "↑ 24.1% GAIN", isUp: true },
          ].map((kpi, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-cyber-glass border border-cyber-border p-4 relative before:content-[''] before:absolute before:top-0 before:left-0 before:w-1 before:h-full before:bg-cyber-cyan"
            >
              <div className="font-mono text-[10px] text-cyber-cyan tracking-[2px] opacity-70 uppercase mb-2">{kpi.label}</div>
              <div className="text-[32px] font-bold text-white mb-2 leading-none">{kpi.value}</div>
              <div className={`text-[12px] font-mono ${kpi.isUp ? 'text-cyber-green' : 'text-cyber-pink'}`}>
                {kpi.trend}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1fr] gap-6 flex-1 min-h-0">
          {/* Main Visualizer Panel */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-cyber-glass border border-cyber-border p-6 flex flex-col"
          >
            <div className="font-mono text-cyber-cyan text-[14px] tracking-[2px] mb-5 flex justify-between uppercase">
              <span>TRAFFIC_NEURAL_FLOW_DYNAMICS</span>
              <span>[RESOLUTION: 4K]</span>
            </div>
            <div className="flex-1 min-h-0 border-l border-b border-cyber-cyan/10 mt-2 relative">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.history || []}>
                  <defs>
                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00f3ff" stopOpacity={0.3}/>
                      <stop offset="100%" stopColor="#00f3ff" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#00f3ff" vertical={false} opacity={0.1} />
                  <XAxis 
                    dataKey="name" 
                    stroke="#00f3ff" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false}
                    tick={{fill: '#00f3ff', opacity: 0.5}}
                  />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(10, 10, 10, 0.9)', 
                      border: '1px solid #00f3ff', 
                      borderRadius: '0px',
                      fontFamily: 'monospace'
                    }}
                    itemStyle={{color: '#00f3ff'}}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="views" 
                    stroke="#00f3ff" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorViews)" 
                    animationDuration={1000}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Right Column: Funnel Panel */}
          <div className="bg-cyber-glass border border-cyber-border p-6 flex flex-col overflow-hidden">
            <ClickableFunnel data={data} />
          </div>
        </div>
        
        {/* Ticker Section */}
        <footer className="h-[30px] border-t border-cyber-border mt-6 flex items-center font-mono text-[11px] text-cyber-cyan overflow-hidden">
          <div className="flex gap-10 whitespace-nowrap animate-pulse">
            <span className="ticker-item">LOG: 22:45:01 DATA_PACKET_RECEIVED from EU-WEST</span>
            <span className="ticker-item">LOG: 22:45:04 ANOMALY_DETECTED in NODE_04... RESOLVED</span>
            <span className="ticker-item">LOG: 22:45:12 REVENUE_PEAK established for Q3</span>
            <span className="ticker-item">SYNC_COMPLETE // NODE_0x88F2 // LATENCY: {Math.floor(Math.random() * 20) + 10}MS</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
