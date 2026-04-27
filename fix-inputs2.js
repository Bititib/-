import fs from 'fs';
let code = fs.readFileSync('src/App.tsx', 'utf-8');

// Unify all inputs
code = code.replace(/className="[^"]*?(<input|textarea|button).*?"/g, (match) => {
   // Wait, replacing everything is tricky. Let's strictly target the inputs by looking for the input tag
   return match; 
});

// Since manual regex is error-prone, let's just do a blanket replacement of the known input styles:
// We look for any class string that has " focus:outline-none " and " text-white " and " border " and " rounded-"
const inputRegex = /className="w-full[^"]*?(border|rounded-|focus:outline-none)[^"]*?"/g;

code = code.replace(inputRegex, (match) => {
    if (match.includes('focus:outline-none') && (match.includes('rounded-lg') || match.includes('rounded-xl'))) {
        return 'className="w-full bg-white/[0.03] border-none rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-white/20 transition-all placeholder:text-zinc-600"';
    }
    return match;
});

// Fix the flex-1 inputs
const inputFlexRegex = /className="flex-1[^"]*?(border|rounded-|focus:outline-none)[^"]*?"/g;
code = code.replace(inputFlexRegex, (match) => {
    if (match.includes('focus:outline-none') && match.includes('rounded-lg')) {
        return 'className="flex-1 bg-white/[0.03] border-none rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-white/20 transition-all placeholder:text-zinc-600"';
    }
    return match;
});

// Fix textareas specifically
code = code.replace(/className="w-full[^"]*?resize-none[^"]*?"/g, 'className="w-full bg-white/[0.03] border-none rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-white/20 transition-all resize-none min-h-[140px] placeholder:text-zinc-600"');


fs.writeFileSync('src/App.tsx', code);
console.log('Fixed inputs to borderless');
