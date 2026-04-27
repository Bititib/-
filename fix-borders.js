import fs from 'fs';
let code = fs.readFileSync('src/App.tsx', 'utf-8');

// replace all border-white/20 with border-white/5
code = code.replace(/border-white\/20/g, 'border-white/5');

// also replace standard border-zinc-700
code = code.replace(/border-zinc-700/g, 'border-white/5');

// and replace all thick dashed borders that might have been missed
code = code.replace(/border-2 border-dashed/g, 'border border-dashed');

// change bg-[#111] to bg-white/[0.02] for inputs to be very subtle, standard premium dark mode inputs
code = code.replace(/bg-\[#111\]/g, 'bg-white/[0.02]');

fs.writeFileSync('src/App.tsx', code);
console.log('Fixed borders globally');
