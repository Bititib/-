import React, { useState, useRef } from 'react';
import { 
  Video, 
  FileText, 
  LayoutTemplate, 
  Tag, 
  MessageCircle, 
  Music, 
  RefreshCw, 
  Wand2, 
  Copy,
  UploadCloud,
  ShoppingBag,
  Image as ImageIcon,
  PlaySquare,
  Target,
  Zap,
  Megaphone,
  ShoppingCart,
  List,
  Download,
  X,
  Plus,
  Users,
  TrendingUp,
  BarChart,
  Crosshair,
  Lightbulb,
  UserCheck,
  Search,
  Eye,
  MonitorPlay
} from 'lucide-react';
import html2canvas from 'html2canvas';

// Remove Gemini API client-side initialization
const Type = {
  OBJECT: 'OBJECT',
  STRING: 'STRING',
  ARRAY: 'ARRAY',
  NUMBER: 'NUMBER',
  INTEGER: 'INTEGER',
  BOOLEAN: 'BOOLEAN',
} as const;

interface AnalysisResult {
  overallConcept: string;
  reversePrompt: string;
  reversePromptTranslation: string;
  imageReversePrompt: string;
  imageReversePromptTranslation: string;
  titleAnalysis: string;
  keywords: string[];
  hotTopics: string[];
  hotMusicStyles: string[];
}

interface EcommerceAnalysisResult {
  productName: string;
  bestProductShotTimestamp: number;
  sellingPoints: string[];
  targetAudience: string;
  hookAnalysis: string;
  visualAndEmotionAnalysis: string;
  reversePrompt: string;
  reversePromptTranslation: string;
  imageReversePrompt: string;
  imageReversePromptTranslation: string;
  callToAction: string;
  scriptAnalysis: {
    overview: string;
    hook: string;
    body: string;
    callToAction: string;
    keywords: string[];
  };
  videoTranscript: string;
}

interface ImageAnalysisResult {
  overallConcept: string;
  reversePrompt: string;
  reversePromptTranslation: string;
  keywords: string[];
  styleTags: string[];
}

interface CopywritingResult {
  tiktok: {
    hook: string;
    caption: string;
    hashtags: string[];
  };
  amazon: {
    title: string;
    bulletPoints: string[];
    productDescription: string;
    searchTerms: string[];
  };
  detailPageImages: {
    imageType: string;
    textOverlay: string[];
    description: string;
    prompt: string;
  }[];
}

interface AccountAnalysisResult {
  contentAnalysis: {
    summary: string;
    commonalities: string[];
    visualStyle: string;
    hashtagsAndKeywords: string[];
  };
  audioAnalysis: {
    musicStyle: string;
    audioSources: string[];
    soundEffects: string[];
  };
  growthStrategy: {
    followerReason: string;
    hookPatterns: string[];
    engagementTactics: string[];
  };
  audienceAnalysis: {
    demographics: string;
    psychographics: string;
    painPoints: string[];
  };
  improvementPlan: {
    weaknesses: string[];
    differentiation: string[];
  };
  operationalAnalysis: {
    monetization: string;
    teamStructure: string;
    workflow: {
      phase: string;
      description: string;
    }[];
  };
  actionableBlueprint: {
    positioning: string;
    contentPillars: string[];
    executionSteps: string[];
    visualConcepts: {
      avatarPrompt: string;
      coverStylePrompt: string;
    };
  };
  calculatedPlayCount?: {
    estimatedTotal: string;
    explanation: string;
  };
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'general' | 'ecommerce' | 'image' | 'copywriting' | 'account'>('general');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [imageAudioUrl, setImageAudioUrl] = useState<string>('');
  const [imageAudioTitle, setImageAudioTitle] = useState<string>('');
  const [imageAudioAuthor, setImageAudioAuthor] = useState<string>('');
  const [imageRequiresText, setImageRequiresText] = useState(false);
  const [copyFiles, setCopyFiles] = useState<File[]>([]);
  const [copyPreviewUrls, setCopyPreviewUrls] = useState<string[]>([]);
  const [videoTitle, setVideoTitle] = useState('');
  const [videoUrlInput, setVideoUrlInput] = useState('');
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [isFetchingUrl, setIsFetchingUrl] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const [accountHandle, setAccountHandle] = useState('');
  const [accountDescription, setAccountDescription] = useState('');
  const [accountImages, setAccountImages] = useState<File[]>([]);
  const [accountPreviewUrls, setAccountPreviewUrls] = useState<string[]>([]);
  const [isFetchingAccountInfo, setIsFetchingAccountInfo] = useState(false);
  const [accountStats, setAccountStats] = useState<{videoCount?: number, followerCount?: number, heartCount?: number, nickname?: string, avatar?: string} | null>(null);

  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [ecommerceResult, setEcommerceResult] = useState<EcommerceAnalysisResult | null>(null);
  const [imageAnalysisResult, setImageAnalysisResult] = useState<ImageAnalysisResult | null>(null);
  const [copywritingResult, setCopywritingResult] = useState<CopywritingResult | null>(null);
  const [accountAnalysisResult, setAccountAnalysisResult] = useState<AccountAnalysisResult | null>(null);
  const [productImageUrl, setProductImageUrl] = useState<string | null>(null);
  const [generatedBackgrounds, setGeneratedBackgrounds] = useState<Record<number, string>>({});
  const [isGeneratingBg, setIsGeneratingBg] = useState<Record<number, boolean>>({});
  
  const [generatedAvatar, setGeneratedAvatar] = useState<string | null>(null);
  const [isGeneratingAvatar, setIsGeneratingAvatar] = useState(false);
  const [generatedCover, setGeneratedCover] = useState<string | null>(null);
  const [isGeneratingCover, setIsGeneratingCover] = useState(false);

