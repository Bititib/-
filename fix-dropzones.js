import fs from 'fs';
let code = fs.readFileSync('src/App.tsx', 'utf-8');

// 1. Fix Main Layout Borders
code = code.replace(
  '<div className="w-full md:w-64 shrink-0 bg-black border-b md:border-b-0 md:border-r border-white/20 flex flex-col md:h-screen sticky top-0 md:overflow-y-auto z-50 shadow-2xl shadow-black/50 md:shadow-2xl shadow-black/50">',
  '<div className="w-full md:w-64 shrink-0 bg-black flex flex-col md:h-screen sticky top-0 md:overflow-y-auto z-50 border-r border-white/5">'
);

code = code.replace(
  '<div className="flex-1 flex flex-col lg:flex-row min-h-screen md:h-screen md:overflow-hidden bg-[#0a0a0a] relative">',
  '<div className="flex-1 flex flex-col lg:flex-row min-h-screen md:h-screen md:overflow-hidden bg-black relative">'
);

code = code.replace(
  '<div className="w-full lg:w-[350px] xl:w-[380px] shrink-0 h-fit lg:h-full lg:overflow-y-auto border-r border-[#222] bg-[#0c0c0c] relative z-10 [&::-webkit-scrollbar]:hidden" style={{ msOverflowStyle: \'none\', scrollbarWidth: \'none\' }}>',
  '<div className="w-full lg:w-[350px] xl:w-[380px] shrink-0 h-fit lg:h-full lg:overflow-y-auto border-r border-white/5 bg-[#050505] relative z-10 [&::-webkit-scrollbar]:hidden" style={{ msOverflowStyle: \'none\', scrollbarWidth: \'none\' }}>'
);

// 2. Fix empty result panel
code = code.replace(
  '<div className="h-full min-h-[400px] flex flex-col items-center justify-center border-2 border-dashed border-white/20 rounded-xl bg-black text-zinc-500">',
  '<div className="h-full min-h-[400px] flex flex-col items-center justify-center rounded-2xl bg-white/[0.02] border border-white/5 text-zinc-500 shadow-inner">'
);

// 3. Fix action buttons (make them more "premium", removed the borders and use simple gradients/solid fills)
code = code.replace(
  /'text-blue-400 border border-blue-500\/30 hover:border-blue-500 shadow-\[0_0_15px_rgba\(59,130,246,0\.1\)\] hover:bg-blue-500\/10'/g,
  "'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20 border-0'"
);
code = code.replace(
  /'text-purple-400 border border-purple-500\/30 hover:border-purple-500 shadow-\[0_0_15px_rgba\(168,85,247,0\.1\)\] hover:bg-purple-500\/10'/g,
  "'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-500/20 border-0'"
);
code = code.replace(
  /'text-orange-400 border border-orange-500\/30 hover:border-orange-500 shadow-\[0_0_15px_rgba\(249,115,22,0\.1\)\] hover:bg-orange-500\/10'/g,
  "'bg-orange-600 hover:bg-orange-500 text-white shadow-lg shadow-orange-500/20 border-0'"
);
code = code.replace(
  /'text-emerald-400 border border-emerald-500\/30 hover:border-emerald-500 shadow-\[0_0_15px_rgba\(16,185,129,0\.1\)\] hover:bg-emerald-500\/10'/g,
  "'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 border-0'"
);
code = code.replace(
  /'text-pink-400 border border-pink-500\/30 hover:border-pink-500 shadow-\[0_0_15px_rgba\(236,72,153,0\.1\)\] hover:bg-pink-500\/10'/g,
  "'bg-pink-600 hover:bg-pink-500 text-white shadow-lg shadow-pink-500/20 border-0'"
);

// Disable state for action buttons
code = code.replace(
  /'text-zinc-600 border border-white\/10 cursor-not-allowed'/g,
  "'bg-white/5 text-zinc-500 cursor-not-allowed border-0'"
);

// Reset button
code = code.replace(
  /className="p-3 bg-black border border-zinc-700 hover:border-white text-zinc-400 hover:text-white rounded-lg transition-colors shadow-\[0_4px_20px_rgba\(0,0,0,0\.5\)\] hover:shadow-\[0_0_20px_rgba\(255,255,255,0\.1\)\]"/g,
  'className="p-3 bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white rounded-lg transition-colors border-0"'
);

// Inputs (rounded borders to subtle ones)
code = code.replace(
  /className="w-full bg-black border border-white\/20 text-white rounded-lg p-3 focus:outline-none focus:border-white\/50 transition-colors placeholder:text-zinc-600"/g,
  'className="w-full bg-[#111] border border-white/5 text-white rounded-xl p-3 focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 transition-all placeholder:text-zinc-600 text-sm"'
);

// Input labels
code = code.replace(
  /className="block text-sm font-medium text-zinc-400 mb-2"/g,
  'className="block text-xs font-semibold text-zinc-400 mb-2 uppercase tracking-wider"'
);

// Nav items active state
code = code.replace(
  /'bg-white\/10 text-white shadow-\[0_0_15px_rgba\(255,255,255,0\.05\)\] border border-white\/20'/g,
  "'bg-white/10 text-white border-0'"
);


// 4. Fix Drag and drop zones (remove dashed borders)
// "border-2 border-dashed border-white/20" -> "border border-white/5 bg-white/[0.02]"
code = code.replace(/border-2 border-dashed border-white\/20/g, "border border-white/5 bg-[#111] hover:bg-[#151515]");
code = code.replace(/hover:border-emerald-500/g, "hover:border-emerald-500/50");
code = code.replace(/hover:border-blue-500/g, "hover:border-blue-500/50");
code = code.replace(/hover:border-pink-500/g, "hover:border-pink-500/50");
code = code.replace(/hover:border-orange-500/g, "hover:border-orange-500/50");
code = code.replace(/border-2 border-dashed border-slate-600 flex flex-col items-center justify-center text-zinc-400 hover:text-white hover:border-slate-400/g, "border border-white/5 bg-[#111] hover:bg-[#151515] flex flex-col items-center justify-center text-zinc-400 hover:text-white");
code = code.replace(/bg-black\/40 backdrop-blur-sm/g, "");


fs.writeFileSync('src/App.tsx', code);
console.log('Restyled to premium black');
