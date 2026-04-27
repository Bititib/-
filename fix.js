import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(
  `              {/* Reverse Prompt */}
              <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 shadow-lg flex flex-col md:col-span-2">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <LayoutTemplate className="w-5 h-5 text-purple-400" />
                    <h3 className="text-lg font-medium text-white">逆向视频生成提示词</h3>
                  </div>
                  <button 
                    onClick={() => copyToClipboard(analysisResult.reversePrompt)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 hover:text-purple-300 rounded-lg transition-colors border border-purple-500/20"
                    title="一键复制纯英文提示词"
                  >
                    <Copy className="w-4 h-4" />
                    <span className="text-sm font-medium">复制英文</span>
                  </button>
                </div>
                <div className="bg-slate-950/50 backdrop-blur-sm rounded-lg p-4 border border-slate-700/50 mb-6 flex-1">
                  <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap font-mono">
                    {analysisResult.reversePrompt}
                  </p>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <h4 className="text-sm font-medium text-slate-400">中文翻译对照</h4>
                </div>
                <div className="bg-[#1a1b26] rounded-lg p-4 border border-slate-700/30">
                  <p className="text-slate-400 text-sm leading-relaxed whitespace-pre-wrap">
                    {analysisResult.reversePromptTranslation}
                  </p>
                </div>
              </div>`,
  `              {/* Reverse Prompt */}
              <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 shadow-lg flex flex-col md:col-span-3">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <LayoutTemplate className="w-5 h-5 text-purple-400" />
                    <h3 className="text-lg font-medium text-white">逆向视频生成提示词</h3>
                  </div>
                  <button 
                    onClick={() => copyToClipboard(analysisResult.reversePrompt)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 hover:text-purple-300 rounded-lg transition-colors border border-purple-500/20"
                    title="一键复制纯英文提示词"
                  >
                    <Copy className="w-4 h-4" />
                    <span className="text-sm font-medium">复制英文</span>
                  </button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-slate-950/50 backdrop-blur-sm rounded-lg p-4 border border-slate-700/50 flex-1">
                    <h4 className="text-sm font-medium text-slate-400 mb-3 uppercase tracking-wider">English Prompt</h4>
                    <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap break-all font-mono">
                      {analysisResult.reversePrompt}
                    </p>
                  </div>
                  <div className="bg-[#1a1b26] rounded-lg p-4 border border-slate-700/30 flex-1">
                    <h4 className="text-sm font-medium text-slate-400 mb-3 uppercase tracking-wider">中文翻译对照</h4>
                    <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap break-all font-sans">
                      {analysisResult.reversePromptTranslation}
                    </p>
                  </div>
                </div>
              </div>`
);

content = content.replace(
  `              {/* Image Reverse Prompt */}
              <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 shadow-lg flex flex-col md:col-span-3">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-pink-400" />
                    <h3 className="text-lg font-medium text-white">逆向图片生成提示词</h3>
                  </div>
                  <button 
                    onClick={() => copyToClipboard(analysisResult.imageReversePrompt)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-pink-500/10 hover:bg-pink-500/20 text-pink-400 hover:text-pink-300 rounded-lg transition-colors border border-pink-500/20"
                    title="一键复制纯英文图片提示词"
                  >
                    <Copy className="w-4 h-4" />
                    <span className="text-sm font-medium">复制英文</span>
                  </button>
                </div>
                <div className="bg-slate-950/50 backdrop-blur-sm rounded-lg p-4 border border-slate-700/50 mb-6 flex-1">
                  <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap font-mono">
                    {analysisResult.imageReversePrompt}
                  </p>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <h4 className="text-sm font-medium text-slate-400">中文翻译对照</h4>
                </div>
                <div className="bg-[#1a1b26] rounded-lg p-4 border border-slate-700/30">
                  <p className="text-slate-400 text-sm leading-relaxed whitespace-pre-wrap">
                    {analysisResult.imageReversePromptTranslation}
                  </p>
                </div>
              </div>`,
  `              {/* Image Reverse Prompt */}
              <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 shadow-lg flex flex-col md:col-span-3">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-pink-400" />
                    <h3 className="text-lg font-medium text-white">逆向图片生成提示词</h3>
                  </div>
                  <button 
                    onClick={() => copyToClipboard(analysisResult.imageReversePrompt)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-pink-500/10 hover:bg-pink-500/20 text-pink-400 hover:text-pink-300 rounded-lg transition-colors border border-pink-500/20"
                    title="一键复制纯英文图片提示词"
                  >
                    <Copy className="w-4 h-4" />
                    <span className="text-sm font-medium">复制英文</span>
                  </button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-slate-950/50 backdrop-blur-sm rounded-lg p-4 border border-slate-700/50 flex-1">
                    <h4 className="text-sm font-medium text-slate-400 mb-3 uppercase tracking-wider">English Prompt</h4>
                    <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap break-all font-mono">
                      {analysisResult.imageReversePrompt}
                    </p>
                  </div>
                  <div className="bg-[#1a1b26] rounded-lg p-4 border border-slate-700/30 flex-1">
                    <h4 className="text-sm font-medium text-slate-400 mb-3 uppercase tracking-wider">中文翻译对照</h4>
                    <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap break-all font-sans">
                      {analysisResult.imageReversePromptTranslation}
                    </p>
                  </div>
                </div>
              </div>`
);

