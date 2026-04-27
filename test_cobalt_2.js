const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
async function getInstances() {
    try {
        const res = await fetch("https://api.github.com/repos/imputnet/cobalt/network/dependents");
        // Actually, there's a file of instances maybe?
        const cobaltRes = await fetch('https://cobalt.kimery.us/api/json', {
             method: 'POST',
             headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Origin': 'https://cobalt.kimery.us',
                'Referer': 'https://cobalt.kimery.us/'
             },
             body: JSON.stringify({ url: "https://www.youtube.com/watch?v=jNQXAC9IVRw", vQuality: "720" })
        });
        console.log(cobaltRes.status, await cobaltRes.text());
    } catch(err){
        console.log("error", err)
    }
}
getInstances();
