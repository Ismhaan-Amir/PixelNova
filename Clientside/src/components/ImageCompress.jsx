import React, { useState, useEffect } from 'react';
import { 
  Download, 
  Upload, 
  Image as ImageIcon, 
  HelpCircle, 
  History, 
  X, 
  RefreshCcw,
  Maximize2
} from 'lucide-react';

const ImageCompress = () => {
  // State Management
  const [originalImage, setOriginalImage] = useState(null);
  const [originalLink, setOriginalLink] = useState('');
  const [compressedLink, setCompressedLink] = useState('');
  const [outputFileName, setOutputFileName] = useState('');
  const [compressionQuality, setCompressionQuality] = useState(0.8);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const [isCompressed, setIsCompressed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [compressedHistory, setCompressedHistory] = useState([]);
  const [modalShow, setModalShow] = useState(false);

  // Handle File Upload
  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const link = URL.createObjectURL(file);
    setOriginalLink(link);
    setOriginalImage(file);
    setOriginalSize(file.size);
    setOutputFileName(`compressed_${file.name}`);
    
    setCompressedLink('');
    setCompressedSize(0);
    setIsCompressed(false);
  };

  // Compression Logic
  const compressImage = () => {
    if (!originalImage) return;

    setLoading(true);
    const reader = new FileReader();
    reader.readAsDataURL(originalImage);
    
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        const MAX_WIDTH = 1200;
        const MAX_HEIGHT = 1200;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            const link = URL.createObjectURL(blob);
            setCompressedLink(link);
            setCompressedSize(blob.size);
            setIsCompressed(true);
            
            const newHistoryItem = {
              id: Date.now(),
              name: outputFileName,
              link: link,
              size: blob.size,
              timestamp: new Date().toLocaleTimeString()
            };
            setCompressedHistory(prev => [newHistoryItem, ...prev]);
            setLoading(false);
          },
          'image/jpeg',
          compressionQuality
        );
      };
    };
  };

  const resetApp = () => {
    setOriginalLink('');
    setOriginalImage(null);
    setOriginalSize(0);
    setCompressedSize(0);
    setIsCompressed(false);
    setCompressedLink('');
    setOutputFileName('');
  };

  return (
    <div className="min-h-screen bg-[#020618] text-white font-sans p-4 md:p-8 selection:bg-[#4f39f6]/30">
      <main className="max-w-6xl mx-auto">
        
        {/* Header Action Row - Logo Removed */}
        <div className="flex justify-end items-center mb-8">
          <div className="flex gap-2">
            <button 
              onClick={() => setShowHelp(!showHelp)}
              className={`p-2 rounded-xl border transition-all ${showHelp ? 'bg-[#4f39f6] border-[#4f39f6]' : 'border-slate-800 text-slate-400 hover:text-white'}`}
            >
              <HelpCircle size={20} />
            </button>
            <button 
              onClick={() => setShowHistory(!showHistory)}
              className={`p-2 rounded-xl border transition-all ${showHistory ? 'bg-[#4f39f6] border-[#4f39f6]' : 'border-slate-800 text-slate-400 hover:text-white'}`}
            >
              <History size={20} />
            </button>
          </div>
        </div>

        {/* Instructions Overlay */}
        {showHelp && (
          <div className="mb-8 p-6 bg-slate-900/50 border border-slate-800 rounded-2xl animate-in fade-in zoom-in duration-200">
            <h3 className="text-[#4f39f6] font-bold mb-3 text-sm uppercase tracking-wider">Instructions</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-400">
              <li>• Upload a JPG/PNG using the left panel.</li>
              <li>• Set compression quality (80% is recommended).</li>
              <li>• Review file size reduction and download the result.</li>
            </ul>
          </div>
        )}

        {/* History Overlay */}
        {showHistory && (
          <div className="mb-8 p-6 bg-slate-900/50 border border-slate-800 rounded-2xl animate-in fade-in zoom-in duration-200">
            <h3 className="text-[#4f39f6] font-bold mb-4 text-sm uppercase tracking-wider">Recent Files</h3>
            {compressedHistory.length === 0 ? (
              <p className="text-slate-500 text-sm italic">Your compression history is empty.</p>
            ) : (
              <div className="flex gap-4 overflow-x-auto pb-2">
                {compressedHistory.map(item => (
                  <div key={item.id} className="min-w-[140px] bg-slate-800/40 p-2 rounded-xl border border-slate-700">
                    <img src={item.link} className="h-20 w-full object-cover rounded-lg mb-2" alt="" />
                    <p className="text-[10px] text-slate-300 truncate font-mono">{(item.size / 1024).toFixed(1)} KB</p>
                    <a href={item.link} download={item.name} className="text-[10px] text-[#4f39f6] font-bold hover:underline mt-1 block uppercase">Download</a>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Upload */}
          <div className="lg:col-span-4 h-full">
            <div className={`relative border-2 border-dashed rounded-[2rem] p-6 h-[450px] flex flex-col items-center justify-center transition-all ${originalLink ? 'border-[#4f39f6]/40 bg-slate-900/20' : 'border-slate-800 bg-slate-900/10'}`}>
              {originalLink ? (
                <div className="w-full h-full relative group">
                  <img src={originalLink} alt="Original" className="w-full h-full object-contain rounded-2xl" />
                  <button onClick={resetApp} className="absolute top-2 right-2 p-2 bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"><X size={16} /></button>
                </div>
              ) : (
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center mx-auto mb-4"><Upload className="text-[#4f39f6]" size={28} /></div>
                  <h2 className="font-bold text-lg mb-1">Source Image</h2>
                  <p className="text-slate-500 text-xs mb-8 uppercase tracking-widest">Select to begin</p>
                </div>
              )}
              <label className="cursor-pointer">
                <input type="file" className="hidden" accept="image/*" onChange={handleUpload} />
                <span className="bg-[#4f39f6] hover:bg-[#4f39f6]/90 text-white font-bold py-3 px-8 rounded-2xl transition-all shadow-xl shadow-[#4f39f6]/20 flex items-center gap-2 text-sm uppercase">
                  {originalLink ? 'Replace Image' : 'Choose File'}
                </span>
              </label>
            </div>
          </div>

          {/* Controls */}
          <div className="lg:col-span-4 flex flex-col justify-center items-center py-6">
            <div className="w-full max-w-[280px] space-y-10">
              <div className="space-y-6">
                <div className="flex justify-between items-end">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Quality Profile</label>
                  <span className="text-[#4f39f6] font-mono font-bold text-2xl">{Math.round(compressionQuality * 100)}%</span>
                </div>
                <input 
                  type="range" min="0.1" max="1.0" step="0.1" value={compressionQuality}
                  onChange={(e) => setCompressionQuality(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-full appearance-none accent-[#4f39f6]"
                />
              </div>

              <div className="space-y-3">
                <button
                  disabled={!originalImage || loading}
                  onClick={compressImage}
                  className="w-full bg-[#4f39f6] hover:bg-[#4f39f6]/90 disabled:bg-slate-800 disabled:text-slate-600 text-white font-bold py-5 rounded-2xl transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-sm shadow-2xl shadow-[#4f39f6]/20"
                >
                  {loading ? <RefreshCcw className="animate-spin" size={18} /> : <ImageIcon size={18} />}
                  {loading ? 'Processing' : 'Compress'}
                </button>
                {originalLink && (
                  <div className="text-center font-mono text-[10px] text-slate-500">
                    Original: {(originalSize / 1024).toFixed(1)} KB
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Result */}
          <div className="lg:col-span-4">
            <div className={`border-2 rounded-[2rem] p-6 h-[450px] flex flex-col transition-all ${isCompressed ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-slate-800 bg-slate-900/10 opacity-30'}`}>
              {isCompressed ? (
                <div className="flex flex-col h-full space-y-4">
                  <div className="flex-1 relative group overflow-hidden rounded-2xl bg-black/20">
                    <img src={compressedLink} alt="Result" className="w-full h-full object-contain" />
                    <button onClick={() => setModalShow(true)} className="absolute inset-0 bg-[#4f39f6]/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                      <Maximize2 className="text-white" size={28} />
                    </button>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                    <div>
                      <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">New Size</p>
                      <p className="text-lg font-black leading-tight">{(compressedSize / 1024).toFixed(1)} KB</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">Saved</p>
                      <p className="text-lg font-black leading-tight text-emerald-400">-{Math.round((1 - compressedSize / originalSize) * 100)}%</p>
                    </div>
                  </div>
                  <a href={compressedLink} download={outputFileName} className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 uppercase tracking-widest text-sm shadow-xl shadow-emerald-500/20">
                    <Download size={18} /> Download
                  </a>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-slate-700">
                  <ImageIcon size={48} className="mb-4 opacity-20" />
                  <p className="text-xs font-bold uppercase tracking-[0.2em]">Ready for Output</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Lightbox Modal */}
      {modalShow && (
        <div className="fixed inset-0 z-50 bg-[#020618]/95 flex items-center justify-center p-6 animate-in fade-in duration-200" onClick={() => setModalShow(false)}>
          <button className="absolute top-8 right-8 text-slate-400 hover:text-white"><X size={32} /></button>
          <img src={compressedLink} className="max-w-full max-h-full object-contain shadow-2xl rounded-lg" alt="Fullscreen" />
        </div>
      )}
    </div>
  );
};

export default ImageCompress;