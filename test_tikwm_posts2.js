fetch('https://www.tikwm.com/api/user/posts?unique_id=tiktok&count=5', {
    headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
}).then(r=>r.json()).then(d => console.log(JSON.stringify(d, null, 2)));
