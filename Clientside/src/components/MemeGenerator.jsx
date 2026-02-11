import React, { useState, useEffect } from 'react';
import { ImageIcon, Type, Send, RefreshCw } from 'lucide-react';

export default function MemeGenerator() {
  const [meme, setMeme] = useState({
    topText: '',
    bottomText: '',
    randomImg: '',
    allMemeImgs: []
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('https://api.imgflip.com/get_memes')
      .then(response => response.json())
      .then(content => {
        const { memes } = content.data;
        setMeme(prevMeme => ({
          ...prevMeme,
          allMemeImgs: memes,
          randomImg: memes[Math.floor(Math.random() * memes.length)].url
        }));
      });
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMeme(prevMeme => ({
      ...prevMeme,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const rand = meme.allMemeImgs[Math.floor(Math.random() * meme.allMemeImgs.length)].url;
    setMeme(prevMeme => ({
      ...prevMeme,
      randomImg: rand
    }));
    setTimeout(() => setLoading(false), 400);
  };

  return (
    <div className="min-h-screen bg-[#020618] text-white flex flex-col items-center py-12 px-4 font-sans">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-[#ffffffff] tracking-tight">
            Meme<span className="text-[#4f39f6]">Maker</span>
          </h1>
          <p className="text-slate-400 text-lg">
            Create hilarious memes to share with your friends.
          </p>
        </div>

        <div className="bg-[#0a0f26] border border-slate-800 rounded-3xl p-6 md:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="relative">
                  <Type className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input
                    placeholder="Top Text"
                    type="text"
                    value={meme.topText}
                    name="topText"
                    onChange={handleChange}
                    className="w-full bg-[#020618] border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white focus:border-[#4f39f6] focus:ring-2 focus:ring-[#4f39f6]/20 transition-all outline-none"
                  />
                </div>
                
                <div className="relative">
                  <Type className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input
                    placeholder="Bottom Text"
                    type="text"
                    value={meme.bottomText}
                    name="bottomText"
                    onChange={handleChange}
                    className="w-full bg-[#020618] border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white focus:border-[#4f39f6] focus:ring-2 focus:ring-[#4f39f6]/20 transition-all outline-none"
                  />
                </div>
              </div>

              <button 
                className="w-full flex items-center justify-center gap-3 bg-[#4f39f6] hover:bg-[#3b2bc4] text-white py-4 rounded-2xl font-bold text-lg transition-all active:scale-[0.98] shadow-lg shadow-[#4f39f6]/20"
              >
                {loading ? <RefreshCw className="w-6 h-6 animate-spin" /> : <ImageIcon className="w-6 h-6" />}
                Generate New Template
              </button>

              <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700/50">
                <p className="text-xs text-slate-400 leading-relaxed">
                  <span className="text-[#4f39f6] font-bold">Pro Tip:</span> Keep your text short and punchy for the best looking memes!
                </p>
              </div>
            </form>

            <div className="flex justify-center items-center">
              <div className="relative w-full max-w-[400px] aspect-square bg-slate-900 rounded-xl overflow-hidden shadow-2xl border-4 border-slate-800 group">
                {meme.randomImg ? (
                  <>
                    <img 
                      src={meme.randomImg} 
                      alt="Meme template" 
                      className="w-full h-full object-cover select-none"
                    />
                    
                    <h2 className="absolute top-4 left-0 w-full px-4 text-center font-black text-white uppercase tracking-wider text-2xl md:text-3xl break-words leading-tight [text-shadow:2px_2px_0_#000,-2px_-2px_0_#000,2px_-2px_0_#000,-2px_2px_0_#000,0px_2px_0_#000,0px_-2px_0_#000,2px_0px_0_#000,-2px_0px_0_#000]">
                      {meme.topText}
                    </h2>

                    <h2 className="absolute bottom-4 left-0 w-full px-4 text-center font-black text-white uppercase tracking-wider text-2xl md:text-3xl break-words leading-tight [text-shadow:2px_2px_0_#000,-2px_-2px_0_#000,2px_-2px_0_#000,-2px_2px_0_#000,0px_2px_0_#000,0px_-2px_0_#000,2px_0px_0_#000,-2px_0px_0_#000]">
                      {meme.bottomText}
                    </h2>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-slate-600 gap-3">
                    <RefreshCw className="w-10 h-10 animate-spin" />
                    <p>Loading template...</p>
                  </div>
                )}
              </div>
            </div>

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