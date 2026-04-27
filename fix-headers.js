import fs from 'fs';
let code = fs.readFileSync('src/App.tsx', 'utf-8');

code = code.replaceAll(
  'className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 mb-4"',
  'className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4"'
);

fs.writeFileSync('src/App.tsx', code);
