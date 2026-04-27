import youtubedl from 'youtube-dl-exec';

async function test() {
  try {
    const output = await youtubedl('https://www.youtube.com/watch?v=jNQXAC9IVRw', {
      dumpSingleJson: true,
      noWarnings: true,
      noCallHome: true,
      preferFreeFormats: true,
      youtubeSkipDashManifest: true,
    });
    const videoUrl = output.url || (output.formats && output.formats.find(f => f.acodec !== 'none' && f.vcodec !== 'none')?.url);
    console.log("Success! Found URL:", !!videoUrl);
  } catch (err) {
    console.error("Error:", err.message);
  }
}
test();