content = content.replace(
  `              {/* Reverse Prompt */}
              <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 shadow-lg flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <LayoutTemplate className="w-5 h-5 text-purple-400" />
                    <h3 className="text-lg font-medium text-white">带货视频生成提示词</h3>
                  </div>
                  <button 
                    onClick={() => copyToClipboard(ecommerceResult.reversePrompt)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 hover:text-purple-300 rounded-lg transition-colors border border-purple-500/20"
                    title="一键复制纯英文提示词"
                  >
                    <Copy className="w-4 h-4" />
                    <span className="text-sm font-medium">复制英文</span>
                  </button>
                </div>
                <div className="bg-slate-950/50 backdrop-blur-sm rounded-lg p-4 border border-slate-700/50 mb-6">
                  <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap font-mono">
                    {ecommerceResult.reversePrompt}
                  </p>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <h4 className="text-sm font-medium text-slate-400">中文翻译对照</h4>
                </div>
                <div className="bg-[#1a1b26] rounded-lg p-4 border border-slate-700/30">
                  <p className="text-slate-400 text-sm leading-relaxed whitespace-pre-wrap">
                    {ecommerceResult.reversePromptTranslation}
                  </p>
                </div>
              </div>`,
  `              {/* Reverse Prompt */}
              <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 shadow-lg flex flex-col md:col-span-2">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <LayoutTemplate className="w-5 h-5 text-purple-400" />
                    <h3 className="text-lg font-medium text-white">带货视频生成提示词</h3>
                  </div>
                  <button 
                    onClick={() => copyToClipboard(ecommerceResult.reversePrompt)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 hover:text-purple-300 rounded-lg transition-colors border border-purple-500/20"
                    title="一键复制纯英文提示词"
                  >
                    <Copy className="w-4 h-4" />
                    <span className="text-sm font-medium">复制英文</span>
                  </button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-slate-950/50 backdrop-blur-sm rounded-lg p-4 border border-slate-700/50 flex-1">
                    <h4 className="text-sm font-medium text-slate-400 mb-3 uppercase tracking-wider">English Prompt</h4>
                    <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap break-all font-mono">
                      {ecommerceResult.reversePrompt}
                    </p>
                  </div>
                  <div className="bg-[#1a1b26] rounded-lg p-4 border border-slate-700/30 flex-1">
                    <h4 className="text-sm font-medium text-slate-400 mb-3 uppercase tracking-wider">中文翻译对照</h4>
                    <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap break-all font-sans">
                      {ecommerceResult.reversePromptTranslation}
                    </p>
                  </div>
                </div>
              </div>`
);


