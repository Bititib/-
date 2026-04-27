import fs from 'fs';
let code = fs.readFileSync('src/App.tsx', 'utf-8');

// Replace standard block padding
code = code.replaceAll('className="p-6 space-y-6"', 'className="p-4 sm:p-6 space-y-6"');
code = code.replaceAll('className="p-6 grid ', 'className="p-4 sm:p-6 grid ');
code = code.replaceAll('p-6 border border-slate-800', 'p-4 sm:p-6 border border-slate-800');
code = code.replaceAll('p-6 border border-pink-500/20', 'p-4 sm:p-6 border border-pink-500/20');
code = code.replaceAll('rounded-2xl p-6 border', 'rounded-2xl p-4 sm:p-6 border');

fs.writeFileSync('src/App.tsx', code);
console.log('Fixed more paddings');
