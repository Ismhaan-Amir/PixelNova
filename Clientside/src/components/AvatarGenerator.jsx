import React, { useState } from 'react';
import { RefreshCw, Download, User, Bot, Grid3X3, Zap, Binary, Ghost, Smile } from 'lucide-react';

export default function AvatarGenerator() {

  const spriteOptions = [
    { id: 'avataaars', name: 'Human', icon: <User className="w-4 h-4" /> },
    { id: 'pixel-art', name: 'Pixel', icon: <Binary className="w-4 h-4" /> },
    { id: 'bottts', name: 'Bots', icon: <Bot className="w-4 h-4" /> },
    { id: 'jdenticon', name: 'Vector', icon: <Zap className="w-4 h-4" /> },
    { id: 'identicon', name: 'Identi', icon: <Grid3X3 className="w-4 h-4" /> },
    { id: 'adventurer', name: 'Adventurer', icon: <Smile className="w-4 h-4" /> },
    { id: 'micah', name: 'Stylized', icon: <Ghost className="w-4 h-4" /> },
  ];

  const [sprite, setSprite] = useState("bottts");
  const [seed, setSeed] = useState(Math.floor(Math.random() * 10000));
  const [loading, setLoading] = useState(false);

  const handleGenerate = () => {
    setLoading(true);
    setSeed(Math.floor(Math.random() * 10000));
    setTimeout(() => setLoading(false), 300);
  };

  const avatarUrl = `https://api.dicebear.com/7.x/${sprite}/svg?seed=${seed}`;

  const downloadImage = async () => {
    try {
      const response = await fetch(avatarUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `avatar-${seed}.svg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#020618] text-white flex flex-col items-center py-12 px-4 font-sans">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-[#ffffffff] tracking-tight">
            Avatar<span className="text-[#4f39f6]">Gen</span>
          </h1>
          <p className="text-slate-400 text-lg">
            Create unique, fun avatars for your profiles instantly.
          </p>
        </div>

        <div className="bg-[#0a0f26] border border-slate-800 rounded-3xl p-6 md:p-10 shadow-2xl flex flex-col items-center">
          
          <div className="flex flex-wrap justify-center gap-2 mb-10 bg-[#020618]/50 p-2 rounded-2xl border border-slate-800/50 w-full">
            {spriteOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setSprite(option.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  sprite === option.id
                    ? 'bg-[#4f39f6] text-white shadow-lg'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {option.icon}
                {option.name}
              </button>
            ))}
          </div>

          <div className="relative group">
            <div className={`w-64 h-64 md:w-80 md:h-80 bg-slate-900 rounded-full p-4 border-4 border-[#4f39f6]/20 shadow-[0_0_50px_rgba(79,57,246,0.15)] flex items-center justify-center overflow-hidden transition-all duration-300 ${loading ? 'scale-95 opacity-50' : 'scale-100 opacity-100'}`}>
              <img 
                src={avatarUrl} 
                alt="Avatar" 
                className="w-full h-full object-contain"
              />
            </div>
            
            <div className="absolute -bottom-2 -right-2 bg-[#4f39f6] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border-4 border-[#0a0f26]">
              Seed: {seed}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12 w-full max-w-md">
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="flex items-center justify-center gap-3 bg-[#4f39f6] hover:bg-[#3b2bc4] text-white py-4 rounded-2xl font-bold text-lg transition-all active:scale-95 disabled:opacity-50 shadow-lg"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
              Generate Next
            </button>

            <button
              onClick={downloadImage}
              className="flex items-center justify-center gap-3 bg-white text-[#020618] hover:bg-slate-200 py-4 rounded-2xl font-bold text-lg transition-all active:scale-95 shadow-lg"
            >
              <Download className="w-5 h-5" />
              Download SVG
            </button>
          </div>
        </div>

      <footer className="mt-32 bg-[#020618] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-lg font-bold text-white">AETHER AI</h3>
              <p className="text-sm text-gray-400 mt-1">
                Building the future of intelligent software.
              </p>
            </div>

            <div className="flex gap-6 text-sm font-medium">
              <a href="#" className="text-gray-400 hover:text-white transition">
                Blog
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                Privacy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                Contact
              </a>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/5 text-center text-xs text-gray-500">
            © {new Date().getFullYear()} AETHER AI. All rights reserved.
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
}