async function test() {
  const cobaltRes = await fetch('https://api.cobalt.tools/', {
     method: 'POST',
     headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
     },
     body: JSON.stringify({ url: "https://www.instagram.com/p/DBk02rTuhG-/", vQuality: "720" })
  });
  console.log(cobaltRes.status, await cobaltRes.text());
}
test();
