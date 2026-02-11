import React, { useState } from 'react';
import { Upload, Download, Trash2, Wand2, Loader2 } from 'lucide-react';

export default function BackgroundRemover() {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [bgRemove, setBgRemove] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setBgRemove(null);
      setError(null);
    }
  };

  const handleRemoveBackground = async () => {
    if (!image) return;
    
    setLoading(true);
    setError(null);
    
    const apiKey = "njv7RHG7MqkW3iqVX9wgPLxm";
    const apiUrl = "https://api.remove.bg/v1.0/removebg";

    const formData = new FormData();
    formData.append("image_file", image, image.name);
    formData.append("size", 'auto');

    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'X-Api-Key': apiKey
        },
        body: formData
      });

      if (!res.ok) {
        throw new Error('Failed to remove background. Please check your API key or connection.');
      }

      const data = await res.blob();
      const imageUrl = URL.createObjectURL(data);
      setBgRemove(imageUrl);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const clearAll = () => {
    setImage(null);
    setPreviewUrl(null);
    setBgRemove(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#020618] text-white flex flex-col items-center py-12 px-4 font-sans">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-[#ffffffff] tracking-tight">
            Clear<span className="text-[#4f39f6]">Back</span>
          </h1>
          <p className="text-slate-400 text-lg">
            Professional background removal in seconds.
          </p>
        </div>

        <div className="bg-[#0a0f26] border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl">
          {!previewUrl ? (
            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-slate-700 rounded-xl cursor-pointer hover:border-[#4f39f6] hover:bg-[#4f39f6]/5 transition-all group">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-12 h-12 text-[#4f39f6] mb-4 group-hover:scale-110 transition-transform" />
                <p className="mb-2 text-sm text-slate-300">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-slate-500 text-[#ffffffff]/60">PNG, JPG or JPEG (MAX. 10MB)</p>
              </div>
              <input 
                type="file" 
                className="hidden" 
                onChange={handleImageChange} 
                accept="image/*"
              />
            </label>
          ) : (
            <div className="space-y-8">
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={handleRemoveBackground}
                  disabled={loading || bgRemove}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-all shadow-lg ${
                    loading || bgRemove 
                    ? 'bg-slate-700 cursor-not-allowed text-slate-400' 
                    : 'bg-[#4f39f6] hover:bg-[#3b2bc4] text-white active:scale-95'
                  }`}
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Wand2 className="w-5 h-5" />
                  )}
                  {loading ? 'Processing...' : 'Remove Background'}
                </button>

                <button
                  onClick={clearAll}
                  className="flex items-center gap-2 px-6 py-3 rounded-lg font-bold border border-slate-700 hover:bg-slate-800 transition-all text-white"
                >
                  <Trash2 className="w-5 h-5" />
                  Reset
                </button>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-lg text-center text-sm">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <p className="text-[#4f39f6] font-bold text-sm uppercase tracking-wider">Original</p>
                  <div className="aspect-square rounded-xl overflow-hidden bg-slate-900 border border-slate-800 flex items-center justify-center">
                    <img 
                      src={previewUrl} 
                      alt="Original" 
                      className="max-h-full max-w-full object-contain" 
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-[#4f39f6] font-bold text-sm uppercase tracking-wider">Result</p>
                  <div className="aspect-square rounded-xl overflow-hidden bg-[url('https://www.transparenttextures.com/patterns/checkerboard.png')] bg-slate-800 border border-slate-800 flex items-center justify-center relative">
                    {bgRemove ? (
                      <img 
                        src={bgRemove} 
                        alt="Background Removed" 
                        className="max-h-full max-w-full object-contain animate-in fade-in zoom-in duration-300" 
                      />
                    ) : (
                      <div className="text-slate-500 text-sm italic">
                        {loading ? 'Magic happening...' : 'Waiting for action'}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {bgRemove && (
                <div className="flex justify-center pt-4">
                  <a 
                    href={bgRemove} 
                    download="background_removed.png"
                    className="flex items-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-black text-lg transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] active:scale-95"
                  >
                    <Download className="w-6 h-6" />
                    Download HD Result
                  </a>
                </div>
              )}
            </div>
          )}
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