/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";

interface FunnelItem {
  name: string;
  value: number;
  fill: string;
}

interface ClickableFunnelProps {
  data: {
    funnel: FunnelItem[];
  };
}

export default function ClickableFunnel({ data }: ClickableFunnelProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="panel-title font-mono text-cyber-cyan text-[14px] tracking-[2px] mb-5 flex justify-between uppercase">
        <span>CONVERSION_FUNNEL</span>
        <span>LIVE</span>
      </div>
      <div className="flex flex-col gap-3 flex-1 overflow-y-auto pr-2">
        {data.funnel.map((item, i) => (
          <motion.div
            key={i}
            className={`h-[60px] bg-cyber-cyan/10 border-l-4 border-l-cyber-cyan flex items-center justify-between px-4 transition-all hover:bg-cyber-cyan/20 cursor-pointer ${i === 4 ? 'opacity-40 border-l-[#444]' : ''}`}
            whileHover={{ x: 4 }}
          >
            <div className="step-info">
              <span className="block text-[10px] uppercase text-cyber-cyan opacity-70 tracking-tighter">{item.name}</span>
              <strong className="text-lg font-bold text-white leading-tight">
                {i === 0 ? '1.2M Sessions' : i === 1 ? '482K Links' : i === 2 ? '92K Processed' : i === 3 ? '12K Completed' : 'Waiting...'}
              </strong>
            </div>
            <div className="font-mono text-cyber-cyan text-right text-sm">
              {item.value}%
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
