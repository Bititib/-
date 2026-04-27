import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import fs from 'fs';
import os from 'os';
import { GoogleGenAI, Type } from '@google/genai';
import { Readable } from 'stream';
import ytdl from '@distube/ytdl-core';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const upload = multer({ dest: os.tmpdir(), limits: { fileSize: 150 * 1024 * 1024 } });

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  app.post('/api/extract-video', async (req, res) => {
    const { url } = req.body;
    try {
      let videoUrl = url;

      // 1. Try to extract raw video URL if it's a platform link
      if (url.includes('tiktok.com') || url.includes('douyin.com')) {
        const tikwmRes = await fetch(`https://www.tikwm.com/api/?url=${encodeURIComponent(url)}`);
        const tikwmData = await tikwmRes.json();
        if (tikwmData.data && tikwmData.data.play) {
          videoUrl = tikwmData.data.play;
        } else {
          throw new Error('无法解析该 TikTok/Douyin 链接，请确保链接公开可用。');
        }
      } else if (url.includes('youtube.com') || url.includes('youtu.be')) {
         try {
            const info = await ytdl.getInfo(url);
            let format = ytdl.chooseFormat(info.formats, { quality: 'highest', filter: 'audioandvideo' });
            
            if (!format) {
               throw new Error('找不到包含音视频的有效 YouTube 格式。');
            }
            res.setHeader('Content-Type', 'video/mp4');
            if (format.contentLength) {
               if (parseInt(format.contentLength) > 150 * 1024 * 1024) {
                  throw new Error('视频文件过大，当前支持最高150MB的视频截取段。');
               }
               res.setHeader('Content-Length', format.contentLength);
            }
            
            const videoStream = ytdl.downloadFromInfo(info, { format });
            videoStream.pipe(res);
            videoStream.on('error', (err) => {
               console.error('Youtube stream error:', err);
               if (!res.headersSent) {
                  res.status(500).json({ error: '视频流传输失败' });
               } else {
                  res.end();
               }
            });
            return; // Finished YouTube handling
         } catch (e: any) {
            console.error('YouTube Fetch err:', e);
            if (e.message.includes('Sign in to confirm')) {
               throw new Error('由于 YouTube 触发了严格的反机器人验证 (Bot Check) 并在服务器端封锁了IP请求，建议您下载原始视频后，通过【本地上传】按键直接导入 .mp4 文件进行分析。');
            }
            throw new Error('无法解析该 YouTube 链接: ' + e.message);
         }
      } else {
         const isDirectUrl = url.endsWith('.mp4') || url.endsWith('.webm') || url.includes('video');
         if (!isDirectUrl) {
            console.log("Unsupported url type fell back to direct fetch:", url);
         }
      }

      // 2. Fetch the actual video stream to bypass CORS
      const videoRes = await fetch(videoUrl, {
         headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Referer': url
         }
      });

      if (!videoRes.ok) {
         throw new Error(`获取视频流失败 (HTTP ${videoRes.status})`);
      }

      const contentType = videoRes.headers.get('content-type') || 'video/mp4';
      if (contentType.includes('text/html') || contentType.includes('application/json')) {
         throw new Error('目标链接未返回有效的视频流');
      }

      const contentLength = videoRes.headers.get('content-length');
      if (contentLength && parseInt(contentLength) > 150 * 1024 * 1024) {
         throw new Error('视频文件过大，当前支持最高150MB的视频，如果是长视频请尝试截取片段或使用短视频链接。');
      }

      res.setHeader('Content-Type', contentType.startsWith('video/') ? contentType : 'video/mp4');
      if (contentLength) {
         res.setHeader('Content-Length', contentLength);
      }
      
      if (videoRes.body) {
         const readable = Readable.fromWeb(videoRes.body as any);
         readable.pipe(res);
         
         readable.on('error', (err) => {
            console.error('Stream error:', err);
            if (!res.headersSent) {
               res.status(500).json({ error: '视频流传输失败' });
            } else {
               res.end();
            }
         });
      } else {
         throw new Error('No video body');
      }

    } catch (error: any) {
      console.error('Extraction error:', error);
      res.status(500).json({ error: error.message });
    }
  });

  app.post('/api/extract-image', async (req, res) => {
    const { url } = req.body;
    try {
      let imageUrl = url;
      let audioUrl = '';
      let audioTitle = '';
      let audioAuthor = '';

      // 1. Try to extract raw image URL if it's a platform link
      if (url.includes('tiktok.com') || url.includes('douyin.com')) {
        const tikwmRes = await fetch(`https://www.tikwm.com/api/?url=${encodeURIComponent(url)}`);
        const tikwmData = await tikwmRes.json();
        if (tikwmData.data) {
          if (tikwmData.data.images && tikwmData.data.images.length > 0) {
            imageUrl = tikwmData.data.images[0]; // grab the first image
          } else if (tikwmData.data.cover) {
            imageUrl = tikwmData.data.cover;
          } else {
            throw new Error('无法解析该链接的图片，请确保链接包含图片或由于隐私设置无法访问。');
          }
          
          if (tikwmData.data.music_info) {
            if (tikwmData.data.music_info.play) audioUrl = tikwmData.data.music_info.play;
            if (tikwmData.data.music_info.title) audioTitle = tikwmData.data.music_info.title;
            if (tikwmData.data.music_info.author) audioAuthor = tikwmData.data.music_info.author;
          } else if (tikwmData.data.music) {
            audioUrl = tikwmData.data.music;
          }
        }
      }

      // 2. Fetch the actual image stream to bypass CORS
      const imageRes = await fetch(imageUrl, {
         headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Referer': url
         }
      });

      if (!imageRes.ok) {
         throw new Error(`获取图片失败 (HTTP ${imageRes.status})`);
      }

      const contentType = imageRes.headers.get('content-type') || 'image/jpeg';
      if (contentType.includes('text/html') || contentType.includes('application/json')) {
         throw new Error('目标链接未返回有效的图片数据');
      }

      const contentLength = imageRes.headers.get('content-length');
      if (contentLength && parseInt(contentLength) > 10 * 1024 * 1024) {
         throw new Error('图片文件过大，请使用小于10MB的图片');
      }

      res.setHeader('Content-Type', contentType.startsWith('image/') ? contentType : 'image/jpeg');
      if (contentLength) {
         res.setHeader('Content-Length', contentLength);
      }
      
      const exposeHeaders = ['X-Audio-Url'];
      if (audioUrl) {
         res.setHeader('X-Audio-Url', encodeURIComponent(audioUrl));
      }
      if (audioTitle) {
         exposeHeaders.push('X-Audio-Title');
         res.setHeader('X-Audio-Title', encodeURIComponent(audioTitle));
      }
      if (audioAuthor) {
         exposeHeaders.push('X-Audio-Author');
         res.setHeader('X-Audio-Author', encodeURIComponent(audioAuthor));
      }
      
      if (exposeHeaders.length > 0) {
         res.setHeader('Access-Control-Expose-Headers', exposeHeaders.join(', '));
      }
      
      if (imageRes.body) {
         const readable = Readable.fromWeb(imageRes.body as any);
         readable.pipe(res);
         
         readable.on('error', (err) => {
            console.error('Stream error:', err);
            if (!res.headersSent) {
               res.status(500).json({ error: '图片传输失败' });
            } else {
               res.end();
            }
         });
      } else {
         throw new Error('No image body');
      }

    } catch (error: any) {
      console.error('Extraction error:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Vite middleware
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
