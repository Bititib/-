import fs from 'fs';
let code = fs.readFileSync('src/App.tsx', 'utf-8');

// Fix buttons that have "bg-black hover:bg-black text-white border border-white/5"
code = code.replace(/'bg-black hover:bg-black text-white border border-white\/5'/g, "'bg-white/[0.05] hover:bg-white/[0.1] text-white border-none'");

// disabled state
code = code.replace(/'bg-black text-zinc-400 cursor-not-allowed'/g, "'bg-white/[0.02] text-zinc-500 cursor-not-allowed border-none'");

// Primary action buttons (blue, purple, orange, etc.) are already using 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20 border-0'. 
// We can make them look even more premium by using thin glows or solid white: 'bg-white text-black hover:bg-zinc-200 shadow-md border-0'
code = code.replace(/'bg-(blue|purple|orange|emerald|pink)-600 hover:bg-\1-500 text-white shadow-lg shadow-\1-500\/20 border-0'/g, 
  "'bg-white text-black hover:bg-zinc-200 border-none font-semibold'");

fs.writeFileSync('src/App.tsx', code);
console.log('Fixed buttons');
