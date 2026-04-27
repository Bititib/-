import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

const oldSidebarStart = `      {/* Left Sidebar - Navigation */}
      <div className="w-full md:w-64 shrink-0 bg-slate-900 border-b md:border-b-0 md:border-r border-slate-800/60 flex flex-col md:h-screen md:sticky md:top-0 md:overflow-y-auto z-10 shadow-[4px_0_24px_rgba(0,0,0,0.5)]">
        <div className="p-6 flex flex-col gap-8 h-full">
          <header className="">
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-2">
              短视频创意风暴
            </h1>
            <p className="text-slate-400 text-xs leading-relaxed">
              上传视频，AI为你分析核心概念、逆向工程提示词，并提供增长建议。
            </p>
          </header>

          <nav className="flex flex-col gap-2 flex-1">
            <button
              onClick={() => { setActiveTab('general'); setAnalysisResult(null); setEcommerceResult(null); setImageAnalysisResult(null); setCopywritingResult(null); setAccountAnalysisResult(null); }}
              className={\`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all w-full text-left group \${
                activeTab === 'general' 
                  ? 'bg-blue-500/10 text-blue-400 shadow-sm border border-blue-500/30' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
              }\`}
            >
              <PlaySquare className={\`w-5 h-5 shrink-0 transition-colors \${activeTab === 'general' ? 'text-blue-400' : 'text-slate-500 group-hover:text-blue-400'}\`} />
              <span>通用短视频分析</span>
            </button>
            <button
              onClick={() => { setActiveTab('ecommerce'); setAnalysisResult(null); setEcommerceResult(null); setImageAnalysisResult(null); setCopywritingResult(null); setAccountAnalysisResult(null); }}
              className={\`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all w-full text-left group \${
                activeTab === 'ecommerce' 
                  ? 'bg-purple-500/10 text-purple-400 shadow-sm border border-purple-500/30' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
              }\`}
            >
              <ShoppingBag className={\`w-5 h-5 shrink-0 transition-colors \${activeTab === 'ecommerce' ? 'text-purple-400' : 'text-slate-500 group-hover:text-purple-400'}\`} />
              <span>带货视频分析</span>
            </button>
            <button
              onClick={() => { setActiveTab('image'); setAnalysisResult(null); setEcommerceResult(null); setImageAnalysisResult(null); setCopywritingResult(null); setAccountAnalysisResult(null); }}
              className={\`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all w-full text-left group \${
                activeTab === 'image' 
                  ? 'bg-pink-500/10 text-pink-400 shadow-sm border border-pink-500/30' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
              }\`}
            >
              <ImageIcon className={\`w-5 h-5 shrink-0 transition-colors \${activeTab === 'image' ? 'text-pink-400' : 'text-slate-500 group-hover:text-pink-400'}\`} />
              <span>图片逆向分析</span>
            </button>
            <button
              onClick={() => { setActiveTab('copywriting'); setAnalysisResult(null); setEcommerceResult(null); setImageAnalysisResult(null); setCopywritingResult(null); setAccountAnalysisResult(null); }}
              className={\`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all w-full text-left group \${
                activeTab === 'copywriting' 
                  ? 'bg-orange-500/10 text-orange-400 shadow-sm border border-orange-500/30' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
              }\`}
            >
              <Megaphone className={\`w-5 h-5 shrink-0 transition-colors \${activeTab === 'copywriting' ? 'text-orange-400' : 'text-slate-500 group-hover:text-orange-400'}\`} />
              <span>电商文案生成</span>
            </button>
            <button
              onClick={() => { setActiveTab('account'); setAnalysisResult(null); setEcommerceResult(null); setImageAnalysisResult(null); setCopywritingResult(null); setAccountAnalysisResult(null); }}
              className={\`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all w-full text-left group \${
                activeTab === 'account' 
                  ? 'bg-emerald-500/10 text-emerald-400 shadow-sm border border-emerald-500/30' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
              }\`}
            >
              <Users className={\`w-5 h-5 shrink-0 transition-colors \${activeTab === 'account' ? 'text-emerald-400' : 'text-slate-500 group-hover:text-emerald-400'}\`} />
              <span>账号全方位分析</span>
            </button>
          </nav>
        </div>
      </div>`;

