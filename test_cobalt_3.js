const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
async function test() {
   const res = await fetch("https://instances.cobalt.tools/instances.json");
   // wait, is it /instances.json? Let's check text
   console.log(res.status);
   console.log(await res.text());
}
test();
