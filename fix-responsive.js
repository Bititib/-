import fs from 'fs';
let code = fs.readFileSync('src/App.tsx', 'utf-8');

// Container padding
code = code.replace(
  'className="p-4 md:p-10 w-full max-w-5xl mx-auto space-y-8 flex flex-col pb-24 relative z-0"',
  'className="p-3 sm:p-4 md:p-8 lg:p-10 w-full max-w-5xl mx-auto space-y-6 md:space-y-8 flex flex-col pb-24 relative z-0"'
);

// Form panel padding
code = code.replace(
  'className="bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 md:p-10 border border-slate-800/60 shadow-[0_8px_30px_rgb(0,0,0,0.4)] relative overflow-hidden"',
  'className="bg-slate-900/80 backdrop-blur-xl rounded-2xl p-4 sm:p-6 md:p-10 border border-slate-800/60 shadow-[0_8px_30px_rgb(0,0,0,0.4)] relative overflow-hidden"'
);

// Card paddings
code = code.replaceAll(
  'rounded-xl p-6 border',
  'rounded-xl p-4 sm:p-6 border'
);

// Grid layout for mobile buttons copy
code = code.replaceAll(
  'className="flex items-center justify-between mb-4"',
  'className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 mb-4"'
);

code = code.replaceAll(
  'className="flex items-center gap-2 px-3 py-1.5',
  'className="flex items-center justify-center gap-2 px-3 py-1.5 w-full sm:w-auto'
);

// Midjourney Prompt area
code = code.replace(
  'border-b border-slate-800 bg-slate-800/30 p-4 flex items-center justify-between',
  'border-b border-slate-800 bg-slate-800/30 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0'
);

code = code.replace(
  'className="px-4 py-2 bg-pink-600 hover:bg-pink-500 text-white rounded-lg transition-colors flex items-center gap-2 text-sm font-medium shadow-lg shadow-pink-900/20"',
  'className="px-4 py-2 bg-pink-600 hover:bg-pink-500 text-white rounded-lg transition-colors flex items-center justify-center gap-2 text-sm font-medium shadow-lg shadow-pink-900/20 w-full sm:w-auto"'
);

fs.writeFileSync('src/App.tsx', code);
console.log('Fixed spacing');