const newSidebar = `      {/* Sidebar / Top Nav (Mobile) */}
      <div className="w-full md:w-64 shrink-0 bg-slate-900 border-b md:border-b-0 md:border-r border-slate-800/60 flex flex-col md:h-screen sticky top-0 md:overflow-y-auto z-50 shadow-[0_4px_24px_rgba(0,0,0,0.5)] md:shadow-[4px_0_24px_rgba(0,0,0,0.5)]">
        <div className="p-4 md:p-6 flex flex-col gap-3 md:gap-8 h-full">
          <header className="flex-shrink-0 flex items-center justify-between md:block">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-1 md:mb-2">
                短视频创意风暴
              </h1>
              <p className="text-slate-400 text-xs leading-relaxed hidden md:block">
                上传视频，AI为你分析核心概念、逆向工程提示词，并提供增长建议。
              </p>
            </div>
          </header>

          <nav className="flex flex-row md:flex-col gap-2 flex-shrink-0 md:flex-1 overflow-x-auto overflow-y-hidden pb-1 md:pb-0 [&::-webkit-scrollbar]:hidden" style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
            <button
              onClick={() => { setActiveTab('general'); setAnalysisResult(null); setEcommerceResult(null); setImageAnalysisResult(null); setCopywritingResult(null); setAccountAnalysisResult(null); }}
              className={\`flex items-center gap-2 md:gap-3 px-3 py-2 md:px-4 md:py-3.5 rounded-lg md:rounded-xl text-xs md:text-sm font-medium transition-all shrink-0 md:w-full text-left group \${
                activeTab === 'general' 
                  ? 'bg-blue-500/10 text-blue-400 shadow-sm border border-blue-500/30' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
              }\`}
            >
              <PlaySquare className={\`w-4 h-4 md:w-5 md:h-5 shrink-0 transition-colors \${activeTab === 'general' ? 'text-blue-400' : 'text-slate-500 group-hover:text-blue-400'}\`} />
              <span>通用分析</span>
            </button>
            <button
              onClick={() => { setActiveTab('ecommerce'); setAnalysisResult(null); setEcommerceResult(null); setImageAnalysisResult(null); setCopywritingResult(null); setAccountAnalysisResult(null); }}
              className={\`flex items-center gap-2 md:gap-3 px-3 py-2 md:px-4 md:py-3.5 rounded-lg md:rounded-xl text-xs md:text-sm font-medium transition-all shrink-0 md:w-full text-left group \${
                activeTab === 'ecommerce' 
                  ? 'bg-purple-500/10 text-purple-400 shadow-sm border border-purple-500/30' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
              }\`}
            >
              <ShoppingBag className={\`w-4 h-4 md:w-5 md:h-5 shrink-0 transition-colors \${activeTab === 'ecommerce' ? 'text-purple-400' : 'text-slate-500 group-hover:text-purple-400'}\`} />
              <span>带货分析</span>
            </button>
            <button
              onClick={() => { setActiveTab('image'); setAnalysisResult(null); setEcommerceResult(null); setImageAnalysisResult(null); setCopywritingResult(null); setAccountAnalysisResult(null); }}
              className={\`flex items-center gap-2 md:gap-3 px-3 py-2 md:px-4 md:py-3.5 rounded-lg md:rounded-xl text-xs md:text-sm font-medium transition-all shrink-0 md:w-full text-left group \${
                activeTab === 'image' 
                  ? 'bg-pink-500/10 text-pink-400 shadow-sm border border-pink-500/30' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
              }\`}
            >
              <ImageIcon className={\`w-4 h-4 md:w-5 md:h-5 shrink-0 transition-colors \${activeTab === 'image' ? 'text-pink-400' : 'text-slate-500 group-hover:text-pink-400'}\`} />
              <span>图片逆向</span>
            </button>
            <button
              onClick={() => { setActiveTab('copywriting'); setAnalysisResult(null); setEcommerceResult(null); setImageAnalysisResult(null); setCopywritingResult(null); setAccountAnalysisResult(null); }}
              className={\`flex items-center gap-2 md:gap-3 px-3 py-2 md:px-4 md:py-3.5 rounded-lg md:rounded-xl text-xs md:text-sm font-medium transition-all shrink-0 md:w-full text-left group \${
                activeTab === 'copywriting' 
                  ? 'bg-orange-500/10 text-orange-400 shadow-sm border border-orange-500/30' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
              }\`}
            >
              <Megaphone className={\`w-4 h-4 md:w-5 md:h-5 shrink-0 transition-colors \${activeTab === 'copywriting' ? 'text-orange-400' : 'text-slate-500 group-hover:text-orange-400'}\`} />
              <span>电商文案</span>
            </button>
            <button
              onClick={() => { setActiveTab('account'); setAnalysisResult(null); setEcommerceResult(null); setImageAnalysisResult(null); setCopywritingResult(null); setAccountAnalysisResult(null); }}
              className={\`flex items-center gap-2 md:gap-3 px-3 py-2 md:px-4 md:py-3.5 rounded-lg md:rounded-xl text-xs md:text-sm font-medium transition-all shrink-0 md:w-full text-left group \${
                activeTab === 'account' 
                  ? 'bg-emerald-500/10 text-emerald-400 shadow-sm border border-emerald-500/30' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
              }\`}
            >
              <Users className={\`w-4 h-4 md:w-5 md:h-5 shrink-0 transition-colors \${activeTab === 'account' ? 'text-emerald-400' : 'text-slate-500 group-hover:text-emerald-400'}\`} />
              <span>账号分析</span>
            </button>
          </nav>
        </div>
      </div>`;

content = content.replace(oldSidebarStart, newSidebar);
fs.writeFileSync('src/App.tsx', content);
console.log('Done!');
