const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
async function test() {
    let instances = ['vid.puffyan.us', 'invidious.flokinet.to', 'inv.bp.projectsegfau.lt', 'invidious.privacydev.net'];
    for(let inst of instances) {
        try {
            console.log("trying", inst);
            const res = await fetch(`https://${inst}/api/v1/videos/jNQXAC9IVRw`);
            if(res.ok) {
                const data = await res.json();
                const fmts = data.formatStreams;
                console.log("Success with", inst, fmts && fmts.length > 0);
                if(fmts && fmts.length) {
                    console.log(fmts[0].url);
                    break;
                }
            } else {
                 console.log("Failed", res.status);
            }
        } catch(e) {
            console.log("error");
        }
    }
}
test();
