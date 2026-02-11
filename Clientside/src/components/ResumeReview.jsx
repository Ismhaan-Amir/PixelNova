import React, { useState, useRef } from 'react';
import { 
  FileText, 
  Upload, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  ArrowLeft, 
  Loader2, 
  Star, 
  Download, 
  ShieldCheck, 
  Zap, 
  Layout, 
  Target 
} from 'lucide-react';

 function ResumeReview() {
  const [file, setFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const colors = {
    bg: '#020618',
    accent: '#4f39f6',
    card: '#0a0f20',
    border: '#1e293b'
  };

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      startAnalysis();
    }
  };

  const startAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 2500);
  };

  const reset = () => {
    setFile(null);
    setShowResults(false);
  };

  const ScoreCard = ({ title, score, icon: Icon, color }) => (
    <div className="bg-[#0a0f20] border border-slate-800 p-6 rounded-3xl flex flex-col items-center text-center shadow-lg transition-transform hover:scale-[1.02]">
      <div className={`p-3 rounded-2xl mb-4 ${color} bg-opacity-10 text-opacity-100`}>
        <Icon size={24} className={color.replace('bg-', 'text-')} />
      </div>
      <h3 className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-2">{title}</h3>
      <div className="text-3xl font-black">{score}%</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020618] text-white font-sans selection:bg-indigo-500/30 pb-20 flex flex-col">
      <main className="max-w-6xl mx-auto px-6 mt-20 w-full flex-grow">
        {showResults && (
          <div className="mb-8 animate-in fade-in slide-in-from-left-4 duration-500">
            <button 
              onClick={reset}
              className="text-slate-400 hover:text-white flex items-center gap-2 text-sm font-bold transition-colors"
            >
              <ArrowLeft size={18} /> Back to Upload
            </button>
          </div>
        )}

        {!showResults && !isAnalyzing && (
          <div className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
                Score Your <span className="text-[#4f39f6]">Future.</span>
              </h1>
              <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                Upload your resume for a professional AI-powered review. Get instant feedback on layout, impact, and ATS compatibility.
              </p>
            </div>

            <label className="group relative w-full max-w-3xl aspect-[16/9] rounded-[3rem] border-2 border-dashed border-slate-800 hover:border-[#4f39f6] transition-all duration-300 cursor-pointer flex flex-col items-center justify-center bg-[#0a0f20] hover:bg-[#4f39f6]/5 shadow-2xl">
              <input type="file" className="hidden" onChange={handleFileUpload} accept=".pdf,.doc,.docx,.txt" />
              <div className="p-8 rounded-full bg-slate-800/50 group-hover:scale-110 group-hover:bg-[#4f39f6]/20 transition-all duration-500 mb-6">
                <Upload size={48} className="text-[#4f39f6]" />
              </div>
              <p className="text-2xl font-bold mb-2">Drop your resume here</p>
              <p className="text-slate-500 font-medium tracking-wide">PDF, DOCX, or TXT (Max 5MB)</p>
            </label>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 w-full">
              {[
                { icon: ShieldCheck, title: "Privacy First", desc: "Your data is encrypted and never shared with third parties." },
                { icon: Zap, title: "Instant Results", desc: "Get a comprehensive score and feedback in under 5 seconds." },
                { icon: Target, title: "ATS Optimized", desc: "See exactly how Applicant Tracking Systems read your resume." }
              ].map((item, idx) => (
                <div key={idx} className="bg-[#0a0f20] p-8 rounded-[2rem] border border-slate-800/50 hover:border-slate-700 transition-colors">
                  <item.icon size={32} className="text-[#4f39f6] mb-4" />
                  <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {isAnalyzing && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] animate-in fade-in duration-500">
            <div className="relative">
              <Loader2 size={80} className="animate-spin text-[#4f39f6]" />
              <div className="absolute inset-0 blur-3xl bg-[#4f39f6]/30 animate-pulse"></div>
            </div>
            <h2 className="text-3xl font-bold mt-10 mb-2">Analyzing your potential...</h2>
            <p className="text-slate-500 animate-pulse font-medium tracking-widest uppercase text-xs">Scanning 50+ Key data points</p>
          </div>
        )}

        {showResults && (
          <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
              <div>
                <h2 className="text-4xl font-black mb-2">Overall Score</h2>
                <p className="text-slate-400">Analysis complete for: <span className="text-white font-bold">{file?.name}</span></p>
              </div>
              <div className="flex items-center gap-6 bg-[#0a0f20] p-6 rounded-[2.5rem] border border-slate-800 shadow-xl">
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <svg className="absolute inset-0 w-full h-full -rotate-90">
                    <circle cx="48" cy="48" r="44" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-800" />
                    <circle cx="48" cy="48" r="44" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={276} strokeDashoffset={276 - (276 * 85) / 100} className="text-[#4f39f6]" />
                  </svg>
                  <span className="text-3xl font-black">85</span>
                </div>
                <div>
                  <div className="text-green-400 font-bold flex items-center gap-2 mb-1">
                    <Star size={16} fill="currentColor" /> Great Start
                  </div>
                  <p className="text-slate-500 text-sm max-w-[200px]">You're in the top 15% of candidates in this category.</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <ScoreCard title="Impact" score="92" icon={Zap} color="text-yellow-400" />
              <ScoreCard title="Formatting" score="78" icon={Layout} color="text-blue-400" />
              <ScoreCard title="Skills" score="88" icon={Target} color="text-purple-400" />
              <ScoreCard title="ATS Match" score="82" icon={ShieldCheck} color="text-[#4f39f6]" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-[#0a0f20] rounded-[2.5rem] border border-slate-800 overflow-hidden shadow-lg">
                <div className="px-8 py-6 border-b border-slate-800 bg-red-500/5 flex items-center gap-3">
                  <AlertCircle className="text-red-400" size={20} />
                  <h3 className="font-bold text-lg text-red-100">Critical Fixes</h3>
                </div>
                <div className="p-8 space-y-6">
                  {[
                    "Missing LinkedIn profile URL in header section.",
                    "Bullet points in 'Experience' should start with stronger action verbs.",
                    "Remove your full mailing address to save space and maintain privacy."
                  ].map((tip, i) => (
                    <div key={i} className="flex gap-4 group">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                      <p className="text-slate-300 text-sm leading-relaxed group-hover:text-white transition-colors">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#0a0f20] rounded-[2.5rem] border border-slate-800 overflow-hidden shadow-lg">
                <div className="px-8 py-6 border-b border-slate-800 bg-green-500/5 flex items-center gap-3">
                  <CheckCircle2 className="text-green-400" size={20} />
                  <h3 className="font-bold text-lg text-green-100">Key Strengths</h3>
                </div>
                <div className="p-8 space-y-6">
                  {[
                    "Excellent use of quantifiable metrics (e.g., 'Increased efficiency by 20%').",
                    "Skills section is well-organized and highly relevant to modern roles.",
                    "Professional summary is concise and impactful."
                  ].map((tip, i) => (
                    <div key={i} className="flex gap-4 group">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 shrink-0" />
                      <p className="text-slate-300 text-sm leading-relaxed group-hover:text-white transition-colors">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-12 flex justify-center">
               <button className="bg-white text-black px-10 py-4 rounded-2xl font-black flex items-center gap-3 hover:bg-slate-200 hover:scale-105 active:scale-95 transition-all shadow-xl">
                 <Download size={20} /> Download Full PDF Report
               </button>
            </div>
          </div>
        )}
      </main>

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
  );
}
export default ResumeReview