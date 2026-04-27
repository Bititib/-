import fs from 'fs';
let code = fs.readFileSync('src/App.tsx', 'utf-8');

code = code.replace(
    '<div className="flex-1 flex flex-col lg:flex-row min-h-screen md:h-screen md:overflow-hidden bg-black relative">',
    '<div className="flex-1 flex flex-col lg:flex-row min-h-screen md:h-screen md:overflow-hidden bg-[#0c0c0c] relative">'
);

code = code.replace(
    '<div className="w-full lg:w-[350px] xl:w-[380px] shrink-0 h-fit lg:h-full lg:overflow-y-auto border-r border-white/5 bg-[#050505] relative z-10 [&::-webkit-scrollbar]:hidden" style={{ msOverflowStyle: \'none\', scrollbarWidth: \'none\' }}>',
    '<div className="w-full lg:w-[350px] xl:w-[380px] shrink-0 h-fit lg:h-full lg:overflow-y-auto border-r border-white/5 bg-black relative z-10 [&::-webkit-scrollbar]:hidden" style={{ msOverflowStyle: \'none\', scrollbarWidth: \'none\' }}>'
);


fs.writeFileSync('src/App.tsx', code);
console.log('Fixed background colors');
