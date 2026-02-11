import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, Search, Clock, Trash2, Copy, Download, 
  BookOpen, Edit3, Save, RefreshCw, FileText, History,
  ChevronDown, X, Check, Wand2
} from 'lucide-react';


const ArticleGenerator = ({ theme }) => {
  const [topic, setTopic] = useState('');
  const [article, setArticle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  const [articleHistory, setArticleHistory] = useState([]);
  const [showHistory, setshowHistory] = useState(false);
  const [articleTitle, setArticleTitle] = useState('');
  const [tone, setTone] = useState('professional');
  const [length, setLength] = useState('medium');
  const [copied, setCopied] = useState(false);
  const articleRef = useRef(null);

  const bgColor = theme === 'light' ? 'bg-white' : 'bg-[#020618]';
  const textColor = theme === 'light' ? 'text-slate-900' : 'text-white';
  const borderColor = theme === 'light' ? 'border-gray-200' : 'border-white/5';
  const cardBg = theme === 'light' ? 'bg-gray-50' : 'bg-slate-900/40';
  const inputBg = theme === 'light' ? 'bg-white' : 'bg-slate-800';

  useEffect(() => {
    const savedSearches = localStorage.getItem('recentSearches');
    const savedHistory = localStorage.getItem('articleHistory');
    if (savedSearches) setRecentSearches(JSON.parse(savedSearches));
    if (savedHistory) setArticleHistory(JSON.parse(savedHistory));
  }, []);

  const saveToHistory = (newArticle) => {
    const newEntry = {
      id: Date.now(),
      topic: topic || articleTitle,
      article: newArticle,
      title: articleTitle,
      tone,
      length,
      date: new Date().toISOString()
    };
    const updatedHistory = [newEntry, ...articleHistory].slice(0, 20);
    setArticleHistory(updatedHistory);
    localStorage.setItem('articleHistory', JSON.stringify(updatedHistory));
  };

  const saveSearch = (searchTerm) => {
    if (!searchTerm.trim()) return;
    const updated = [searchTerm, ...recentSearches.filter(s => s !== searchTerm)].slice(0, 10);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  const clearHistory = () => {
    setArticleHistory([]);
    localStorage.removeItem('articleHistory');
  };

  const clearSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  const loadFromHistory = (entry) => {
    setTopic(entry.topic);
    setArticle(entry.article);
    setArticleTitle(entry.title || '');
    setTone(entry.tone || 'professional');
    setLength(entry.length || 'medium');
  };

  const deleteHistoryItem = (id) => {
    const updated = articleHistory.filter(item => item.id !== id);
    setArticleHistory(updated);
    localStorage.setItem('articleHistory', JSON.stringify(updated));
  };

  const copyToClipboard = async () => {
    if (article) {
      await navigator.clipboard.writeText(article);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const downloadArticle = () => {
    if (!article) return;
    const blob = new Blob([article], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${articleTitle || 'article'}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

 const generateArticle = async () => {
  if (!topic.trim()) {
    setError('Please enter a topic or keywords for your article.');
    return;
  }

  setIsLoading(true);
  setError('');
  saveSearch(topic);

  try {
    const res = await fetch("http://localhost:3001/api/generate-article", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic, tone, length, title: articleTitle }),
    });

    const data = await res.json();

    if (data.error) {
      setError(data.error);
      setArticle('');
    } else {
      setArticle(data.text);
      saveToHistory(data.text);
    }
  } catch (err) {
    console.error(err);
    setError("Failed to generate article. Try again.");
  } finally {
    setIsLoading(false);
  }
};

  const regenerateArticle = () => {
    generateArticle();
  };

  const tones = ['professional', 'casual', 'academic', 'persuasive', 'informative', 'creative'];
  const lengths = ['short', 'medium', 'long'];

  return (
    <div className={`flex h-full gap-6 ${bgColor} ${textColor}`}>
      <div className={`w-80 flex-shrink-0 border-r ${borderColor} overflow-y-auto`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <History size={20} />
              History
            </h2>
            {articleHistory.length > 0 && (
              <button 
                onClick={clearHistory}
                className="text-xs text-red-400 hover:text-red-300"
              >
                Clear All
              </button>
            )}
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-gray-500 uppercase">Recent Searches</h3>
              {recentSearches.length > 0 && (
                <button 
                  onClick={clearSearches}
                  className="text-xs text-red-400 hover:text-red-300"
                >
                  Clear All
                </button>
              )}
            </div>
            {recentSearches.length > 0 ? (
              <div className="space-y-2">
                {recentSearches.map((search, idx) => (
                  <button
                    key={`recent-${search}-${idx}`}
                    onClick={() => setTopic(search)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm hover:${cardBg} transition-colors flex items-center gap-2`}
                  >
                    <Search size={14} />
                    {search}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No recent searches</p>
            )}
          </div>

          <div>
            <h3 className="text-xs font-bold text-gray-500 uppercase mb-3">Generated Articles</h3>
            {articleHistory.length > 0 ? (
              <div className="space-y-3">
                {articleHistory.map((item) => (
                  <div
                    key={item.id}
                    className={`p-4 rounded-xl ${cardBg} cursor-pointer hover:scale-[1.02] transition-all group`}
                    onClick={() => loadFromHistory(item)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium truncate">{item.topic}</h4>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(item.date).toLocaleDateString()}
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteHistoryItem(item.id);
                        }}
                        className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 transition-opacity"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No articles generated yet</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold mb-2 flex items-center gap-3">
              <BookOpen size={32} />
              AI Article Generator
            </h1>
            <p className="text-gray-500">Create professional articles with AI-powered content generation</p>
          </div>

          <div className={`p-6 rounded-2xl border ${borderColor} ${cardBg} mb-6`}>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Tone</label>
                <div className="relative">
                  <select
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border ${borderColor} ${inputBg} font-medium focus:ring-2 focus:ring-indigo-500 outline-none appearance-none`}
                  >
                    {tones.map(t => (
                      <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Length</label>
                <div className="relative">
                  <select
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border ${borderColor} ${inputBg} font-medium focus:ring-2 focus:ring-indigo-500 outline-none appearance-none`}
                  >
                    {lengths.map(l => (
                      <option key={l} value={l}>{l.charAt(0).toUpperCase() + l.slice(1)}</option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Quick Templates</label>
                <div className="flex gap-2">
                  {['Blog Post', 'News', 'Guide'].map(template => (
                    <button
                      key={template}
                      onClick={() => setArticleTitle(`How to Write a Perfect ${template}`)}
                      className={`px-3 py-3 rounded-xl text-sm font-medium border ${borderColor} hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-colors flex-1`}
                    >
                      {template}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-2xl border ${borderColor} ${cardBg} mb-6`}>
            <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Article Topic</label>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Enter your article topic, keywords, or a brief description..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className={`w-full px-5 py-4 rounded-xl border ${borderColor} ${inputBg} text-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all`}
              />
              
              <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Article Title (Optional)</label>
              <input
                type="text"
                placeholder="Custom title for your article..."
                value={articleTitle}
                onChange={(e) => setArticleTitle(e.target.value)}
                className={`w-full px-5 py-4 rounded-xl border ${borderColor} ${inputBg} focus:ring-2 focus:ring-indigo-500 outline-none transition-all`}
              />

              <div className="flex gap-4">
                <button
                  onClick={generateArticle}
                  disabled={isLoading}
                  className={`flex-1 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                    isLoading 
                      ? 'bg-gray-500 cursor-not-allowed' 
                      : 'bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-500/20'
                  } text-white`}
                >
                  {isLoading ? (
                    <>
                      <RefreshCw size={20} className="animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Wand2 size={20} />
                      Generate Article
                    </>
                  )}
                </button>
              </div>

              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                  {error}
                </div>
              )}
            </div>
          </div>

          {article && (
            <div className={`rounded-2xl border ${borderColor} overflow-hidden`}>
              <div className={`flex items-center justify-between p-4 border-b ${borderColor} ${cardBg}`}>
                <span className="font-bold flex items-center gap-2">
                  <FileText size={18} />
                  Generated Article
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={copyToClipboard}
                    className={`p-2 rounded-lg border ${borderColor} hover:bg-white/5 transition-colors`}
                    title="Copy to clipboard"
                  >
                    {copied ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
                  </button>
                  <button
                    onClick={downloadArticle}
                    className={`p-2 rounded-lg border ${borderColor} hover:bg-white/5 transition-colors`}
                    title="Download article"
                  >
                    <Download size={18} />
                  </button>
                  <button
                    onClick={regenerateArticle}
                    className={`p-2 rounded-lg border ${borderColor} hover:bg-white/5 transition-colors`}
                    title="Regenerate"
                  >
                    <RefreshCw size={18} />
                  </button>
                </div>
              </div>
              <div 
                ref={articleRef}
                className={`p-8 ${inputBg} prose prose-invert max-w-none`}
              >
                {article.split('\n').map((line, idx) => {
                  if (line.startsWith('# ')) {
                    return <h1 key={idx} className="text-3xl font-extrabold mb-4 mt-6">{line.slice(2)}</h1>;
                  } else if (line.startsWith('## ')) {
                    return <h2 key={idx} className="text-xl font-bold mb-3 mt-5 text-indigo-400">{line.slice(3)}</h2>;
                  } else if (line.startsWith('---')) {
                    return <hr key={idx} className="my-6 border-white/10" />;
                  } else if (line.startsWith('*')) {
                    return <p key={idx} className="text-gray-400 italic text-sm my-2">{line}</p>;
                  } else if (line.trim()) {
                    return <p key={idx} className="mb-4 leading-relaxed">{line}</p>;
                  }
                  return <br key={idx} />;
                })}
              </div>
            </div>
          )}

          {!article && !isLoading && (
            <div className={`text-center py-20 border-2 border-dashed ${borderColor} rounded-2xl`}>
              <Sparkles size={64} className="mx-auto text-indigo-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">Ready to Create</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Enter a topic above and let AI generate a professional article for you. 
                Your history will be saved automatically.
              </p>
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
};

export default ArticleGenerator;