  const [replacementProductImage, setReplacementProductImage] = useState<File | null>(null);
  const [replacementProductPreviewUrl, setReplacementProductPreviewUrl] = useState<string | null>(null);
  const [isModifyingPrompt, setIsModifyingPrompt] = useState(false);
  const [modifyPromptError, setModifyPromptError] = useState<string | null>(null);
  
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const copyInputRef = useRef<HTMLInputElement>(null);
  const replacementImageInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 150 * 1024 * 1024) { // 150MB limit
        setError('视频文件过大，请上传小于150MB的视频。');
        return;
      }
      setVideoFile(file);
      setVideoPreviewUrl(URL.createObjectURL(file));
      setError(null);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        setError('图片文件过大，请上传小于10MB的图片。');
        return;
      }
      setImageFile(file);
      setImagePreviewUrl(URL.createObjectURL(file));
      setImageAudioUrl('');
      setImageAudioTitle('');
      setImageAudioAuthor('');
      setError(null);
    }
  };

  const handleCopyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const newFiles = Array.from(files) as File[];
      const validFiles = newFiles.filter(file => file.size <= 150 * 1024 * 1024);
      
      if (validFiles.length < newFiles.length) {
        setError('部分文件过大，已忽略大于150MB的文件。');
      } else {
        setError(null);
      }

      if (validFiles.length > 0) {
        setCopyFiles(prev => [...prev, ...validFiles]);
        const newUrls = validFiles.map(file => URL.createObjectURL(file));
        setCopyPreviewUrls(prev => [...prev, ...newUrls]);
      }
    }
  };

  const removeCopyFile = (index: number) => {
    setCopyFiles(prev => prev.filter((_, i) => i !== index));
    setCopyPreviewUrls(prev => {
      const newUrls = [...prev];
      URL.revokeObjectURL(newUrls[index]);
      newUrls.splice(index, 1);
      return newUrls;
    });
  };

  const handleAccountImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const newFiles = Array.from(files) as File[];
      const validFiles = newFiles.filter(file => file.size <= 10 * 1024 * 1024);
      
      if (validFiles.length < newFiles.length) {
        setError('部分图片过大，已忽略大于10MB的图片。');
      } else {
        setError(null);
      }

      if (validFiles.length > 0) {
        setAccountImages(prev => [...prev, ...validFiles].slice(0, 5));
        const newUrls = validFiles.map(file => URL.createObjectURL(file));
        setAccountPreviewUrls(prev => [...prev, ...newUrls].slice(0, 5));
      }
    }
  };

  const removeAccountImage = (index: number) => {
    setAccountImages(prev => prev.filter((_, i) => i !== index));
    setAccountPreviewUrls(prev => {
      const newUrls = [...prev];
      URL.revokeObjectURL(newUrls[index]);
      newUrls.splice(index, 1);
      return newUrls;
    });
  };

  const handleReplacementImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit for images
        setModifyPromptError('图片文件过大，请上传小于10MB的图片。');
        return;
      }
      setReplacementProductImage(file);
      setReplacementProductPreviewUrl(URL.createObjectURL(file));
      setModifyPromptError(null);
    }
  };

  const handleReplacementImageDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files?.[0];
    const isImage = file && (file.type.startsWith('image/') || file.name.match(/\.(jpg|jpeg|png|webp|gif)$/i));
    if (isImage) {
      if (file.size > 10 * 1024 * 1024) {
        setModifyPromptError('图片文件过大，请上传小于10MB的图片。');
        return;
      }
      setReplacementProductImage(file);
      setReplacementProductPreviewUrl(URL.createObjectURL(file));
      setModifyPromptError(null);
    }
  };

  const handleModifyPrompt = async () => {
    if (!replacementProductImage || !ecommerceResult) {
      setModifyPromptError('请先上传替换产品图片。');
      return;
    }

    setIsModifyingPrompt(true);
    setModifyPromptError(null);

    try {
      const modifyPromptText = `你是一个专业的AI视频提示词专家。
我有一段现有的带货视频生成提示词，以及一张新产品的图片。
请分析这张新产品图片，并将现有提示词中的原产品替换为图片中的新产品。
保持原有的视频风格、镜头语言（特别是人物占位、机位角度、运镜方式）、场景结构和时间轴不变，仅仅替换产品描述。

现有纯英文提示词：
${ecommerceResult.reversePrompt}

请输出以下JSON格式的结果：
1. reversePrompt: 修改后的【100%纯英文】提示词。
2. reversePromptTranslation: 修改后的提示词的中文翻译。`;

      const formData = new FormData();
      formData.append('file', replacementProductImage);
      formData.append('modifyPromptText', modifyPromptText);

      const response = await fetch('/api/modify-prompt', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || '修改提示词失败');
      }

      const parsedResult = await response.json();
      setEcommerceResult({
        ...ecommerceResult,
        reversePrompt: parsedResult.reversePrompt,
        reversePromptTranslation: parsedResult.reversePromptTranslation,
      });

    } catch (err: any) {
      console.error('Modify prompt error:', err);
      setModifyPromptError(err.message || '修改提示词过程中发生错误，请重试。');
    } finally {
      setIsModifyingPrompt(false);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files?.[0];
    
    const isVideo = file && (file.type.startsWith('video/') || file.name.match(/\.(mp4|mov|avi|wmv|mkv|flv|webm)$/i));
    if (isVideo) {
      if (file.size > 150 * 1024 * 1024) {
        setError('视频文件过大，请上传小于150MB的视频。');
        return;
      }
      setVideoFile(file);
      setVideoPreviewUrl(URL.createObjectURL(file));
      setError(null);
    }
  };

  const handleImageDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files?.[0];
    const isImage = file && (file.type.startsWith('image/') || file.name.match(/\.(jpg|jpeg|png|webp|gif)$/i));
    if (isImage) {
      if (file.size > 10 * 1024 * 1024) {
        setError('图片文件过大，请上传小于10MB的图片。');
        return;
      }
      setImageFile(file);
      setImagePreviewUrl(URL.createObjectURL(file));
      setImageAudioUrl('');
      setImageAudioTitle('');
      setImageAudioAuthor('');
      setError(null);
    }
  };

  const handleCopyDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const files = Array.from(event.dataTransfer.files) as File[];
    const validMediaFiles = files.filter(file => 
      file.type.startsWith('image/') || file.type.startsWith('video/') ||
      file.name.match(/\.(jpg|jpeg|png|webp|gif|mp4|mov|avi|wmv|mkv|flv|webm)$/i)
    );
    if (validMediaFiles.length > 0) {
      const validFiles = validMediaFiles.filter(file => file.size <= 150 * 1024 * 1024);
      if (validFiles.length < validMediaFiles.length) {
        setError('部分文件过大，已忽略大于150MB的文件。');
      } else {
        setError(null);
      }
      
      if (validFiles.length > 0) {
        setCopyFiles(prev => [...prev, ...validFiles]);
        const newUrls = validFiles.map(file => URL.createObjectURL(file));
        setCopyPreviewUrls(prev => [...prev, ...newUrls]);
      }
    }
  };

  const handleAccountImageDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const files = Array.from(event.dataTransfer.files) as File[];
    const validImageFiles = files.filter(file => 
      file.type.startsWith('image/') || file.name.match(/\.(jpg|jpeg|png|webp|gif)$/i)
    );
    if (validImageFiles.length > 0) {
      const validFiles = validImageFiles.filter(file => file.size <= 10 * 1024 * 1024);
      if (validFiles.length < validImageFiles.length) {
        setError('部分图片过大，已忽略大于10MB的图片。');
      } else {
        setError(null);
      }
      
      if (validFiles.length > 0) {
        setAccountImages(prev => [...prev, ...validFiles].slice(0, 5));
        const newUrls = validFiles.map(file => URL.createObjectURL(file));
        setAccountPreviewUrls(prev => [...prev, ...newUrls].slice(0, 5));
      }
    }
  };

  const handleFetchAccountInfo = async () => {
    if (!accountHandle.trim()) {
      setError('请输入账号名称或链接');
      return;
    }
    setIsFetchingAccountInfo(true);
    setError(null);
    try {
      const response = await fetch('/api/extract-account', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ handle: accountHandle })
      });
      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `无法获取账号数据 (HTTP ${response.status})。`);
      }
      const data = await response.json();
      setAccountStats(data);
    } catch (err: any) {
      console.error('Account info fetch error:', err);
      setError(err.message || '获取账号数据失败');
    } finally {
      setIsFetchingAccountInfo(false);
    }
  };

  const handleUrlImport = async () => {
    if (!videoUrlInput.trim()) {
      setError('请输入视频URL。');
      return;
    }
    setIsFetchingUrl(true);
    setError(null);
    try {
      const response = await fetch('/api/extract-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: videoUrlInput })
      });
      
      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `无法获取视频 (HTTP ${response.status})。`);
      }
      
      const blob = await response.blob();
      if (!blob.type.startsWith('video/') && blob.type !== 'application/octet-stream') {
        throw new Error('解析失败：未获取到有效的视频流。');
      }
      if (blob.size > 150 * 1024 * 1024) {
        throw new Error('视频文件过大，请上传小于150MB的视频。');
      }
      const file = new File([blob], 'imported-video.mp4', { type: blob.type.startsWith('video/') ? blob.type : 'video/mp4' });
      setVideoFile(file);
      setVideoPreviewUrl(URL.createObjectURL(file));
      setVideoUrlInput('');
    } catch (err: any) {
      console.error('URL import error:', err);
      setError(err.message || '获取视频失败，请检查链接是否有效或受平台限制。');
    } finally {
      setIsFetchingUrl(false);
    }
  };

  const handleImageUrlImport = async () => {
    if (!imageUrlInput.trim()) {
      setError('请输入图片URL或图文链接。');
      return;
    }
    setIsFetchingUrl(true);
    setError(null);
    try {
      const response = await fetch('/api/extract-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: imageUrlInput })
      });
      
      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `无法获取图片 (HTTP ${response.status})。`);
      }
      
      const audioUrlHeader = response.headers.get('X-Audio-Url');
      const audioTitleHeader = response.headers.get('X-Audio-Title');
      const audioAuthorHeader = response.headers.get('X-Audio-Author');
      
      if (audioUrlHeader) {
        setImageAudioUrl(decodeURIComponent(audioUrlHeader));
      } else {
        setImageAudioUrl('');
      }
      
      if (audioTitleHeader) {
         setImageAudioTitle(decodeURIComponent(audioTitleHeader));
      } else {
         setImageAudioTitle('');
      }
      
      if (audioAuthorHeader) {
         setImageAudioAuthor(decodeURIComponent(audioAuthorHeader));
      } else {
         setImageAudioAuthor('');
      }
      
      const blob = await response.blob();
      if (!blob.type.startsWith('image/') && blob.type !== 'application/octet-stream') {
        throw new Error('解析失败：未获取到有效的图片数据。');
      }
      if (blob.size > 10 * 1024 * 1024) {
        throw new Error('图片文件过大，请上传小于10MB的图片。');
      }
      const file = new File([blob], 'imported-image.jpg', { type: blob.type.startsWith('image/') ? blob.type : 'image/jpeg' });
      setImageFile(file);
      setImagePreviewUrl(URL.createObjectURL(file));
      setImageUrlInput('');
    } catch (err: any) {
      console.error('Image URL import error:', err);
      setError(err.message || '获取图片失败，请检查链接是否有效或受平台限制。');
    } finally {
      setIsFetchingUrl(false);
    }
  };

  const extractFrame = (file: File, timestamp: number): Promise<string> => {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.src = URL.createObjectURL(file);
      video.crossOrigin = 'anonymous';
      video.currentTime = timestamp;
      video.muted = true;
      video.playsInline = true;

      video.onseeked = () => {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth || 1280;
        canvas.height = video.videoHeight || 720;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL('image/jpeg', 0.8));
        } else {
          reject(new Error('Canvas context not available'));
        }
        URL.revokeObjectURL(video.src);
      };

      video.onerror = (e) => {
        reject(new Error('Video frame extraction failed'));
        URL.revokeObjectURL(video.src);
      };
    });
  };

  const handleDownloadAplusBlock = async (index: number) => {
    const element = document.getElementById(`aplus-block-${index}`);
    if (!element) return;
    
    try {
      const canvas = await html2canvas(element, {
        scale: 2, // Higher resolution
        useCORS: true,
        backgroundColor: '#0f172a' // slate-900
      });
      
      const link = document.createElement('a');
      link.download = `Aplus_Block_${index + 1}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Failed to download image:', err);
      setError('下载图片失败，请重试。');
    }
  };

  const handleGenerateBackground = async (index: number, prompt: string) => {
    setIsGeneratingBg(prev => ({ ...prev, [index]: true }));
    try {
      let referenceImageBase64 = '';
      let referenceImageMimeType = '';

      if (copyFiles.length > 0 && copyFiles[0].type.startsWith('image/')) {
        const referenceFile = copyFiles[0];
        referenceImageMimeType = referenceFile.type;
        const reader = new FileReader();
        const base64Promise = new Promise<string>((resolve, reject) => {
          reader.onload = () => {
            if (typeof reader.result === 'string') {
              resolve(reader.result.split(',')[1]);
            } else {
              reject(new Error('Failed to read file'));
            }
          };
          reader.onerror = reject;
        });
        reader.readAsDataURL(referenceFile);
        referenceImageBase64 = await base64Promise;
      }

      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          aspectRatio: "16:9",
          referenceImageBase64,
          referenceImageMimeType
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate image');
      }

      const result = await response.json();
      setGeneratedBackgrounds(prev => ({ ...prev, [index]: result.imageUrl }));
    } catch (err) {
      console.error('Failed to generate background:', err);
      setError('AI 生成底图失败，请重试。');
    } finally {
      setIsGeneratingBg(prev => ({ ...prev, [index]: false }));
    }
  };

  const handleGenerateAccountImage = async (type: 'avatar' | 'cover', prompt: string) => {
    if (type === 'avatar') setIsGeneratingAvatar(true);
    else setIsGeneratingCover(true);
    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          aspectRatio: type === 'avatar' ? "1:1" : "16:9"
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to generate ${type}`);
      }

      const result = await response.json();
      if (type === 'avatar') setGeneratedAvatar(result.imageUrl);
      else setGeneratedCover(result.imageUrl);
    } catch (err) {
      console.error(`Failed to generate ${type}:`, err);
      setError(`生成${type === 'avatar' ? '头像' : '封面'}失败，请重试。`);
    } finally {
      if (type === 'avatar') setIsGeneratingAvatar(false);
      else setIsGeneratingCover(false);
    }
  };
  const handleAnalyze = async () => {
    if (activeTab === 'general' || activeTab === 'ecommerce') {
      if (!videoFile) return;
    } else if (activeTab === 'image') {
      if (!imageFile) return;
    } else if (activeTab === 'copywriting') {
      if (copyFiles.length === 0) return;
    } else if (activeTab === 'account') {
      if (!accountHandle && accountImages.length === 0) return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      const formData = new FormData();
      let promptText = '';
      let responseSchema: any = null;
      let model = 'gemini-1.5-flash';

      if (activeTab === 'image') {
        formData.append('files', imageFile!);
        promptText = `你是一个顶级的AI视觉导演和扩散模型（Diffusion Model）行为控制专家，精通Midjourney v6、Stable Diffusion和Flux的底层生成逻辑。
你的核心任务不是单纯地“描述图片”，而是编写能够“精确控制AI生成过程”的提示词代码，防止AI出现诸如：主体缩小、背景抢戏、色彩廉价、质感塑料等致命错误。
输出必须能生成与原图结构高度一致，且极具“高级专业感”的提示词，请严格按照以下维度输出结构化分析结果：
1. 画面总体思路 (overallConcept)：客观、克制地描述图片的核心内容、场景和真实氛围。
2. 逆向图片生成提示词 (reversePrompt)：请输出一段【100%纯英文】的图片生成提示词。必须极度精准并融入以下视觉指令层：
   - 【视觉权重与注意力控制 (Visual Hierarchy & Attention Control)】：精准定义画面的视觉焦点在哪！使用如 "eye immediately drawn toward...", "strong visual gravity centered on...", "highest detail density concentrated in...", "foreground dominates visual attention", "background intentionally understated" 等控制语句，强制AI建立主次关系，明确哪里细节最丰富、哪里被虚化。
   - 【色彩结构与层级 (Color Composition & Palette Control)】：高级画面绝不是五颜六色！必须分析色彩层级，强化冷暖对比，降低次要元素的饱和度。使用如 "dominant color palette of...", "muted secondary tones allowing the warm subject to dominate", "cinematic color harmony", "subtle warm-cool cinematic separation", "tonal balance" 等。
   - 【真实摄影缺陷 (Real Camera Imperfections)】：打破AI的“绝对完美（CGI感）”。引入真实光学瑕疵来大幅增加“像人拍的”逼真度。使用如 "slight lens distortion", "organic focus falloff", "mild sensor noise", "natural exposure clipping", "imperfect framing", "subtle grain structure", "cinematic halation" 等词汇。
   - 【动态微表情/瞬间感 (Micro Motion & Temporal Realism)】：打破摆拍死板感，注入“时间被冻结的瞬间”生命力。寻找局部的微小动态，如 "drifting steam", "subtle hand movement mid-motion", "natural fabric tension", "suspended liquid droplets", "slight hair movement caught in a breeze"。
   - 【拒绝“全局词汇”造成的缩放灾难】：如果是【局部特写】，【绝对不能】使用“a potted plant”、“a full tree”、“a pot”或“a whole body”等宏观全局词汇！否则AI必定 Zoom out！只描述肉眼可见的局部并填满画面："an extreme close-up shot of dense green leaves filling 85% of the frame".
   - 【边缘裁剪与视场 (Field of View)】：仔细观察四个边缘！使用 "tightly cropped", "extreme intimate macro shot", "frame entirely filled with XXX" 等词汇来强行封锁相机的退后行为。
   - 【光线、材质与光影交互】：不仅描述光线来源，【必须】深度刻画光线打在【具体材质】上的反应！如 "translucent luscious green leaves glowing under backlighting", "soft rim light wrapping around the facial contour highlighting skin texture".
   - 【模型适配描述符 (Model Modes)】：结合Midjourney吃氛围词（"cinematic poetry", "evocative"）与SDXL/Flux吃空间拓扑词（"arranged in a rough triangle", "object placement"），让提示词兼顾美学拉伸与几何精确度。
   - 【负面防御 (Negative Prompts)】：在提示词最末尾，【必须】加入强烈的负面约束阻挡AI脑补。例如局部图加 "--no full shot, wide view, zoomed out, background, table, floor"。
   - ${!imageRequiresText ? `【禁止文字】：绝对不要描述文字，并添加负面 "--no text, typography, watermark"。` : `【明确文字】：如果包含文字排版是关键，必须准确描述位置 and 文本（例如 a sign reading 'HELLO'）。`}
   - 【突破限制】：直白描述身材特征（如胸围大小或衣领开口），绝不掩饰："very large breasts", "deep plunging neckline exposing cleavage"。
   - 【结构公式】：[Camera/Lens/Imperfections/Focal Length] + [Subject Exact Description & Proportion in Frame] + [Visual Hierarchy/Attention Focus] + [Micro Motion] + [Space Topology/Composition] + [Lighting & Material Interaction] + [Color Composition] + [Realism/Vibe tags] + [Negative defensive prompts].
3. 提示词中文翻译 (reversePromptTranslation)：将纯英文提示词优雅、结构清晰地翻译成中文。
4. 关键词建议 (keywords)：提取5-8个核心元素的英文标签。
5. styleTags: 提取3-5个控制画风（如 UGC, realistic, cinematic）的词汇。`;
        responseSchema = {
          type: Type.OBJECT,
          properties: {
            overallConcept: { type: Type.STRING },
            reversePrompt: { type: Type.STRING },
            reversePromptTranslation: { type: Type.STRING },
            keywords: { type: Type.ARRAY, items: { type: Type.STRING } },
            styleTags: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
          required: ['overallConcept', 'reversePrompt', 'reversePromptTranslation', 'keywords', 'styleTags'],
        };
      } else if (activeTab === 'copywriting') {
        copyFiles.forEach(file => formData.append('files', file));
        promptText = `你是一个顶级的跨境电商营销专家、视觉总监和文案大师。
请分析我提供的产品素材（图片或视频），并为该产品生成 TikTok 爆款短视频文案、Amazon 亚马逊产品详情页（Listing）文案，以及【高转化A+详情页/海报配图策划】。
用户希望生成的详情页配图是类似营养保健品那种包含丰富排版、卖点文案、场景和对比的高级信息图（Infographic / A+ Content）。
请严格按照以下结构输出 JSON：
1. tiktok: 包含 hook (吸引眼球的开头/黄金3秒), caption (视频描述/脚本), hashtags (标签数组)。
2. amazon: 包含 title (SEO优化的标题，包含核心关键词), bulletPoints (5个核心卖点，每个卖点需包含简短标题和详细描述), productDescription (详细的产品描述，富有感染力), searchTerms (后台搜索关键词数组)。
3. detailPageImages: 详情页高级信息图（A+ Content）策划（5-6张图的规划）。
   包含:
   - imageType: 图片类型（如：核心卖点主图、痛点场景图、成分拆解图、竞品对比图等）
   - textOverlay: 数组格式。要求写出需要后期排版在图片上的【文案】。
   - description: 画面底图内容描述。
   - prompt: 用于AI绘画工具生成该图片的纯英文提示词。`;
        responseSchema = {
          type: Type.OBJECT,
          properties: {
            tiktok: {
              type: Type.OBJECT,
              properties: {
                hook: { type: Type.STRING },
                caption: { type: Type.STRING },
                hashtags: { type: Type.ARRAY, items: { type: Type.STRING } }
              },
              required: ["hook", "caption", "hashtags"]
            },
            amazon: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                bulletPoints: { type: Type.ARRAY, items: { type: Type.STRING } },
                productDescription: { type: Type.STRING },
                searchTerms: { type: Type.ARRAY, items: { type: Type.STRING } }
              },
              required: ["title", "bulletPoints", "productDescription", "searchTerms"]
            },
            detailPageImages: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  imageType: { type: Type.STRING },
                  textOverlay: { type: Type.ARRAY, items: { type: Type.STRING } },
                  description: { type: Type.STRING },
                  prompt: { type: Type.STRING }
                },
                required: ["imageType", "textOverlay", "description", "prompt"]
              }
            }
          },
          required: ["tiktok", "amazon", "detailPageImages"]
        };
      } else if (activeTab === 'account') {
        accountImages.forEach(file => formData.append('files', file));
        let currentStats = accountStats;
        const statsStr = currentStats ? `
当前账号数据：
- 视频总数: ${currentStats.videoCount}
- 粉丝数: ${currentStats.followerCount}
- 获赞数: ${currentStats.heartCount}
` : '';
        promptText = `你是一个顶级的TikTok/短视频账号操盘手、数据分析师和内容战略专家。
请根据我提供的账号信息（账号名/链接：${accountHandle}，账号描述：${accountDescription}）${statsStr}以及上传的账号主页/视频截图，对该账号进行全方位的深度拆解分析。
请严格按照以下结构输出 JSON：
1. contentAnalysis: 视频内容分析（summary: 内容总结, commonalities: 所有视频的共同点数组, visualStyle: 视觉与包装风格, hashtagsAndKeywords: 核心关键词数组）。
2. audioAnalysis: 音乐与音频策略（musicStyle: 整体音乐风格, audioSources: 常用音频来源数组, soundEffects: 音效使用技巧数组）。
3. growthStrategy: 涨粉与流量策略（followerReason: 吸引力, hookPatterns: Hook套路数组, engagementTactics: 互动与留存技巧数组）。
4. audienceAnalysis: 目标人群分析（demographics, psychographics, painPoints）。
5. improvementPlan: 改进方案（weaknesses, differentiation）。
6. operationalAnalysis: 背后运作剖析（monetization, teamStructure, workflow: 对象数组包含期 phase 和 description）。
7. actionableBlueprint: 操作实操蓝图（positioning, contentPillars, executionSteps, visualConcepts: {avatarPrompt, coverStylePrompt}）。
8. calculatedPlayCount: 估算总播放量（识别截图里所有视频具体的播放量数字并相加，给出 estimatedTotal 字符串和 explanation 依据）。`;
        responseSchema = {
          type: Type.OBJECT,
          properties: {
             contentAnalysis: { type: Type.OBJECT, properties: { summary: { type: Type.STRING }, commonalities: { type: Type.ARRAY, items: {type: Type.STRING} }, visualStyle: { type: Type.STRING }, hashtagsAndKeywords: { type: Type.ARRAY, items: {type:Type.STRING} } }, required: ["summary", "commonalities", "visualStyle", "hashtagsAndKeywords"] },
             audioAnalysis: { type: Type.OBJECT, properties: { musicStyle: { type: Type.STRING }, audioSources: { type: Type.ARRAY, items: {type:Type.STRING} }, soundEffects: { type: Type.ARRAY, items: {type:Type.STRING} } }, required: ["musicStyle", "audioSources", "soundEffects"] },
             growthStrategy: { type: Type.OBJECT, properties: { followerReason: { type: Type.STRING }, hookPatterns: { type: Type.ARRAY, items: {type:Type.STRING} }, engagementTactics: { type: Type.ARRAY, items: {type:Type.STRING} } }, required: ["followerReason", "hookPatterns", "engagementTactics"] },
             audienceAnalysis: { type: Type.OBJECT, properties: { demographics: { type: Type.STRING }, psychographics: { type: Type.STRING }, painPoints: { type: Type.ARRAY, items: {type:Type.STRING} } }, required: ["demographics", "psychographics", "painPoints"] },
             improvementPlan: { type: Type.OBJECT, properties: { weaknesses: { type: Type.ARRAY, items: {type:Type.STRING} }, differentiation: { type: Type.ARRAY, items: {type:Type.STRING} } }, required: ["weaknesses", "differentiation"] },
             operationalAnalysis: { type: Type.OBJECT, properties: { monetization: { type: Type.STRING }, teamStructure: { type: Type.STRING }, workflow: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { phase: {type:Type.STRING}, description: {type:Type.STRING} }, required: ["phase","description"] } } }, required: ["monetization", "teamStructure", "workflow"] },
             actionableBlueprint: { type: Type.OBJECT, properties: { positioning: { type: Type.STRING }, contentPillars: { type: Type.ARRAY, items: {type:Type.STRING} }, executionSteps: { type: Type.ARRAY, items: {type:Type.STRING} }, visualConcepts: { type: Type.OBJECT, properties: { avatarPrompt: {type:Type.STRING}, coverStylePrompt: {type:Type.STRING} }, required: ["avatarPrompt", "coverStylePrompt"] } }, required: ["positioning", "contentPillars", "executionSteps", "visualConcepts"] },
             calculatedPlayCount: { type: Type.OBJECT, properties: { estimatedTotal: {type:Type.STRING}, explanation: {type:Type.STRING} }, required: ["estimatedTotal", "explanation"] }
          },
          required: ["contentAnalysis", "audioAnalysis", "growthStrategy", "audienceAnalysis", "improvementPlan", "operationalAnalysis", "actionableBlueprint", "calculatedPlayCount"]
        };
      } else if (activeTab === 'general') {
        formData.append('files', videoFile!);
        promptText = `你是一个专业的短视频内容分析师和爆款制造机。
请分析我提供的视频${videoTitle ? `（标题为："${videoTitle}"）` : ''}，并输出以下维度的结构化分析结果：
1. 视频总体思路：分析视频的核心概念、叙事手法、情感基调和吸引观众的"钩子"。
2. 逆向视频生成提示词 (reversePrompt)：请严格按照以下【时间轴与结构化排版】输出一段【100%纯英文】的提示词。涵盖视频所有镜头直到最后一秒：
   [Overall Style]
   · Subject, Character Positioning & Scene
   ● Shot 1 (0s-Xs) ([Shot Theme])
   · Shot 2 (Xs-Ys) ([Shot Theme])
   · Shot N (Ys-End) ([Shot Theme])
   · Render Requirements
   1. Camera Shake
   2. Negative Prompt
3. 提示词中文翻译 (reversePromptTranslation)
4. 逆向图片生成提示词 (imageReversePrompt)
5. 图片提示词中文翻译 (imageReversePromptTranslation)
6. 标题分析
7. 关键词建议
8. 相关热门话题
9. 热门曲目/风格`;
        responseSchema = {
          type: Type.OBJECT,
          properties: {
            overallConcept: { type: Type.STRING },
            reversePrompt: { type: Type.STRING },
            reversePromptTranslation: { type: Type.STRING },
            imageReversePrompt: { type: Type.STRING },
            imageReversePromptTranslation: { type: Type.STRING },
            titleAnalysis: { type: Type.STRING },
            keywords: { type: Type.ARRAY, items: { type: Type.STRING } },
            hotTopics: { type: Type.ARRAY, items: { type: Type.STRING } },
            hotMusicStyles: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
          required: ['overallConcept', 'reversePrompt', 'reversePromptTranslation', 'imageReversePrompt', 'imageReversePromptTranslation', 'titleAnalysis', 'keywords', 'hotTopics', 'hotMusicStyles'],
        };
      } else {
        // Ecommerce
        formData.append('files', videoFile!);
        promptText = `你是一个专业的TikTok/抖音带货视频操盘手和AI视频提示词专家。
请分析我提供的带货视频${videoTitle ? `（标题为："${videoTitle}"）` : ''}，并输出以下维度的结构化分析结果：
1. 商品名称 (productName)
2. 最佳展示时间戳 (bestProductShotTimestamp): 用单位秒表示，如 2.5。
3. 核心卖点 (sellingPoints)
4. 目标人群 (targetAudience)
5. 痛点与钩子 (hookAnalysis)
6. 逆向视频生成提示词 (reversePrompt): 纯英文，涵盖全部长度。
7. 提示词中文翻译 (reversePromptTranslation)
8. 逆向图片生成提示词 (imageReversePrompt): 推荐最佳展示帧的提示词。
9. 图片提示词中文翻译 (imageReversePromptTranslation)
10. 促单话术 (callToAction)
11. 视觉丰富度与情感共鸣 (visualAndEmotionAnalysis)
12. 脚本文案分析 (scriptAnalysis): {overview, hook, body, callToAction, keywords}
13. 视频完整语音文案 (videoTranscript): 人物对白全文。`;
        responseSchema = {
          type: Type.OBJECT,
          properties: {
            productName: { type: Type.STRING },
            bestProductShotTimestamp: { type: Type.NUMBER },
            sellingPoints: { type: Type.ARRAY, items: { type: Type.STRING } },
            targetAudience: { type: Type.STRING },
            hookAnalysis: { type: Type.STRING },
            visualAndEmotionAnalysis: { type: Type.STRING },
            reversePrompt: { type: Type.STRING },
            reversePromptTranslation: { type: Type.STRING },
            imageReversePrompt: { type: Type.STRING },
            imageReversePromptTranslation: { type: Type.STRING },
            callToAction: { type: Type.STRING },
            scriptAnalysis: { type: Type.OBJECT, properties: { overview: {type:Type.STRING}, hook:{type:Type.STRING}, body:{type:Type.STRING}, callToAction:{type:Type.STRING}, keywords:{type:Type.ARRAY, items:{type:Type.STRING}} }, required: ['overview', 'hook', 'body', 'callToAction', 'keywords'] },
            videoTranscript: { type: Type.STRING }
          },
          required: ['productName', 'bestProductShotTimestamp', 'sellingPoints', 'targetAudience', 'hookAnalysis', 'visualAndEmotionAnalysis', 'reversePrompt', 'reversePromptTranslation', 'imageReversePrompt', 'imageReversePromptTranslation', 'callToAction', 'scriptAnalysis', 'videoTranscript'],
        };
      }

      formData.append('prompt', promptText);
      formData.append('responseSchema', JSON.stringify(responseSchema));
      formData.append('model', model);

      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || '分析失败');
      }

      const parsedResult = await response.json();

      if (activeTab === 'copywriting') {
        setCopywritingResult(parsedResult);
      } else if (activeTab === 'image') {
        setImageAnalysisResult(parsedResult);
      } else if (activeTab === 'account') {
        setAccountAnalysisResult(parsedResult);
      } else if (activeTab === 'general') {
        setAnalysisResult(parsedResult);
      } else {
        setEcommerceResult(parsedResult);
        if (parsedResult.bestProductShotTimestamp !== undefined && videoFile) {
          try {
            const frameUrl = await extractFrame(videoFile, parsedResult.bestProductShotTimestamp);
            setProductImageUrl(frameUrl);
          } catch (e) {
            console.error('Failed to extract frame:', e);
          }
        }
      }

    } catch (err: any) {
      console.error('Analysis error:', err);
      setError(err.message || '分析过程中发生错误，请重试。');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const resetState = () => {
    setVideoFile(null);
    setVideoPreviewUrl(null);
    setImageFile(null);
    setImagePreviewUrl(null);
    setImageAudioUrl('');
    setImageAudioTitle('');
    setImageAudioAuthor('');
    setCopyFiles([]);
    setCopyPreviewUrls([]);
    setAccountHandle('');
    setAccountDescription('');
    setAccountImages([]);
    setAccountPreviewUrls([]);
    setVideoTitle('');
    setVideoUrlInput('');
    setAnalysisResult(null);
    setEcommerceResult(null);
    setImageAnalysisResult(null);
    setCopywritingResult(null);
    setAccountAnalysisResult(null);
    setProductImageUrl(null);
    setError(null);
    setReplacementProductImage(null);
    setReplacementProductPreviewUrl(null);
    setModifyPromptError(null);
    setGeneratedAvatar(null);
    setGeneratedCover(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (imageInputRef.current) imageInputRef.current.value = '';
    if (copyInputRef.current) copyInputRef.current.value = '';
    if (replacementImageInputRef.current) replacementImageInputRef.current.value = '';
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col md:flex-row">
      {/* Sidebar / Top Nav (Mobile) */}
      <div className="w-full md:w-64 shrink-0 bg-black flex flex-col md:h-screen sticky top-0 md:overflow-y-auto z-50 border-r border-white/5">
        <div className="p-4 md:p-6 flex flex-col gap-3 md:gap-8 h-full">
          <header className="flex-shrink-0 flex items-center justify-between md:block">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-1 md:mb-2">
                短视频创意风暴
              </h1>
              <p className="text-zinc-400 text-xs leading-relaxed hidden md:block">
                上传视频，AI为你分析核心概念、逆向工程提示词，并提供增长建议。
              </p>
            </div>
          </header>

          <nav className="flex flex-row md:flex-col gap-2 flex-shrink-0 md:flex-1 overflow-x-auto overflow-y-hidden pb-1 md:pb-0 [&::-webkit-scrollbar]:hidden" style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
            <button
              onClick={() => { setActiveTab('general'); setAnalysisResult(null); setEcommerceResult(null); setImageAnalysisResult(null); setCopywritingResult(null); setAccountAnalysisResult(null); }}
              className={`flex items-center gap-2 md:gap-3 px-3 py-2 md:px-4 md:py-3.5 rounded-lg md:rounded-xl text-xs md:text-sm font-medium transition-all shrink-0 md:w-full text-left group ${
                activeTab === 'general' 
                  ? 'bg-white/10 text-white border-0' 
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5 border border-transparent'
              }`}
            >
              <PlaySquare className={`w-4 h-4 md:w-5 md:h-5 shrink-0 transition-colors ${activeTab === 'general' ? 'text-blue-400' : 'text-zinc-400 group-hover:text-white'}`} />
              <span>通用分析</span>
            </button>
            <button
              onClick={() => { setActiveTab('ecommerce'); setAnalysisResult(null); setEcommerceResult(null); setImageAnalysisResult(null); setCopywritingResult(null); setAccountAnalysisResult(null); }}
              className={`flex items-center gap-2 md:gap-3 px-3 py-2 md:px-4 md:py-3.5 rounded-lg md:rounded-xl text-xs md:text-sm font-medium transition-all shrink-0 md:w-full text-left group ${
                activeTab === 'ecommerce' 
                  ? 'bg-white/10 text-white border-0' 
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5 border border-transparent'
              }`}
            >
              <ShoppingBag className={`w-4 h-4 md:w-5 md:h-5 shrink-0 transition-colors ${activeTab === 'ecommerce' ? 'text-purple-400' : 'text-zinc-400 group-hover:text-white'}`} />
              <span>带货分析</span>
            </button>
            <button
              onClick={() => { setActiveTab('image'); setAnalysisResult(null); setEcommerceResult(null); setImageAnalysisResult(null); setCopywritingResult(null); setAccountAnalysisResult(null); }}
              className={`flex items-center gap-2 md:gap-3 px-3 py-2 md:px-4 md:py-3.5 rounded-lg md:rounded-xl text-xs md:text-sm font-medium transition-all shrink-0 md:w-full text-left group ${
                activeTab === 'image' 
                  ? 'bg-white/10 text-white border-0' 
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5 border border-transparent'
              }`}
            >
              <ImageIcon className={`w-4 h-4 md:w-5 md:h-5 shrink-0 transition-colors ${activeTab === 'image' ? 'text-pink-400' : 'text-zinc-400 group-hover:text-white'}`} />
              <span>图片逆向</span>
            </button>
            <button
              onClick={() => { setActiveTab('copywriting'); setAnalysisResult(null); setEcommerceResult(null); setImageAnalysisResult(null); setCopywritingResult(null); setAccountAnalysisResult(null); }}
              className={`flex items-center gap-2 md:gap-3 px-3 py-2 md:px-4 md:py-3.5 rounded-lg md:rounded-xl text-xs md:text-sm font-medium transition-all shrink-0 md:w-full text-left group ${
                activeTab === 'copywriting' 
                  ? 'bg-white/10 text-white border-0' 
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5 border border-transparent'
              }`}
            >
              <Megaphone className={`w-4 h-4 md:w-5 md:h-5 shrink-0 transition-colors ${activeTab === 'copywriting' ? 'text-orange-400' : 'text-zinc-400 group-hover:text-white'}`} />
              <span>电商文案</span>
            </button>
            <button
              onClick={() => { setActiveTab('account'); setAnalysisResult(null); setEcommerceResult(null); setImageAnalysisResult(null); setCopywritingResult(null); setAccountAnalysisResult(null); }}
              className={`flex items-center gap-2 md:gap-3 px-3 py-2 md:px-4 md:py-3.5 rounded-lg md:rounded-xl text-xs md:text-sm font-medium transition-all shrink-0 md:w-full text-left group ${
                activeTab === 'account' 
                  ? 'bg-white/10 text-white border-0' 
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5 border border-transparent'
              }`}
            >
              <Users className={`w-4 h-4 md:w-5 md:h-5 shrink-0 transition-colors ${activeTab === 'account' ? 'text-emerald-400' : 'text-zinc-400 group-hover:text-white'}`} />
              <span>账号分析</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Right Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row min-h-screen md:h-screen md:overflow-hidden bg-[#0c0c0c] relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/[0.01] via-transparent to-transparent pointer-events-none"></div>
          
        {/* Middle Panel - Inputs */}
        <div className="w-full lg:w-[350px] xl:w-[380px] shrink-0 h-fit lg:h-full lg:overflow-y-auto border-r border-white/5 bg-black relative z-10 [&::-webkit-scrollbar]:hidden" style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
          <div className="p-4 sm:p-6 flex flex-col min-h-full">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                {activeTab === 'general' ? <><PlaySquare className="w-6 h-6 text-zinc-300" /> 开始通用分析</> : 
                 activeTab === 'ecommerce' ? <><ShoppingBag className="w-6 h-6 text-zinc-300" /> 开始带货分析</> : 
                 activeTab === 'image' ? <><ImageIcon className="w-6 h-6 text-zinc-300" /> 开始图片逆向分析</> : 
                 activeTab === 'copywriting' ? <><Megaphone className="w-6 h-6 text-zinc-300" /> 开始生成爆款文案</> : 
                 <><Users className="w-6 h-6 text-zinc-300" /> 开始账号全方位分析</>}
              </h2>
            
            {/* Account Inputs */}
            {activeTab === 'account' && (
              <div className="flex flex-col gap-6 mb-8">
                <div className="flex flex-col gap-6">
                  <div className="flex-1 flex flex-col gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-400 mb-2 uppercase tracking-wider">
                        账号名称或主页链接 (必填)
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={accountHandle}
                          onChange={(e) => setAccountHandle(e.target.value)}
                          placeholder="例如：@tiktok_creator 或 主页链接"
                          className="flex-1 bg-white/[0.03] border-none rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-white/20 transition-all placeholder:text-zinc-600"
                        />
                        <button
                          onClick={handleFetchAccountInfo}
                          disabled={isFetchingAccountInfo || !accountHandle.trim()}
                          className={`px-4 py-2 rounded-xl font-medium transition-colors whitespace-nowrap ${
                            isFetchingAccountInfo || !accountHandle.trim()
                              ? 'bg-white/[0.02] text-zinc-500 cursor-not-allowed border-none'
                              : 'bg-white/[0.05] hover:bg-white/[0.1] text-white border-none'
                          }`}
                        >
                          {isFetchingAccountInfo ? '获取中...' : '获取最新数据'}
                        </button>
                      </div>
                    </div>
                    {accountStats && (
                      <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-4">
                        {accountStats.avatar && (
                          <img src={accountStats.avatar} alt="Avatar" className="w-12 h-12 rounded-full object-cover" />
                        )}
                        <div className="flex-1">
                          <h4 className="text-white font-medium text-sm">{accountStats.nickname}</h4>
                          <div className="flex gap-4 mt-1 text-xs text-zinc-400">
                            <span>视频数: <strong className="text-zinc-200">{accountStats.videoCount?.toLocaleString()}</strong></span>
                            <span>粉丝: <strong className="text-zinc-200">{accountStats.followerCount?.toLocaleString()}</strong></span>
                            <span>获赞: <strong className="text-zinc-200">{accountStats.heartCount?.toLocaleString()}</strong></span>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="flex-1 flex flex-col">
                      <label className="block text-xs font-semibold text-zinc-400 mb-2 uppercase tracking-wider">
                        账号内容简述 (选填，帮助AI更精准分析)
                      </label>
                      <textarea
                        value={accountDescription}
                        onChange={(e) => setAccountDescription(e.target.value)}
                        placeholder="描述一下这个账号主要发什么内容，或者你观察到的特点..."
                        className="w-full bg-white/[0.03] border-none rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-white/20 transition-all placeholder:text-zinc-600"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-2 uppercase tracking-wider">
                    上传账号主页或爆款视频截图 (强烈建议，最多5张)
                  </label>
                  <div 
                    className={`relative border-none rounded-lg overflow-hidden transition-colors h-[230px] ${
                      accountPreviewUrls.length > 0 ? 'border-white/5  p-4 overflow-y-auto' : 'border-white/5 hover:border-emerald-500/50  flex items-center justify-center cursor-pointer'
                    }`}
                    onDragEnter={(e) => { e.preventDefault(); e.stopPropagation(); }}
                    onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                    onDrop={handleAccountImageDrop}
                    onClick={(e) => {
                      if (accountPreviewUrls.length === 0) {
                        imageInputRef.current?.click();
                      }
                    }}
                  >
                    {accountPreviewUrls.length > 0 ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {accountPreviewUrls.map((url, index) => (
                          <div key={index} className="relative group aspect-square rounded-lg overflow-hidden bg-black/50 border border-white/5">
                            <img src={url} alt={`Preview ${index}`} className="w-full h-full object-cover opacity-80" />
                            <button 
                              onClick={(e) => { e.preventDefault(); e.stopPropagation(); removeAccountImage(index); }}
                              className="absolute top-1 right-1 bg-red-500/80 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                        {accountPreviewUrls.length < 5 && (
                          <div 
                            onClick={() => imageInputRef.current?.click()}
                            className="aspect-square rounded-lg border-none bg-white/[0.03] hover:bg-[#151515] flex flex-col items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer bg-black"
                          >
                            <Plus className="w-6 h-6 mb-1" />
                            <span className="text-xs">添加</span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center p-6">
                        <UploadCloud className="w-10 h-10 text-zinc-500 mx-auto mb-3" />
                        <p className="text-sm text-zinc-400">点击或拖拽截图至此处</p>
                        <p className="text-xs text-zinc-500 mt-2">支持多图上传 (最大 10MB)</p>
                      </div>
                    )}
                    <input 
                      type="file" 
                      accept="image/*" 
                      multiple
                      className="hidden" 
                      ref={imageInputRef}
                      onChange={handleAccountImageChange}
                    />
                  </div>
                  {accountPreviewUrls.length > 0 && (
                    <button 
                      onClick={() => {
                        setAccountImages([]);
                        setAccountPreviewUrls([]);
                        if (imageInputRef.current) imageInputRef.current.value = '';
                      }}
                      className="text-xs text-zinc-300 hover:text-red-300 mt-2 block"
                    >
                      清空全部图片
                    </button>
                  )}
                </div>
              </div>
            )}

{/* General & Ecommerce Inputs */}
            {(activeTab === 'general' || activeTab === 'ecommerce') && (
              <div className="flex flex-col gap-6 mb-8">
                <div className="flex flex-col gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-2 uppercase tracking-wider">
                       视频标题 (可选)
                    </label>
                    <input
                      type="text"
                      value={videoTitle}
                      onChange={(e) => setVideoTitle(e.target.value)}
                      placeholder="输入吸引人的标题..."
                      className="w-full bg-white/[0.03] border-none rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-white/20 transition-all placeholder:text-zinc-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-2 uppercase tracking-wider">
                       从视频URL导入
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        value={videoUrlInput}
                        onChange={(e) => setVideoUrlInput(e.target.value)}
                        placeholder="https://example.com/video.mp4 或 TikTok链接"
                        className="flex-1 bg-white/[0.03] border-none rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-white/20 transition-all placeholder:text-zinc-600"
                        onKeyDown={(e) => e.key === 'Enter' && handleUrlImport()}
                      />
                      <button
                        onClick={handleUrlImport}
                        disabled={isFetchingUrl || !videoUrlInput.trim()}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                          isFetchingUrl || !videoUrlInput.trim()
                            ? 'bg-white/[0.02] text-zinc-500 cursor-not-allowed border-none'
                            : 'bg-white/[0.05] hover:bg-white/[0.1] text-white border-none'
                        }`}
                      >
                        {isFetchingUrl ? '获取中...' : '导入'}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col h-full">
                  <label className="block text-xs font-semibold text-zinc-400 mb-2 uppercase tracking-wider">
                     上传视频文件
                  </label>
                  <div 
                    className={`relative border-none rounded-lg overflow-hidden transition-colors flex-1 min-h-[160px] ${
                      videoPreviewUrl ? 'border-white/5 bg-black' : 'border-white/5 hover:border-blue-500/50 '
                    } flex items-center justify-center cursor-pointer`}
                    onDragEnter={(e) => { e.preventDefault(); e.stopPropagation(); }}
                    onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                    onDrop={handleDrop}
                    onClick={() => !videoPreviewUrl && fileInputRef.current?.click()}
                  >
                    {videoPreviewUrl ? (
                      <video 
                        src={videoPreviewUrl} 
                        controls 
                        className="w-full h-full object-contain rounded-lg"
                      />
                    ) : (
                      <div className="text-center p-6">
                        <UploadCloud className="w-10 h-10 text-zinc-500 mx-auto mb-3" />
                        <p className="text-sm text-zinc-400">点击或拖拽视频文件至此处</p>
                        <p className="text-xs text-zinc-500 mt-2">支持 MP4, WebM (最大 50MB)</p>
                      </div>
                    )}
                    <input 
                      type="file" 
                      accept="video/*" 
                      className="hidden" 
                      ref={fileInputRef}
                      onChange={handleFileChange}
                    />
                  </div>
                  {videoPreviewUrl && (
                    <button 
                      onClick={() => {
                        setVideoFile(null);
                        setVideoPreviewUrl(null);
                        if (fileInputRef.current) fileInputRef.current.value = '';
                      }}
                      className="text-xs text-zinc-300 hover:text-red-300 mt-2 self-start"
                    >
                      移除视频
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Image Inputs */}
            {activeTab === 'image' && (
              <div className="flex flex-col gap-6 mb-8">
                <div className="flex flex-col gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-2 uppercase tracking-wider">
                       从图片URL/图文链接导入
                    </label>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="url"
                        value={imageUrlInput}
                        onChange={(e) => setImageUrlInput(e.target.value)}
                        placeholder="如：图片直链 或 TikTok图文链接"
                        className="flex-1 bg-white/[0.03] border-none rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-white/20 transition-all placeholder:text-zinc-600"
                        onKeyDown={(e) => e.key === 'Enter' && handleImageUrlImport()}
                      />
                      <button
                        onClick={handleImageUrlImport}
                        disabled={isFetchingUrl || !imageUrlInput.trim()}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                          isFetchingUrl || !imageUrlInput.trim()
                            ? 'bg-white/[0.02] text-zinc-500 cursor-not-allowed border-none'
                            : 'bg-white/[0.05] hover:bg-white/[0.1] text-white border-none'
                        }`}
                      >
                        {isFetchingUrl ? '获取中...' : '导入'}
                      </button>
                    </div>
                    {imageAudioUrl && (
                      <div className="p-3 bg-pink-500/10 border border-white/5 rounded-lg flex flex-col gap-3 mt-3 relative mb-4">
                        <div className="flex items-center justify-between gap-2">
                           <div className="flex items-center gap-2">
                             <Music className="w-4 h-4 text-zinc-300" />
                             <span className="text-sm text-pink-300 font-medium">提取到的原始音频</span>
                           </div>
                           <div className="flex items-center gap-2">
                             <button 
                               onClick={() => navigator.clipboard.writeText(imageAudioUrl)}
                               className="text-xs px-2 py-1 bg-pink-500/20 text-pink-300 rounded hover:bg-pink-500/30 transition-colors"
                             >
                               复制链接
                             </button>
                             <a 
                               href={imageAudioUrl} 
                               target="_blank" 
                               rel="noreferrer"
                               className="text-xs px-2 py-1 bg-pink-500/20 text-pink-300 rounded hover:bg-pink-500/30 transition-colors"
                             >
                               打开链接
                             </a>
                           </div>
                        </div>
                        <audio controls src={imageAudioUrl} className="w-full h-8" />
                        <div className="text-[10px] text-zinc-300/60 break-all border border-pink-500/10 /50 p-2 rounded">
                          Url: {imageAudioUrl}
                        </div>
                        {(imageAudioTitle || imageAudioAuthor) && (
                          <div className="pt-2 border-t border-white/5">
                            <p className="text-[11px] text-pink-300 mb-1 font-medium">手机发布时搜索该音频链接的关键词：</p>
                            <div className="flex flex-wrap gap-1.5 break-all">
                              {imageAudioTitle && <span className=" border border-white/5 px-2 py-0.5 rounded text-xs select-all cursor-text text-white">{imageAudioTitle}</span>}
                              {imageAudioAuthor && <span className=" border border-white/5 px-2 py-0.5 rounded text-xs select-all cursor-text text-white">{imageAudioAuthor}</span>}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-2">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative">
                        <input 
                          type="checkbox" 
                          className="sr-only" 
                          checked={imageRequiresText}
                          onChange={(e) => setImageRequiresText(e.target.checked)}
                        />
                        <div className={`block w-10 h-6 rounded-full transition-colors ${imageRequiresText ? 'bg-pink-500' : 'bg-black group-hover:bg-slate-600'}`}></div>
                        <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${imageRequiresText ? 'translate-x-4' : ''}`}></div>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-white group-hover:text-white transition-colors">是否需要生成海报文字？</span>
                        <p className="text-xs text-zinc-500 mt-0.5">默认生成纯净无边框的主体画面。勾选后，AI 将提取原图文字并尝试还原排版。</p>
                      </div>
                    </label>
                  </div>
                </div>
                
                <div className="flex flex-col h-full">
                  <label className="block text-xs font-semibold text-zinc-400 mb-2 uppercase tracking-wider">
                     上传图片文件
                  </label>
                  <div 
                    className={`relative border-none rounded-lg overflow-hidden transition-colors flex-1 min-h-[160px] ${
                      imagePreviewUrl ? 'border-white/5 bg-black' : 'border-white/5 hover:border-pink-500/50 '
                    } flex items-center justify-center cursor-pointer`}
                    onDragEnter={(e) => { e.preventDefault(); e.stopPropagation(); }}
                    onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                    onDrop={handleImageDrop}
                    onClick={() => !imagePreviewUrl && imageInputRef.current?.click()}
                  >
                    {imagePreviewUrl ? (
                      <img 
                        src={imagePreviewUrl} 
                        alt="Preview" 
                        className="w-full h-full object-contain rounded-lg"
                      />
                    ) : (
                      <div className="text-center p-6">
                        <ImageIcon className="w-10 h-10 text-zinc-500 mx-auto mb-3" />
                        <p className="text-sm text-zinc-400">点击或拖拽图片文件至此处</p>
                        <p className="text-xs text-zinc-500 mt-2">支持 JPG, PNG, WEBP (最大 10MB)</p>
                      </div>
                    )}
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      ref={imageInputRef}
                      onChange={handleImageChange}
                    />
                  </div>
                  {imagePreviewUrl && (
                    <button 
                      onClick={() => {
                        setImageFile(null);
                        setImagePreviewUrl(null);
                        setImageAudioUrl('');
                        setImageAudioTitle('');
                        setImageAudioAuthor('');
                        if (imageInputRef.current) imageInputRef.current.value = '';
                      }}
                      className="text-xs text-zinc-300 hover:text-red-300 mt-2 self-start"
                    >
                      移除图片
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Copywriting Inputs */}
            {activeTab === 'copywriting' && (
              <div className="mb-8">
                <label className="block text-xs font-semibold text-zinc-400 mb-2 uppercase tracking-wider">
                   上传产品图片或视频
                </label>
                <div 
                  className={`relative border-none rounded-lg overflow-hidden transition-colors ${
                    copyPreviewUrls.length > 0 ? 'border-white/5  p-4' : 'border-white/5 hover:border-orange-500/50  flex items-center justify-center min-h-[160px] cursor-pointer'
                  }`}
                  onDragEnter={(e) => { e.preventDefault(); e.stopPropagation(); }}
                  onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                  onDrop={handleCopyDrop}
                  onClick={(e) => {
                    if (copyPreviewUrls.length === 0) {
                      copyInputRef.current?.click();
                    }
                  }}
                >
                  {copyPreviewUrls.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
                      {copyPreviewUrls.map((url, index) => (
                        <div key={index} className="relative group aspect-square rounded-lg overflow-hidden bg-black/50 border border-white/5">
                          {copyFiles[index].type.startsWith('video/') ? (
                            <video src={url} className="w-full h-full object-cover opacity-80" />
                          ) : (
                            <img src={url} alt={`Preview ${index}`} className="w-full h-full object-cover opacity-80" />
                          )}
                          <button 
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); removeCopyFile(index); }}
                            className="absolute top-1 right-1 bg-red-500/80 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                      <div 
                        onClick={() => copyInputRef.current?.click()}
                        className="aspect-square rounded-lg border-none bg-white/[0.03] hover:bg-[#151515] flex flex-col items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer bg-black"
                      >
                        <Plus className="w-6 h-6 mb-1" />
                        <span className="text-xs">添加</span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center p-6">
                      <UploadCloud className="w-10 h-10 text-zinc-500 mx-auto mb-3" />
                      <p className="text-sm text-zinc-400">点击或拖拽产品素材至此处</p>
                      <p className="text-xs text-zinc-500 mt-2">支持多图上传 (最大 50MB)</p>
                    </div>
                  )}
                  <input 
                    type="file" 
                    accept="video/*,image/*" 
                    multiple
                    className="hidden" 
                    ref={copyInputRef}
                    onChange={handleCopyChange}
                  />
                </div>
                {copyPreviewUrls.length > 0 && (
                  <button 
                    onClick={() => {
                      setCopyFiles([]);
                      setCopyPreviewUrls([]);
                      if (copyInputRef.current) copyInputRef.current.value = '';
                    }}
                    className="text-xs text-zinc-300 hover:text-red-300 mt-2 block"
                  >
                    清空全部文件
                  </button>
                )}
              </div>
            )}


            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-zinc-300 text-sm">
                {error}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing || (activeTab === 'image' ? !imageFile : activeTab === 'copywriting' ? copyFiles.length === 0 : activeTab === 'account' ? (!accountHandle && accountImages.length === 0) : !videoFile)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-all bg-black ${
                  isAnalyzing || (activeTab === 'image' ? !imageFile : activeTab === 'copywriting' ? copyFiles.length === 0 : activeTab === 'account' ? (!accountHandle && accountImages.length === 0) : !videoFile)
                    ? 'bg-white/5 text-zinc-500 cursor-not-allowed border-0'
                    : activeTab === 'general' 
                      ? 'bg-white text-black hover:bg-zinc-200 border-none font-semibold'
                      : activeTab === 'ecommerce'
                        ? 'bg-white text-black hover:bg-zinc-200 border-none font-semibold'
                        : activeTab === 'copywriting'
                          ? 'bg-white text-black hover:bg-zinc-200 border-none font-semibold'
                          : activeTab === 'account'
                            ? 'bg-white text-black hover:bg-zinc-200 border-none font-semibold'
                            : 'bg-white text-black hover:bg-zinc-200 border-none font-semibold'
                }`}
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    {activeTab === 'copywriting' ? '生成中...' : '分析中...'}
                  </>
                ) : (
                  <>
                    <Wand2 className="w-5 h-5" />
                    {activeTab === 'general' ? '执行通用分析' : activeTab === 'ecommerce' ? '执行带货分析' : activeTab === 'copywriting' ? '一键生成文案' : activeTab === 'account' ? '执行账号分析' : '执行图片分析'}
                  </>
                )}
              </button>
              <button 
                className="p-3 bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white rounded-lg transition-colors border-0"
                title="重置"
                onClick={resetState}
              >
                <RefreshCw className="w-5 h-5 text-zinc-400" />
              </button>
            </div>
          </div>
        </div>

          {/* Right Panel - Results */}
          <div className="w-full space-y-6 flex-1 h-fit lg:h-full lg:overflow-y-auto p-4 sm:p-6 lg:p-8 scroll-smooth relative z-0">
          {(!analysisResult && !ecommerceResult && !imageAnalysisResult && !copywritingResult && !accountAnalysisResult) ? (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center rounded-2xl bg-white/[0.02] border border-white/5 text-zinc-500 shadow-inner">
              <Wand2 className="w-12 h-12 mb-4 opacity-20" />
              <p>上传文件并点击执行，结果将显示在这里</p>
            </div>
          ) : activeTab === 'account' && accountAnalysisResult ? (
            <div className="flex flex-col gap-6">
              {/* Content Analysis */}
              <div className="bg-black rounded-2xl border border-white/5 overflow-hidden shadow-2xl shadow-black/50">
                <div className="border-b border-white/5 bg-black p-4 flex items-center gap-2">
                  <PlaySquare className="w-5 h-5 text-zinc-300" />
                  <h3 className="text-lg font-semibold text-white">视频内容分析</h3>
                </div>
                <div className="p-4 sm:p-6 space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-zinc-400 mb-2">内容总结</h4>
                    <p className="text-white  p-4 rounded-xl border border-white/5 leading-relaxed">
                      {accountAnalysisResult.contentAnalysis.summary}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-zinc-400 mb-2">爆款基因 / 共同点</h4>
                    <ul className="space-y-2">
                      {accountAnalysisResult.contentAnalysis.commonalities.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-white  p-3 rounded-lg border border-white/5">
                          <span className="text-white font-bold mt-0.5">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-zinc-400 mb-2">视觉与包装风格</h4>
                    <p className="text-white  p-4 rounded-xl border border-white/5 leading-relaxed">
                      {accountAnalysisResult.contentAnalysis.visualStyle}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-zinc-400 mb-2">常用标签与核心关键词</h4>
                    <div className="flex flex-wrap gap-2">
                      {accountAnalysisResult.contentAnalysis.hashtagsAndKeywords.map((tag, i) => (
                        <span key={i} className="px-3 py-1.5 bg-[#00f2fe]/10 text-[#00f2fe] border border-[#00f2fe]/20 rounded-full text-sm font-medium">
                          {tag.startsWith('#') ? tag : `#${tag}`}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Audio Analysis */}
              <div className="bg-black rounded-2xl border border-white/5 overflow-hidden shadow-2xl shadow-black/50">
                <div className="border-b border-white/5 bg-black p-4 flex items-center gap-2">
                  <Music className="w-5 h-5 text-zinc-300" />
                  <h3 className="text-lg font-semibold text-white">音乐与音频策略</h3>
                </div>
                <div className="p-4 sm:p-6 space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-zinc-400 mb-2">整体音乐风格与情绪定调</h4>
                    <p className="text-white  p-4 rounded-xl border border-white/5 leading-relaxed">
                      {accountAnalysisResult.audioAnalysis.musicStyle}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-medium text-zinc-400 mb-2">常用音频来源 / 类型</h4>
                      <ul className="space-y-2">
                        {accountAnalysisResult.audioAnalysis.audioSources.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-white  p-3 rounded-lg border border-white/5">
                            <span className="text-white font-bold mt-0.5">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-zinc-400 mb-2">音效使用技巧</h4>
                      <ul className="space-y-2">
                        {accountAnalysisResult.audioAnalysis.soundEffects.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-white  p-3 rounded-lg border border-white/5">
                            <span className="text-white font-bold mt-0.5">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Growth Strategy */}
              <div className="bg-black rounded-2xl border border-white/5 overflow-hidden shadow-2xl shadow-black/50">
                <div className="border-b border-white/5 bg-black p-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-zinc-300" />
                  <h3 className="text-lg font-semibold text-white">涨粉与流量策略</h3>
                </div>
                <div className="p-4 sm:p-6 space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-zinc-400 mb-2">核心吸引力 / 涨粉原因</h4>
                    <p className="text-emerald-300 bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20 leading-relaxed font-medium">
                      {accountAnalysisResult.growthStrategy.followerReason}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-medium text-zinc-400 mb-2 flex items-center gap-2"><Zap className="w-4 h-4 text-yellow-400"/> 常用 Hook 套路</h4>
                      <ul className="space-y-2">
                        {accountAnalysisResult.growthStrategy.hookPatterns.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-white  p-3 rounded-lg border border-white/5 text-sm">
                            <span className="text-yellow-500 font-bold mt-0.5">→</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-zinc-400 mb-2 flex items-center gap-2"><MessageCircle className="w-4 h-4 text-zinc-300"/> 互动与留存技巧</h4>
                      <ul className="space-y-2">
                        {accountAnalysisResult.growthStrategy.engagementTactics.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-white  p-3 rounded-lg border border-white/5 text-sm">
                            <span className="text-white font-bold mt-0.5">→</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Audience Analysis */}
              <div className="bg-black rounded-2xl border border-white/5 overflow-hidden shadow-2xl shadow-black/50">
                <div className="border-b border-white/5 bg-black p-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-zinc-300" />
                  <h3 className="text-lg font-semibold text-white">目标人群分析</h3>
                </div>
                <div className="p-4 sm:p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-medium text-zinc-400 mb-2">人群画像 (年龄/性别/地域)</h4>
                      <p className="text-white  p-4 rounded-xl border border-white/5 leading-relaxed h-full">
                        {accountAnalysisResult.audienceAnalysis.demographics}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-zinc-400 mb-2">心理特征与兴趣偏好</h4>
                      <p className="text-white  p-4 rounded-xl border border-white/5 leading-relaxed h-full">
                        {accountAnalysisResult.audienceAnalysis.psychographics}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-zinc-400 mb-2">击中的核心痛点</h4>
                    <div className="flex flex-wrap gap-2">
                      {accountAnalysisResult.audienceAnalysis.painPoints.map((item, i) => (
                        <span key={i} className="px-3 py-1.5 bg-red-500/10 text-zinc-300 border border-red-500/20 rounded-full text-sm">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Improvement Plan */}
              <div className="bg-black rounded-2xl border border-white/5 overflow-hidden shadow-2xl shadow-black/50">
                <div className="border-b border-white/5 bg-black p-4 flex items-center gap-2">
                  <Crosshair className="w-5 h-5 text-zinc-300" />
                  <h3 className="text-lg font-semibold text-white">改进与差异化方案</h3>
                </div>
                <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-zinc-300 mb-2">该账号目前的不足 / 可优化点</h4>
                    <ul className="space-y-2">
                      {accountAnalysisResult.improvementPlan.weaknesses.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-white  p-3 rounded-lg border border-white/5">
                          <span className="text-white font-bold mt-0.5">✗</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-zinc-300 mb-2">如何做到比它更吸引人 (差异化)</h4>
                    <ul className="space-y-2">
                      {accountAnalysisResult.improvementPlan.differentiation.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-white  p-3 rounded-lg border border-white/5">
                          <span className="text-white font-bold mt-0.5">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Operational Analysis */}
              <div className="bg-black rounded-2xl border border-white/5 overflow-hidden shadow-2xl shadow-black/50">
                <div className="border-b border-white/5 bg-black p-4 flex items-center gap-2">
                  <BarChart className="w-5 h-5 text-zinc-300" />
                  <h3 className="text-lg font-semibold text-white">背后运作深度剖析</h3>
                </div>
                <div className="p-4 sm:p-6 space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-zinc-400 mb-2">变现路径与商业模式分析</h4>
                    <p className="text-white  p-4 rounded-xl border border-white/5 leading-relaxed">
                      {accountAnalysisResult.operationalAnalysis.monetization}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-medium text-zinc-400 mb-2">团队配置推测</h4>
                      <p className="text-white  p-4 rounded-xl border border-white/5 leading-relaxed h-full">
                        {accountAnalysisResult.operationalAnalysis.teamStructure}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-zinc-400 mb-2">内容生产SOP推测</h4>
                      <ul className="text-white p-4 rounded-xl border border-white/5 space-y-4 h-full">
                        {accountAnalysisResult.operationalAnalysis.workflow.map((step, i) => (
                          <li key={i} className="flex flex-col gap-1 text-sm leading-relaxed">
                            <span className="font-semibold text-emerald-400">{i+1}. {step.phase}</span>
                            <span className="text-zinc-300">{step.description}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  {accountAnalysisResult.calculatedPlayCount && (
                    <div className="mt-6 border-t border-white/5 pt-6">
                      <div className="flex items-center gap-2 mb-3">
                        <MonitorPlay className="w-5 h-5 text-emerald-400" />
                        <h4 className="text-sm font-medium text-emerald-300">截图总播放量估算 (AI视觉识别)</h4>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-emerald-900/30 border border-emerald-500/20 rounded-xl p-4 flex flex-col justify-center items-center">
                          <span className="text-zinc-400 text-xs uppercase tracking-widest font-semibold mb-1">估算加和总数</span>
                          <span className="text-3xl font-bold text-white tracking-tight">{accountAnalysisResult.calculatedPlayCount.estimatedTotal}</span>
                        </div>
                        <div className="md:col-span-2">
                           <p className="text-sm text-zinc-300 leading-relaxed bg-black/30 p-4 rounded-xl border border-white/5">
                             {accountAnalysisResult.calculatedPlayCount.explanation}
                           </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Actionable Blueprint */}
              <div className="bg-gradient-to-br from-emerald-900/40 to-[#1e1f2e] rounded-2xl border border-emerald-500/30 overflow-hidden shadow-2xl">
                <div className="border-b border-emerald-500/20 bg-emerald-500/10 p-4 flex items-center gap-2">
                  <Lightbulb className="w-6 h-6 text-zinc-300" />
                  <h3 className="text-xl font-bold text-emerald-300">对标超越实操蓝图</h3>
                </div>
                <div className="p-4 sm:p-6 space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-zinc-300/80 mb-2">全新账号定位</h4>
                    <p className="text-white text-lg font-medium bg-black/30 p-4 rounded-xl border border-emerald-500/20">
                      {accountAnalysisResult.actionableBlueprint.positioning}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-zinc-300/80 mb-2">内容支柱 / 选题方向</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {accountAnalysisResult.actionableBlueprint.contentPillars.map((item, i) => (
                        <div key={i} className="bg-black/20 p-3 rounded-lg border border-emerald-500/10 text-emerald-100 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-zinc-300/80 mb-2">起号实操步骤</h4>
                    <div className="space-y-3">
                      {accountAnalysisResult.actionableBlueprint.executionSteps.map((item, i) => (
                        <div key={i} className="flex gap-4 bg-black/20 p-4 rounded-xl border border-emerald-500/10">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/20 text-zinc-300 flex items-center justify-center font-bold">
                            {i + 1}
                          </div>
                          <p className="text-emerald-50 pt-1">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="border-t border-emerald-500/20 pt-6">
                    <h4 className="text-sm font-medium text-zinc-300/80 mb-4">视觉包装概念生成</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Avatar Generation */}
                      <div className="bg-black/20 p-4 rounded-xl border border-emerald-500/10 flex flex-col">
                        <div className="flex justify-between items-start mb-3">
                          <h5 className="text-emerald-300 font-medium text-sm">账号头像概念</h5>
                          <button
                            onClick={() => handleGenerateAccountImage('avatar', accountAnalysisResult.actionableBlueprint.visualConcepts.avatarPrompt)}
                            disabled={isGeneratingAvatar}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-zinc-300 hover:text-emerald-300 rounded-lg transition-colors border border-emerald-500/30 text-xs disabled:opacity-50"
                          >
                            {isGeneratingAvatar ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Wand2 className="w-3.5 h-3.5" />}
                            {isGeneratingAvatar ? '生成中...' : '生成头像'}
                          </button>
                        </div>
                        <p className="text-xs text-emerald-500/60 mb-4 flex-1">{accountAnalysisResult.actionableBlueprint.visualConcepts.avatarPrompt}</p>
                        {generatedAvatar && (
                          <div className="mt-auto aspect-square rounded-lg overflow-hidden border border-emerald-500/20">
                            <img src={generatedAvatar} alt="Generated Avatar" className="w-full h-full object-cover" />
                          </div>
                        )}
                      </div>
                      {/* Cover Generation */}
                      <div className="bg-black/20 p-4 rounded-xl border border-emerald-500/10 flex flex-col">
                        <div className="flex justify-between items-start mb-3">
                          <h5 className="text-emerald-300 font-medium text-sm">视频封面风格</h5>
                          <button
                            onClick={() => handleGenerateAccountImage('cover', accountAnalysisResult.actionableBlueprint.visualConcepts.coverStylePrompt)}
                            disabled={isGeneratingCover}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-zinc-300 hover:text-emerald-300 rounded-lg transition-colors border border-emerald-500/30 text-xs disabled:opacity-50"
                          >
                            {isGeneratingCover ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Wand2 className="w-3.5 h-3.5" />}
                            {isGeneratingCover ? '生成中...' : '生成封面'}
                          </button>
                        </div>
                        <p className="text-xs text-emerald-500/60 mb-4 flex-1">{accountAnalysisResult.actionableBlueprint.visualConcepts.coverStylePrompt}</p>
                        {generatedCover && (
                          <div className="mt-auto aspect-video rounded-lg overflow-hidden border border-emerald-500/20">
                            <img src={generatedCover} alt="Generated Cover" className="w-full h-full object-cover" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : activeTab === 'copywriting' && copywritingResult ? (
            /* Copywriting Results */
            <div className="flex flex-col gap-6">
              {/* TikTok Section */}
              <div className="bg-black rounded-2xl border border-white/5 overflow-hidden shadow-2xl shadow-black/50">
                <div className="border-b border-white/5 bg-gradient-to-r from-[#000000] to-[#111111] p-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Music className="w-5 h-5 text-[#00f2fe]" />
                    <h3 className="text-lg font-semibold text-white">TikTok 爆款短视频文案</h3>
                  </div>
                  <button 
                    onClick={() => copyToClipboard(`${copywritingResult.tiktok.hook}\n\n${copywritingResult.tiktok.caption}\n\n${copywritingResult.tiktok.hashtags.join(' ')}`)}
                    className="p-2 bg-black border border-orange-500/30 text-orange-400 hover:border-orange-500/50 hover:bg-orange-500/10 rounded-md transition-colors flex items-center gap-1 text-xs shadow-[0_0_10px_rgba(249,115,22,0.1)]"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    复制全部
                  </button>
                </div>
                <div className="p-4 sm:p-6 space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-[#00f2fe] mb-2 flex items-center gap-2">
                      <Zap className="w-4 h-4" /> 黄金三秒 Hook
                    </h4>
                    <p className="text-white  p-4 rounded-xl border border-white/5 text-lg font-medium shadow-inner">
                      {copywritingResult.tiktok.hook}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-zinc-400 mb-2 flex items-center gap-2">
                      <FileText className="w-4 h-4" /> 视频脚本 / 描述
                    </h4>
                    <p className="text-white  p-4 rounded-xl border border-white/5 whitespace-pre-wrap leading-relaxed">
                      {copywritingResult.tiktok.caption}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-zinc-400 mb-2 flex items-center gap-2">
                      <Tag className="w-4 h-4" /> 热门标签
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {copywritingResult.tiktok.hashtags.map((tag, i) => (
                        <span key={i} className="px-3 py-1.5 bg-[#00f2fe]/10 text-[#00f2fe] border border-[#00f2fe]/20 rounded-full text-sm font-medium">
                          {tag.startsWith('#') ? tag : `#${tag}`}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Amazon Section */}
              <div className="bg-black rounded-2xl border border-white/5 overflow-hidden shadow-2xl shadow-black/50">
                <div className="border-b border-white/5 bg-gradient-to-r from-[#232f3e] to-[#131921] p-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5 text-[#ff9900]" />
                    <h3 className="text-lg font-semibold text-white">Amazon 亚马逊 Listing</h3>
                  </div>
                  <button 
                    onClick={() => copyToClipboard(`Title:\n${copywritingResult.amazon.title}\n\nBullet Points:\n${copywritingResult.amazon.bulletPoints.map(p => `• ${p}`).join('\n')}\n\nDescription:\n${copywritingResult.amazon.productDescription}\n\nSearch Terms:\n${copywritingResult.amazon.searchTerms.join(', ')}`)}
                    className="p-2 bg-black border border-orange-500/30 text-orange-400 hover:border-orange-500/50 hover:bg-orange-500/10 rounded-md transition-colors flex items-center gap-1 text-xs shadow-[0_0_10px_rgba(249,115,22,0.1)]"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    复制全部
                  </button>
                </div>
                <div className="p-4 sm:p-6 space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-[#ff9900] mb-2 flex items-center gap-2">
                      <Target className="w-4 h-4" /> 产品标题 (Title)
                    </h4>
                    <p className="text-slate-200  p-4 rounded-xl border border-white/5 font-medium leading-relaxed">
                      {copywritingResult.amazon.title}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-zinc-400 mb-3 flex items-center gap-2">
                      <List className="w-4 h-4" /> 五点描述 (Bullet Points)
                    </h4>
                    <ul className="space-y-3">
                      {copywritingResult.amazon.bulletPoints.map((point, i) => (
                        <li key={i} className="flex gap-3 text-white  p-4 rounded-xl border border-white/5">
                          <span className="text-[#ff9900] font-bold shrink-0">0{i + 1}</span>
                          <span className="leading-relaxed">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-zinc-400 mb-2 flex items-center gap-2">
                      <LayoutTemplate className="w-4 h-4" /> 产品描述 (Product Description)
                    </h4>
                    <p className="text-white  p-4 rounded-xl border border-white/5 whitespace-pre-wrap leading-relaxed">
                      {copywritingResult.amazon.productDescription}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-zinc-400 mb-2 flex items-center gap-2">
                      <Tag className="w-4 h-4" /> 后台搜索词 (Search Terms)
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {copywritingResult.amazon.searchTerms.map((term, i) => (
                        <span key={i} className="px-3 py-1 bg-black text-white border border-white/5 rounded-md text-sm">
                          {term}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Detail Page Images Section */}
              <div className="bg-black rounded-2xl border border-white/5 overflow-hidden shadow-2xl shadow-black/50">
                <div className="border-b border-white/5 bg-gradient-to-r from-[#1a1b26] to-[#1e1f2e] p-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-zinc-300" />
                    <h3 className="text-lg font-semibold text-white">详情页 A+ Content 策划 (排版文案 + AI底图)</h3>
                  </div>
                </div>
                <div className="p-4 sm:p-6 space-y-6">
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-6">
                    <p className="text-sm text-blue-300 leading-relaxed">
                      <strong className="text-zinc-300">💡 制作建议：</strong> AI 绘图工具不擅长生成复杂的文字排版。最专业的做法是：点击下方的 <strong>AI 生成场景图</strong>，系统会根据您上传的产品原图，为您生成融合产品的精美场景底图。然后使用 Canva 或 Photoshop 将 <strong>图片排版文案</strong> 添加到图片上。
                      <br/><br/>
                      为了方便预览，系统已为您自动生成了<strong>网页版排版预览图</strong>，您可以直接点击下载分段图片！
                    </p>
                  </div>
                  {copywritingResult.detailPageImages?.map((img, i) => (
                    <div key={i} className=" p-5 rounded-xl border border-white/5">
                      <h4 className="text-md font-semibold text-zinc-300 mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="bg-pink-500/20 text-zinc-300 px-2 py-0.5 rounded text-sm">{i + 1}</span>
                          {img.imageType}
                        </div>
                        <button
                          onClick={() => handleDownloadAplusBlock(i)}
                          className="flex items-center justify-center gap-2 px-3 py-1.5 w-full sm:w-auto bg-blue-500/10 hover:bg-blue-500/20 text-zinc-300 hover:text-blue-300 rounded-lg transition-colors border border-blue-500/20 text-sm"
                        >
                          <Download className="w-4 h-4" />
                          下载此分段
                        </button>
                      </h4>
                      
                      {/* Visual Preview Block (Hidden from normal flow, used for html2canvas or visual display) */}
                      <div className="mb-6 border border-white/5 rounded-xl overflow-hidden">
                        <div className="bg-black px-4 py-2 border-b border-white/5 flex justify-between items-center">
                          <span className="text-xs text-zinc-400">视觉排版预览 (970x600)</span>
                          <button
                            onClick={() => handleGenerateBackground(i, img.prompt)}
                            disabled={isGeneratingBg[i]}
                            className="flex items-center justify-center gap-2 px-3 py-1.5 w-full sm:w-auto px-4 py-2 bg-black hover:bg-white text-white hover:text-black border border-white/5 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm font-medium w-full sm:w-auto shadow-[0_0_10px_rgba(255,255,255,0.1)] text-xs disabled:opacity-50"
                          >
                            {isGeneratingBg[i] ? (
                              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <Wand2 className="w-3.5 h-3.5" />
                            )}
                            {isGeneratingBg[i] ? '正在生成...' : 'AI 生成场景图'}
                          </button>
                        </div>
                        <div className="overflow-x-auto bg-black">
                          <div 
                            id={`aplus-block-${i}`} 
                            className="w-[970px] h-[600px] relative flex items-center p-16 shrink-0 overflow-hidden"
                          >
                            {/* Background Layer */}
                            {generatedBackgrounds[i] ? (
                              <>
                                <img 
                                  src={generatedBackgrounds[i]} 
                                  alt="AI Generated Background" 
                                  className="absolute inset-0 w-full h-full object-cover"
                                  crossOrigin="anonymous"
                                />
                                <div 
                                  className={`absolute inset-0 w-full h-full ${i % 2 === 0 ? 'bg-gradient-to-r from-black/80 via-black/40 to-transparent' : 'bg-gradient-to-l from-black/80 via-black/40 to-transparent'}`}
                                />
                              </>
                            ) : (
                              <div 
                                className="absolute inset-0 w-full h-full"
                                style={{
                                  backgroundImage: i % 2 === 0 
                                    ? 'linear-gradient(to bottom right, #1e293b, #0f172a)' 
                                    : 'linear-gradient(to bottom left, #0f172a, #1e293b)'
                                }}
                              />
                            )}

                            {/* Text Content */}
                            <div className={`z-10 flex flex-col gap-4 sm:gap-6 relative ${i % 2 === 0 ? 'w-full sm:w-4/5 md:w-3/5 sm:pr-8' : 'w-full sm:w-4/5 md:w-3/5 sm:pl-8 sm:ml-auto order-1 sm:order-2'}`}>
                              {img.textOverlay.map((text, idx) => (
                                <div key={idx}>
                                  {idx === 0 ? (
                                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight tracking-tight shadow-black/50 drop-shadow-md break-words">
                                      {text}
                                    </h2>
                                  ) : idx === 1 ? (
                                    <h3 className="text-2xl font-bold text-zinc-300 leading-snug drop-shadow-sm">
                                      {text}
                                    </h3>
                                  ) : (
                                    <div className="flex items-start gap-3 mt-2">
                                      <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 mt-1">
                                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                                      </div>
                                      <p className="text-xl text-slate-200 leading-relaxed font-medium drop-shadow-md">
                                        {text}
                                      </p>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                            
                            {/* Product Image Placeholder (Only show if no AI background) */}
                            {!generatedBackgrounds[i] && (
                              <div className={`absolute top-1/2 -translate-y-1/2 h-[80%] w-[40%] z-10 ${i % 2 === 0 ? 'right-12' : 'left-12'}`}>
                                {copyPreviewUrls.length > 0 && copyFiles[0]?.type.startsWith('image/') ? (
                                  <img 
                                    src={copyPreviewUrls[0]} 
                                    alt="Product" 
                                    className="w-full h-full object-contain drop-shadow-2xl"
                                    crossOrigin="anonymous"
                                  />
                                ) : (
                                  <div className="w-full h-full bg-black border-none border-slate-600 rounded-2xl flex flex-col items-center justify-center text-zinc-500 backdrop-blur-sm">
                                    <ImageIcon className="w-16 h-16 mb-4 opacity-50" />
                                    <p className="text-lg font-medium">AI 底图区域</p>
                                    <p className="text-sm mt-2 px-6 text-center">{img.description}</p>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Text Overlay Section */}
                      <div className="mb-4 bg-black p-4 rounded-lg border border-white/5">
                        <h5 className="text-xs font-semibold text-zinc-400 mb-3 uppercase tracking-wider flex items-center gap-2">
                          <LayoutTemplate className="w-3.5 h-3.5" /> 图片排版文案 (后期添加)
                        </h5>
                        <ul className="space-y-2">
                          {img.textOverlay.map((text, idx) => (
                            <li key={idx} className="text-sm text-slate-200 flex items-start gap-2">
                              <span className="text-pink-500 mt-0.5 font-bold">•</span>
                              <span className="leading-relaxed">{text}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <p className="text-white mb-4 text-sm leading-relaxed">
                        <span className="text-zinc-500 font-medium mr-2">底图画面描述:</span>
                        {img.description}
                      </p>
                      <div className="bg-black p-4 rounded-lg border border-white/5 relative group">
                        <span className="absolute top-3 right-3 text-xs text-zinc-500 uppercase tracking-wider">AI 底图 Prompt</span>
                        <pre className="text-sm text-pink-100 whitespace-pre-wrap font-mono leading-relaxed mt-2 pt-4">
                          {img.prompt}
                        </pre>
                        <button 
                          onClick={() => copyToClipboard(img.prompt)}
                          className="absolute bottom-3 right-3 p-1.5 bg-black border border-orange-500/30 text-orange-400 hover:border-orange-500/50 hover:bg-orange-500/10 rounded-md transition-colors opacity-0 group-hover:opacity-100 shadow-[0_0_10px_rgba(249,115,22,0.1)]"
                          title="复制提示词"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : activeTab === 'general' && analysisResult ? (
            /* General Analysis Results */
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Overall Concept */}
              <div className="bg-black rounded-xl p-4 sm:p-6 border border-white/5 shadow-xl shadow-black/40 md:col-span-3">
                <div className="flex items-center gap-2 mb-4">
                  <Video className="w-5 h-5 text-zinc-300" />
                  <h3 className="text-lg font-medium text-white">视频总体思路</h3>
                </div>
                <p className="text-white leading-relaxed text-sm md:text-base">
                  {analysisResult.overallConcept}
                </p>
              </div>

              {/* Reverse Prompt */}
              <div className="bg-black rounded-xl p-4 sm:p-6 border border-white/5 shadow-xl shadow-black/40 flex flex-col md:col-span-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <LayoutTemplate className="w-5 h-5 text-zinc-300" />
                    <h3 className="text-lg font-medium text-white">逆向视频生成提示词</h3>
                  </div>
                  <button 
                    onClick={() => copyToClipboard(analysisResult.reversePrompt)}
                    className="flex items-center justify-center gap-2 px-4 py-2 w-full sm:w-auto bg-black border border-blue-500/30 text-blue-400 hover:border-blue-500/50 hover:bg-blue-500/10 rounded-lg transition-colors text-sm font-medium shadow-[0_0_10px_rgba(59,130,246,0.1)]"
                    title="一键复制纯英文提示词"
                  >
                    <Copy className="w-4 h-4" />
                    <span className="text-sm font-medium">复制英文</span>
                  </button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className=" rounded-lg p-4 border border-white/5 flex-1">
                    <h4 className="text-sm font-medium text-zinc-400 mb-3 uppercase tracking-wider">English Prompt</h4>
                    <p className="text-white text-sm leading-relaxed whitespace-pre-wrap break-all font-mono">
                      {analysisResult.reversePrompt}
                    </p>
                  </div>
                  <div className="bg-black rounded-lg p-4 border border-white/5 flex-1">
                    <h4 className="text-sm font-medium text-zinc-400 mb-3 uppercase tracking-wider">中文翻译对照</h4>
                    <p className="text-white text-sm leading-relaxed whitespace-pre-wrap break-all font-sans">
                      {analysisResult.reversePromptTranslation}
                    </p>
                  </div>
                </div>
              </div>

              {/* Image Reverse Prompt */}
              <div className="bg-black rounded-xl p-4 sm:p-6 border border-white/5 shadow-xl shadow-black/40 flex flex-col md:col-span-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-zinc-300" />
                    <h3 className="text-lg font-medium text-white">逆向图片生成提示词</h3>
                  </div>
                  <button 
                    onClick={() => copyToClipboard(analysisResult.imageReversePrompt)}
                    className="flex items-center justify-center gap-2 px-4 py-2 w-full sm:w-auto bg-black border border-pink-500/30 text-pink-400 hover:border-pink-500/50 hover:bg-pink-500/10 rounded-lg transition-colors text-sm font-medium shadow-[0_0_10px_rgba(236,72,153,0.1)]"
                    title="一键复制纯英文图片提示词"
                  >
                    <Copy className="w-4 h-4" />
                    <span className="text-sm font-medium">复制英文</span>
                  </button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className=" rounded-lg p-4 border border-white/5 flex-1">
                    <h4 className="text-sm font-medium text-zinc-400 mb-3 uppercase tracking-wider">English Prompt</h4>
                    <p className="text-white text-sm leading-relaxed whitespace-pre-wrap break-all font-mono">
                      {analysisResult.imageReversePrompt}
                    </p>
                  </div>
                  <div className="bg-black rounded-lg p-4 border border-white/5 flex-1">
                    <h4 className="text-sm font-medium text-zinc-400 mb-3 uppercase tracking-wider">中文翻译对照</h4>
                    <p className="text-white text-sm leading-relaxed whitespace-pre-wrap break-all font-sans">
                      {analysisResult.imageReversePromptTranslation}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Title & Keywords */}
              <div className="flex flex-col gap-6 md:col-span-1">
                <div className="bg-black rounded-xl p-4 sm:p-6 border border-white/5 shadow-xl shadow-black/40 flex-1">
                  <div className="flex items-center gap-2 mb-4">
                    <FileText className="w-5 h-5 text-zinc-300" />
                    <h3 className="text-lg font-medium text-white">标题分析</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    {analysisResult.titleAnalysis}
                  </p>
                </div>

                <div className="bg-black rounded-xl p-4 sm:p-6 border border-white/5 shadow-xl shadow-black/40">
                  <div className="flex items-center gap-2 mb-4">
                    <Tag className="w-5 h-5 text-rose-400" />
                    <h3 className="text-lg font-medium text-white">关键词建议</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {analysisResult.keywords.map((keyword, idx) => (
                      <span key={idx} className="px-3 py-1.5 bg-black border border-white/5 rounded-full text-xs text-white">
                        #{keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Hot Topics */}
              <div className="bg-black rounded-xl p-4 sm:p-6 border border-white/5 shadow-xl shadow-black/40 md:col-span-2">
                <div className="flex items-center gap-2 mb-4">
                  <MessageCircle className="w-5 h-5 text-zinc-300" />
                  <h3 className="text-lg font-medium text-white">相关热门话题</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {analysisResult.hotTopics.map((topic, idx) => (
                    <div key={idx} className="px-4 py-3 bg-black border border-white/5 rounded-lg text-sm text-white flex items-center gap-2">
                      <span className="text-white font-bold text-lg leading-none">#</span>
                      {topic}
                    </div>
                  ))}
                </div>
              </div>

              {/* Hot Music Styles */}
              <div className="bg-black rounded-xl p-4 sm:p-6 border border-white/5 shadow-xl shadow-black/40 md:col-span-1">
                <div className="flex items-center gap-2 mb-4">
                  <Music className="w-5 h-5 text-amber-400" />
                  <h3 className="text-lg font-medium text-white">热门曲目/风格</h3>
                </div>
                <div className="space-y-3">
                  {analysisResult.hotMusicStyles.map((style, idx) => (
                    <div key={idx} className="px-4 py-3 bg-black border border-white/5 rounded-lg text-sm text-white flex items-center gap-3">
                      <Music className="w-4 h-4 text-amber-500/70" />
                      {style}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : activeTab === 'ecommerce' && ecommerceResult ? (
            /* Ecommerce Analysis Results */
            <div className="flex flex-col gap-6">
              {/* Product Info & Image */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-black rounded-xl p-4 sm:p-6 border border-white/5 shadow-xl shadow-black/40 md:col-span-2 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="p-2 bg-purple-500/20 rounded-lg">
                      <ShoppingBag className="w-6 h-6 text-zinc-300" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-zinc-400">核心商品</h3>
                      <p className="text-xl font-bold text-white">{ecommerceResult.productName}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-medium text-zinc-400 mb-3 flex items-center gap-2">
                        <Target className="w-4 h-4 text-rose-400" /> 目标人群
                      </h4>
                      <p className="text-white text-sm leading-relaxed  p-4 rounded-lg border border-white/5 h-[calc(100%-28px)]">
                        {ecommerceResult.targetAudience}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-zinc-400 mb-3 flex items-center gap-2">
                        <Zap className="w-4 h-4 text-amber-400" /> 核心卖点
                      </h4>
                      <ul className="space-y-3  p-4 rounded-lg border border-white/5 h-[calc(100%-28px)]">
                        {ecommerceResult.sellingPoints.map((point, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-white">
                            <span className="text-amber-400 mt-0.5 font-bold">•</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-black rounded-xl p-4 sm:p-6 border border-white/5 shadow-xl shadow-black/40 flex flex-col">
                  <div className="flex items-center gap-2 mb-4">
                    <ImageIcon className="w-5 h-5 text-zinc-300" />
                    <h3 className="text-lg font-medium text-white">产品参考图</h3>
                  </div>
                  <div className="flex-1  rounded-lg border border-white/5 flex items-center justify-center overflow-hidden relative min-h-[200px]">
                    {productImageUrl ? (
                      <img src={productImageUrl} alt={ecommerceResult.productName} className="w-full h-full object-contain" />
                    ) : (
                      <div className="text-center p-4">
                        <ImageIcon className="w-8 h-8 text-zinc-600 mx-auto mb-2" />
                        <p className="text-xs text-zinc-500">正在从视频中提取...</p>
                      </div>
                    )}
                    {ecommerceResult.bestProductShotTimestamp !== undefined && (
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded backdrop-blur-sm border border-white/10">
                        {ecommerceResult.bestProductShotTimestamp}s
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Hook & Call to Action */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-black rounded-xl p-4 sm:p-6 border border-white/5 shadow-xl shadow-black/40">
                  <div className="flex items-center gap-2 mb-4">
                    <FileText className="w-5 h-5 text-zinc-300" />
                    <h3 className="text-lg font-medium text-white">痛点与钩子 (前3秒)</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed  p-4 rounded-lg border border-white/5">
                    {ecommerceResult.hookAnalysis}
                  </p>
                </div>
                <div className="bg-black rounded-xl p-4 sm:p-6 border border-white/5 shadow-xl shadow-black/40">
                  <div className="flex items-center gap-2 mb-4">
                    <MessageCircle className="w-5 h-5 text-zinc-300" />
                    <h3 className="text-lg font-medium text-white">促单话术 (结尾)</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed  p-4 rounded-lg border border-white/5">
                    {ecommerceResult.callToAction}
                  </p>
                </div>
              </div>

              {/* Visual and Emotion Analysis */}
              <div className="bg-black rounded-xl p-4 sm:p-6 border border-white/5 shadow-xl shadow-black/40">
                <div className="flex items-center gap-2 mb-4">
                  <Eye className="w-5 h-5 text-zinc-300" />
                  <h3 className="text-lg font-medium text-white">视觉丰富度与情感共鸣</h3>
                </div>
                <p className="text-white text-sm leading-relaxed  p-4 rounded-lg border border-white/5">
                  {ecommerceResult.visualAndEmotionAnalysis}
                </p>
              </div>

              {/* Script Copywriting Analysis */}
              {ecommerceResult.scriptAnalysis && (
                <div className="bg-black rounded-xl p-4 sm:p-6 border border-white/5 shadow-xl shadow-black/40">
                  <div className="flex items-center gap-2 mb-6">
                    <Megaphone className="w-5 h-5 text-zinc-300" />
                    <h3 className="text-lg font-medium text-white">脚本文案全领域拆解</h3>
                  </div>

                  {ecommerceResult.videoTranscript && (
                    <div className="mb-6 bg-white/5 p-4 rounded-lg border border-white/5">
                      <h4 className="flex items-center gap-2 text-sm font-semibold text-zinc-400 mb-3 uppercase tracking-wider">
                        <FileText className="w-4 h-4" /> 原始语音文案提取
                      </h4>
                      <p className="text-white text-sm leading-relaxed whitespace-pre-wrap">
                        {ecommerceResult.videoTranscript}
                      </p>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white/5 p-4 rounded-lg">
                      <h4 className="text-sm font-semibold text-zinc-400 mb-2 uppercase tracking-wider">文案策略总览</h4>
                      <p className="text-white text-sm leading-relaxed">{ecommerceResult.scriptAnalysis.overview}</p>
                    </div>
                    
                    <div className="bg-white/5 p-4 rounded-lg">
                      <h4 className="text-sm font-semibold text-zinc-400 mb-2 uppercase tracking-wider">钩子逻辑 (前3秒)</h4>
                      <p className="text-white text-sm leading-relaxed">{ecommerceResult.scriptAnalysis.hook}</p>
                    </div>
                    
                    <div className="bg-white/5 p-4 rounded-lg md:col-span-2">
                      <h4 className="text-sm font-semibold text-zinc-400 mb-2 uppercase tracking-wider">正文拆解</h4>
                      <p className="text-white text-sm leading-relaxed">{ecommerceResult.scriptAnalysis.body}</p>
                    </div>

                    <div className="bg-white/5 p-4 rounded-lg md:col-span-2">
                      <h4 className="text-sm font-semibold text-zinc-400 mb-2 uppercase tracking-wider">核心高频词 / 情感词</h4>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {ecommerceResult.scriptAnalysis.keywords.map((kw, kwIdx) => (
                          <span key={kwIdx} className="px-3 py-1 bg-white/10 text-white rounded-full text-xs border border-white/5">
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Reverse Prompt */}
              <div className="bg-black rounded-xl p-4 sm:p-6 border border-white/5 shadow-xl shadow-black/40 flex flex-col md:col-span-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <LayoutTemplate className="w-5 h-5 text-zinc-300" />
                    <h3 className="text-lg font-medium text-white">带货视频生成提示词</h3>
                  </div>
                  <button 
                    onClick={() => copyToClipboard(ecommerceResult.reversePrompt)}
                    className="flex items-center justify-center gap-2 px-4 py-2 w-full sm:w-auto bg-black border border-purple-500/30 text-purple-400 hover:border-purple-500 hover:bg-purple-500/10 rounded-lg transition-colors text-sm font-medium shadow-[0_0_10px_rgba(168,85,247,0.1)]"
                    title="一键复制纯英文提示词"
                  >
                    <Copy className="w-4 h-4" />
                    <span className="text-sm font-medium">复制英文</span>
                  </button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className=" rounded-lg p-4 border border-white/5 flex-1">
                    <h4 className="text-sm font-medium text-zinc-400 mb-3 uppercase tracking-wider">English Prompt</h4>
                    <p className="text-white text-sm leading-relaxed whitespace-pre-wrap break-all font-mono">
                      {ecommerceResult.reversePrompt}
                    </p>
                  </div>
                  <div className="bg-black rounded-lg p-4 border border-white/5 flex-1">
                    <h4 className="text-sm font-medium text-zinc-400 mb-3 uppercase tracking-wider">中文翻译对照</h4>
                    <p className="text-white text-sm leading-relaxed whitespace-pre-wrap break-all font-sans">
                      {ecommerceResult.reversePromptTranslation}
                    </p>
                  </div>
                </div>
              </div>

              {/* Image Reverse Prompt */}
              <div className="bg-black rounded-xl p-4 sm:p-6 border border-white/5 shadow-xl shadow-black/40 flex flex-col md:col-span-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-zinc-300" />
                    <h3 className="text-lg font-medium text-white">带货图片生成提示词</h3>
                  </div>
                  <button 
                    onClick={() => copyToClipboard(ecommerceResult.imageReversePrompt)}
                    className="flex items-center justify-center gap-2 px-4 py-2 w-full sm:w-auto bg-black border border-pink-500/30 text-pink-400 hover:border-pink-500/50 hover:bg-pink-500/10 rounded-lg transition-colors text-sm font-medium shadow-[0_0_10px_rgba(236,72,153,0.1)]"
                    title="一键复制纯英文图片提示词"
                  >
                    <Copy className="w-4 h-4" />
                    <span className="text-sm font-medium">复制英文</span>
                  </button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className=" rounded-lg p-4 border border-white/5 flex-1">
                    <h4 className="text-sm font-medium text-zinc-400 mb-3 uppercase tracking-wider">English Prompt</h4>
                    <p className="text-white text-sm leading-relaxed whitespace-pre-wrap break-all font-mono">
                      {ecommerceResult.imageReversePrompt}
                    </p>
                  </div>
                  <div className="bg-black rounded-lg p-4 border border-white/5 flex-1">
                    <h4 className="text-sm font-medium text-zinc-400 mb-3 uppercase tracking-wider">中文翻译对照</h4>
                    <p className="text-white text-sm leading-relaxed whitespace-pre-wrap break-all font-sans">
                      {ecommerceResult.imageReversePromptTranslation}
                    </p>
                  </div>
                </div>
              </div>

              {/* Replace Product Section */}
              <div className="bg-black rounded-xl p-4 sm:p-6 border border-white/5 shadow-xl shadow-black/40 shadow-pink-500/5 flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
                
                <div className="flex items-center gap-3 mb-2 relative z-10">
                  <div className="p-2 bg-pink-500/20 rounded-lg">
                    <Wand2 className="w-5 h-5 text-zinc-300" />
                  </div>
                  <h3 className="text-xl font-medium text-white">替换提示词中的产品</h3>
                </div>
                <p className="text-zinc-400 text-sm mb-6 relative z-10">
                  上传一张新产品的图片，AI将自动修改上方的提示词，将原产品替换为您上传的新产品，同时保持原有的视频风格和镜头语言。
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                  <div>
                    <div 
                      className={`relative border-none rounded-xl overflow-hidden transition-all duration-300 ${
                        replacementProductPreviewUrl 
                          ? 'border-pink-500/50 bg-black/50 shadow-2xl shadow-black/50' 
                          : 'border-white/5 hover:border-pink-500/50/50 /80'
                      } flex items-center justify-center aspect-video cursor-pointer group`}
                      onDragEnter={(e) => { e.preventDefault(); e.stopPropagation(); }}
                      onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                      onDrop={handleReplacementImageDrop}
                      onClick={() => !replacementProductPreviewUrl && replacementImageInputRef.current?.click()}
                    >
                      {replacementProductPreviewUrl ? (
                        <>
                          <img 
                            src={replacementProductPreviewUrl} 
                            alt="Replacement Product"
                            className="w-full h-full object-contain"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="text-white text-sm font-medium bg-black/60 px-3 py-1.5 rounded-lg backdrop-blur-sm">
                              点击更换图片
                            </span>
                          </div>
                        </>
                      ) : (
                        <div className="text-center p-6 transform transition-transform group-hover:scale-105">
                          <div className="w-12 h-12 bg-pink-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
                            <ImageIcon className="w-6 h-6 text-zinc-300" />
                          </div>
                          <p className="text-sm text-white font-medium mb-1">点击或拖拽新产品图片</p>
                          <p className="text-xs text-zinc-500">支持 JPG, PNG (最大 10MB)</p>
                        </div>
                      )}
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        ref={replacementImageInputRef}
                        onChange={handleReplacementImageChange}
                      />
                    </div>
                    {replacementProductPreviewUrl && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setReplacementProductImage(null);
                          setReplacementProductPreviewUrl(null);
                          if (replacementImageInputRef.current) replacementImageInputRef.current.value = '';
                        }}
                        className="text-xs text-zinc-300 hover:text-red-300 mt-3 flex items-center gap-1 transition-colors"
                      >
                        移除图片
                      </button>
                    )}
                  </div>

                  <div className="flex flex-col justify-center">
                    {modifyPromptError && (
                      <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-zinc-300 text-sm flex items-start gap-2">
                        <span className="text-white font-bold">!</span>
                        {modifyPromptError}
                      </div>
                    )}
                    
                    <div className="/50 p-5 rounded-xl border border-white/5 mb-6">
                      <h4 className="text-sm font-medium text-white mb-2">替换说明：</h4>
                      <ul className="text-xs text-zinc-400 space-y-1.5 list-disc list-inside">
                        <li>仅替换提示词中的产品主体描述</li>
                        <li>保留原视频的光影、运镜和场景设定</li>
                        <li>生成的新提示词可直接用于 AI 视频生成工具</li>
                      </ul>
                    </div>

                    <button
                      onClick={handleModifyPrompt}
                      disabled={isModifyingPrompt || !replacementProductImage}
                      className={`flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-medium transition-all duration-300 ${
                        isModifyingPrompt || !replacementProductImage
                          ? 'bg-black text-zinc-500 cursor-not-allowed border border-white/5'
                          : 'bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 text-white shadow-2xl shadow-black/50 hover:shadow-2xl shadow-black/50 border border-pink-400/50 hover:scale-[1.02]'
                      }`}
                    >
                      {isModifyingPrompt ? (
                        <>
                          <RefreshCw className="w-5 h-5 animate-spin" />
                          正在智能替换...
                        </>
                      ) : (
                        <>
                          <Wand2 className="w-5 h-5" />
                          一键替换产品
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : activeTab === 'image' && imageAnalysisResult ? (
            /* Image Analysis Results - Distinct UI */
            <div className="flex flex-col gap-6">
              {/* Top Row: Concept & Tags */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 bg-black rounded-2xl p-4 sm:p-6 border border-white/5 shadow-2xl shadow-black/50 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
                  <div className="flex items-center gap-2 mb-4 relative z-10">
                    <Target className="w-5 h-5 text-zinc-300" />
                    <h3 className="text-lg font-semibold text-white">画面精准解析</h3>
                  </div>
                  <p className="text-white leading-relaxed relative z-10 text-sm">
                    {imageAnalysisResult.overallConcept}
                  </p>
                </div>
                
                <div className="bg-black rounded-2xl p-4 sm:p-6 border border-white/5 flex flex-col justify-center gap-5">
                  <div>
                    <h3 className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2.5 flex items-center gap-2">
                      <Wand2 className="w-3.5 h-3.5 text-zinc-300" /> 风格参数
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {imageAnalysisResult.styleTags.map((tag, index) => (
                        <span key={index} className="px-2.5 py-1 bg-pink-500/10 border border-white/5 text-zinc-300 rounded-md text-xs font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="w-full h-px bg-black"></div>
                  <div>
                    <h3 className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2.5 flex items-center gap-2">
                      <Tag className="w-3.5 h-3.5 text-zinc-300" /> 核心元素
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {imageAnalysisResult.keywords.map((keyword, index) => (
                        <span key={index} className="px-2.5 py-1 bg-black border border-white/5 text-white rounded-md text-xs">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Row: The Prompts */}
              <div className="bg-black rounded-2xl border border-white/5 overflow-hidden shadow-2xl shadow-black/50">
                <div className="border-b border-white/5 bg-black p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0">
                  <div className="flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-zinc-300" />
                    <h3 className="text-lg font-semibold text-white">Midjourney / SD 提示词工作台</h3>
                  </div>
                  <button 
                    onClick={() => copyToClipboard(imageAnalysisResult.reversePrompt)}
                    className="flex items-center justify-center gap-2 px-4 py-2 w-full sm:w-auto bg-black border border-pink-500/30 text-pink-400 hover:border-pink-500/50 hover:bg-pink-500/10 rounded-lg transition-colors text-sm font-medium shadow-[0_0_15px_rgba(236,72,153,0.1)]"
                  >
                    <Copy className="w-4 h-4" />
                    一键复制英文提示词
                  </button>
                </div>
                
                <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* English Prompt */}
                  <div className="space-y-3 h-full flex flex-col">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">English Prompt</span>
                    </div>
                    <div className="bg-black p-5 rounded-xl border border-white/5 flex-1 overflow-y-auto relative group max-h-[600px] min-h-[300px]">
                      <pre className="text-sm text-pink-100 whitespace-pre-wrap break-all font-mono leading-relaxed">
                        {imageAnalysisResult.reversePrompt}
                      </pre>
                    </div>
                  </div>

                  {/* Chinese Translation */}
                  <div className="space-y-3 h-full flex flex-col">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">中文对照</span>
                      <button 
                        onClick={() => copyToClipboard(imageAnalysisResult.reversePromptTranslation)}
                        className="p-1 px-2 bg-black border border-pink-500/30 text-pink-400 hover:border-pink-500/50 hover:bg-pink-500/10 rounded-md transition-colors flex items-center gap-1 text-xs shadow-[0_0_10px_rgba(236,72,153,0.1)]"
                      >
                        <Copy className="w-3 h-3" /> 复制中文
                      </button>
                    </div>
                    <div className=" p-5 rounded-xl border border-white/5 flex-1 overflow-y-auto max-h-[600px] min-h-[300px]">
                      <p className="text-sm text-white whitespace-pre-wrap break-all font-sans leading-relaxed">
                        {imageAnalysisResult.reversePromptTranslation}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