content = content.replace(
  `              {/* Image Reverse Prompt */}
              <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 shadow-lg flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-pink-400" />
                    <h3 className="text-lg font-medium text-white">带货图片生成提示词</h3>
                  </div>
                  <button 
                    onClick={() => copyToClipboard(ecommerceResult.imageReversePrompt)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-pink-500/10 hover:bg-pink-500/20 text-pink-400 hover:text-pink-300 rounded-lg transition-colors border border-pink-500/20"
                    title="一键复制纯英文图片提示词"
                  >
                    <Copy className="w-4 h-4" />
                    <span className="text-sm font-medium">复制英文</span>
                  </button>
                </div>
                <div className="bg-slate-950/50 backdrop-blur-sm rounded-lg p-4 border border-slate-700/50 mb-6">
                  <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap font-mono">
                    {ecommerceResult.imageReversePrompt}
                  </p>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <h4 className="text-sm font-medium text-slate-400">中文翻译对照</h4>
                </div>
                <div className="bg-[#1a1b26] rounded-lg p-4 border border-slate-700/30">
                  <p className="text-slate-400 text-sm leading-relaxed whitespace-pre-wrap">
                    {ecommerceResult.imageReversePromptTranslation}
                  </p>
                </div>
              </div>`,
  `              {/* Image Reverse Prompt */}
              <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 shadow-lg flex flex-col md:col-span-2">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-pink-400" />
                    <h3 className="text-lg font-medium text-white">带货图片生成提示词</h3>
                  </div>
                  <button 
                    onClick={() => copyToClipboard(ecommerceResult.imageReversePrompt)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-pink-500/10 hover:bg-pink-500/20 text-pink-400 hover:text-pink-300 rounded-lg transition-colors border border-pink-500/20"
                    title="一键复制纯英文图片提示词"
                  >
                    <Copy className="w-4 h-4" />
                    <span className="text-sm font-medium">复制英文</span>
                  </button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-slate-950/50 backdrop-blur-sm rounded-lg p-4 border border-slate-700/50 flex-1">
                    <h4 className="text-sm font-medium text-slate-400 mb-3 uppercase tracking-wider">English Prompt</h4>
                    <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap break-all font-mono">
                      {ecommerceResult.imageReversePrompt}
                    </p>
                  </div>
                  <div className="bg-[#1a1b26] rounded-lg p-4 border border-slate-700/30 flex-1">
                    <h4 className="text-sm font-medium text-slate-400 mb-3 uppercase tracking-wider">中文翻译对照</h4>
                    <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap break-all font-sans">
                      {ecommerceResult.imageReversePromptTranslation}
                    </p>
                  </div>
                </div>
              </div>`
);

content = content.replace(
  `                <div className="p-6 grid grid-cols-1 xl:grid-cols-2 gap-6">
                  {/* English Prompt */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">English Prompt</span>
                    </div>
                    <div className="bg-[#0f1016] p-5 rounded-xl border border-slate-800 h-[280px] overflow-y-auto relative group">
                      <pre className="text-sm text-pink-100 whitespace-pre-wrap font-mono leading-relaxed">
                        {imageAnalysisResult.reversePrompt}
                      </pre>
                    </div>
                  </div>

                  {/* Chinese Translation */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">中文对照</span>
                      <button 
                        onClick={() => copyToClipboard(imageAnalysisResult.reversePromptTranslation)}
                        className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
                      >
                        <Copy className="w-3 h-3" /> 复制中文
                      </button>
                    </div>
                    <div className="bg-slate-950/50 backdrop-blur-sm p-5 rounded-xl border border-slate-800 h-[280px] overflow-y-auto">
                      <p className="text-sm text-slate-300 whitespace-pre-wrap font-sans leading-relaxed">
                        {imageAnalysisResult.reversePromptTranslation}
                      </p>
                    </div>
                  </div>
                </div>`,
  `                <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* English Prompt */}
                  <div className="space-y-3 h-full flex flex-col">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">English Prompt</span>
                    </div>
                    <div className="bg-[#0f1016] p-5 rounded-xl border border-slate-800 flex-1 overflow-y-auto relative group max-h-[600px] min-h-[300px]">
                      <pre className="text-sm text-pink-100 whitespace-pre-wrap break-all font-mono leading-relaxed">
                        {imageAnalysisResult.reversePrompt}
                      </pre>
                    </div>
                  </div>

                  {/* Chinese Translation */}
                  <div className="space-y-3 h-full flex flex-col">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">中文对照</span>
                      <button 
                        onClick={() => copyToClipboard(imageAnalysisResult.reversePromptTranslation)}
                        className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
                      >
                        <Copy className="w-3 h-3" /> 复制中文
                      </button>
                    </div>
                    <div className="bg-slate-950/50 backdrop-blur-sm p-5 rounded-xl border border-slate-800 flex-1 overflow-y-auto max-h-[600px] min-h-[300px]">
                      <p className="text-sm text-slate-300 whitespace-pre-wrap break-all font-sans leading-relaxed">
                        {imageAnalysisResult.reversePromptTranslation}
                      </p>
                    </div>
                  </div>
                </div>`
);

fs.writeFileSync('src/App.tsx', content);

