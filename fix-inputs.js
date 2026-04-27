import fs from 'fs';
let code = fs.readFileSync('src/App.tsx', 'utf-8');

// Replace general inputs and textareas
// Instead of matching exactly, let's use regex to find inputs/textareas with white/20 borders.
code = code.replace(/className="w-full[A-Za-z0-9\s-]*border-white\/20[A-Za-z0-9\s-]*"/g, (match) => {
    if (match.includes("rounded-lg") || match.includes("rounded-xl")) {
         return 'className="w-full bg-[#111] border border-white/5 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 transition-all placeholder:text-zinc-600"';
    }
    return match;
});

// Also fix the bottom textarea
code = code.replace(
  /className="w-full bg-black border border-zinc-700 rounded-lg p-4 h-32 text-zinc-300 resize-none focus:outline-none focus:border-blue-500 transition-colors"/g,
  'className="w-full bg-[#111] border border-white/5 rounded-xl p-4 h-32 text-zinc-300 resize-none focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 transition-all text-sm"'
);


// And fix the action buttons layout to be a column in the middle panel or leave side by side
fs.writeFileSync('src/App.tsx', code);
console.log('Fixed inputs');
