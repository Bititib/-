import fs from 'fs';
let code = fs.readFileSync('src/App.tsx', 'utf-8');

code = code.replaceAll('text-blue-500 font-bold', 'text-white font-bold');
code = code.replaceAll('text-emerald-500 font-bold', 'text-white font-bold');
code = code.replaceAll('text-pink-500 font-bold', 'text-white font-bold');
code = code.replaceAll('text-orange-500 font-bold', 'text-white font-bold');
code = code.replaceAll('text-purple-500 font-bold', 'text-white font-bold');
code = code.replaceAll('text-cyan-500 font-bold', 'text-white font-bold');
code = code.replaceAll('text-red-500 font-bold', 'text-white font-bold');

fs.writeFileSync('src/App.tsx', code);
