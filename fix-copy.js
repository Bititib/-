import fs from 'fs';
let code = fs.readFileSync('src/App.tsx', 'utf-8');

code = code.replace(
  'className={`z-10 flex flex-col gap-6 relative ${i % 2 === 0 ? \'w-3/5 pr-8\' : \'w-3/5 pl-8 ml-auto order-2\'}`}',
  'className={`z-10 flex flex-col gap-4 sm:gap-6 relative ${i % 2 === 0 ? \'w-full sm:w-4/5 md:w-3/5 sm:pr-8\' : \'w-full sm:w-4/5 md:w-3/5 sm:pl-8 sm:ml-auto order-1 sm:order-2\'}`}'
);

code = code.replace(
  '<h2 className="text-5xl font-black text-white leading-tight tracking-tight shadow-black/50 drop-shadow-md">',
  '<h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight tracking-tight shadow-black/50 drop-shadow-md break-words">'
);

code = code.replace(
  '<div className="text-xl font-bold text-white leading-snug drop-shadow-md">',
  '<div className="text-lg sm:text-xl font-bold text-white leading-snug drop-shadow-md break-words">'
);

fs.writeFileSync('src/App.tsx', code);
console.log('Fixed copy overlay');
