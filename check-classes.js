import fs from 'fs';
let code = fs.readFileSync('src/App.tsx', 'utf-8');
const classMatch = code.match(/bg-[^\s"']+/g);
const classes = classMatch ? [...new Set(classMatch)] : [];
console.log(classes.filter(c => c.includes('slate') || c.includes('black') || c.includes('#') || c.includes('zinc') || c.includes('white')));
