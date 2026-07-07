'use client';

import { useState } from 'react';

const zonePositions = [
  { name: 'Gate A', top: '15px', left: '15px' },
  { name: 'Gate B', top: '15px', left: '260px' },
  { name: 'Gate C', top: '165px', left: '15px' },
  { name: 'Food Court', top: '90px', left: '15px' },
  { name: 'Metro Exit', top: '165px', left: '260px' },
  { name: 'Stand 1', top: '15px', left: '140px' },
  { name: 'Stand 2', top: '165px', left: '140px' },
];

interface ZoneDetail {
  bg: string;
  dotColor: string;
  value: string;
  pulse?: boolean;
  tooltipData: {
    crowd: string;
    temp: string;
    staff: string;
  };
}

function getZoneDetails(name: string, layer: 'crowd' | 'thermal' | 'staff'): ZoneDetail {
  const metrics: Record<string, { crowd: string; temp: string; staff: string }> = {
    'Gate A': { crowd: '34%', temp: '22°C', staff: '2' },
    'Gate B': { crowd: '94%', temp: '26°C', staff: '4' },
    'Gate C': { crowd: '45%', temp: '23°C', staff: '2' },
    'Food Court': { crowd: '78%', temp: '28°C', staff: '3' },
    'Metro Exit': { crowd: '88%', temp: '24°C', staff: '2' },
    'Stand 1': { crowd: '65%', temp: '23°C', staff: '2' },
    'Stand 2': { crowd: '42%', temp: '25°C', staff: '1' },
  };

  const current = metrics[name] || { crowd: '50%', temp: '24°C', staff: '1' };

  if (layer === 'crowd') {
    const crowdVal = parseFloat(current.crowd);
    const bg = crowdVal > 80 ? 'bg-red-500/10 border-red-500/30 text-red-200' :
               crowdVal > 60 ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-200' :
               'bg-green-500/10 border-green-500/30 text-green-200';
    const dotColor = crowdVal > 80 ? 'bg-red-500' : crowdVal > 60 ? 'bg-yellow-500' : 'bg-green-500';
    return { bg, dotColor, value: `Capacity: ${current.crowd}`, pulse: crowdVal > 80, tooltipData: current };
  } else if (layer === 'thermal') {
    const tempVal = parseFloat(current.temp);
    const bg = tempVal > 26 ? 'bg-red-500/10 border-red-500/30 text-red-200' :
               tempVal > 24 ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-200' :
               'bg-green-500/10 border-green-500/30 text-green-200';
    const dotColor = tempVal > 26 ? 'bg-red-500' : tempVal > 24 ? 'bg-yellow-500' : 'bg-green-500';
    return { bg, dotColor, value: `Temp: ${current.temp}`, pulse: tempVal > 26, tooltipData: current };
  } else {
    const staffVal = parseInt(current.staff);
    const bg = staffVal >= 4 ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-200' :
               staffVal >= 2 ? 'bg-blue-500/10 border-blue-500/30 text-blue-200' :
               'bg-slate-500/10 border-slate-500/30 text-slate-200';
    const dotColor = staffVal >= 4 ? 'bg-indigo-500' : staffVal >= 2 ? 'bg-blue-500' : 'bg-slate-400';
    return { bg, dotColor, value: `${current.staff} deployed`, tooltipData: current };
  }
}

export function StadiumHeatmap() {
  const [activeLayer, setActiveLayer] = useState<'crowd' | 'thermal' | 'staff'>('crowd');
  
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100/80">
      <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
        <h3 className="text-navy-900 font-bold text-sm uppercase tracking-wider flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse shadow-md shadow-blue-500/30" />
          Stadium Zone Status
        </h3>
        <div className="flex bg-gray-100 rounded-xl p-1 text-xs">
          {(['crowd', 'thermal', 'staff'] as const).map(layer => (
            <button
              key={layer}
              onClick={() => setActiveLayer(layer)}
              className={`px-3 py-1.5 rounded-lg font-semibold capitalize transition-all focus:outline-none ${
                activeLayer === layer ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {layer}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto custom-scrollbar">
        <div className="relative min-w-[360px] h-[220px] bg-slate-905 bg-[#0a1120] rounded-2xl overflow-hidden border border-slate-800 shadow-inner flex items-center justify-center p-4">
          {/* Pitch outline in center */}
          <div className="w-[110px] h-[65px] border border-green-500/20 rounded-md bg-green-950/5 flex items-center justify-center relative">
            <div className="absolute inset-y-0 left-1/2 border-l border-green-500/20" />
            <div className="w-8 h-8 rounded-full border border-green-500/20" />
            <span className="text-[9px] font-bold text-green-500/35 uppercase tracking-widest font-mono select-none">Pitch</span>
          </div>

          {/* Zones */}
          {zonePositions.map(z => {
            const detail = getZoneDetails(z.name, activeLayer);
            return (
              <div
                key={z.name}
                style={{ top: z.top, left: z.left }}
                className={`absolute p-2 rounded-xl border backdrop-blur-md transition-all hover:scale-105 group cursor-help ${detail.bg}`}
              >
                <div className="flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${detail.dotColor} ${detail.pulse ? 'animate-ping' : ''}`} />
                  <span className="text-[9px] font-bold text-white uppercase tracking-wider">{z.name}</span>
                </div>
                <p className="text-[9px] text-gray-300 font-mono mt-0.5">{detail.value}</p>

                {/* Hover Tooltip card */}
                <div className="absolute hidden group-hover:block bg-navy-950/95 border border-white/10 rounded-xl p-3 shadow-2xl z-30 w-[150px] pointer-events-none -top-24 left-0">
                  <p className="font-bold text-white text-[10px] border-b border-white/5 pb-1 mb-1">{z.name}</p>
                  <p className="text-[9px] text-blue-200 mt-1 font-mono flex items-center justify-between"><span>Crowd:</span> <span>{detail.tooltipData.crowd}</span></p>
                  <p className="text-[9px] text-orange-200 font-mono flex items-center justify-between"><span>Thermal:</span> <span>{detail.tooltipData.temp}</span></p>
                  <p className="text-[9px] text-green-200 font-mono flex items-center justify-between"><span>Staffing:</span> <span>{detail.tooltipData.staff} units</span></p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
