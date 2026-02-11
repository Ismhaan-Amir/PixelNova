import React, { useState,useEffect} from "react";
import { 
  Cpu, Zap, ArrowRight, LogOut, BarChart3, MessageSquare, 
  Image as ImageIcon, Lock, Settings, Bell, Sparkles, 
  ChevronRight, ShieldCheck, Palette, BookOpen, User,
  Mail, Key, CheckCircle2, MessageSquareQuote, HelpCircle, Star, Calendar,
} from "lucide-react";
import Work from "./Work";
import Feature from "./Feature";
import Pricing from "./Pricing";
import Testmonial from "./Testmonial";
import FAQ from "./FAQ";
import Blog from "./Blog";
import SettingsPage from "./SettingsPage"; 
import ArticleGenerator from "../src/components/ArticleGenerator";
import AvatarGenerator from "../src/components/AvatarGenerator";
import BackgroundRemover from '../src/components/BackgroundRemover'
import ImageCompress from './components/ImageCompress'
import MemeGenerator from '../src/components/MemeGenerator'
import ResumeReview from '../src/components/ResumeReview'
import axios from 'axios'
// --- Reusable UI Components ---
const Button = ({ children, variant = "primary", className = "", ...props }) => {
  const variants = {
    primary: "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20",
    secondary: "bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10",
    outline: "border border-indigo-500/50 text-indigo-400 hover:bg-indigo-500/10",
    ghost: "text-gray-400 hover:text-white hover:bg-white/5",
  };
  return (
    <button className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-200 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

// --- Main Layout Components ---
const Navbar = ({ user, onNavigate, onLogout, theme }) => {
  const [Page, setPage] = useState("blog");
const handleGetStarted = () => {
  onNavigate(user ? "dashboard" : "signup");
};
  return (
    <nav
      className={`fixed top-0 w-full z-50 border-b ${
        theme === "light"
          ? "bg-white/80 border-gray-200 text-slate-900"
          : "bg-[#020618]/80 border-white/5 text-white"
      } backdrop-blur-md transition-colors duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">

          {/* LOGO */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => onNavigate("landing")}
          >
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-600/20">
              <Cpu size={22} />
            </div>
            <span className="font-bold text-2xl tracking-tight">
              Aether AI
            </span>
          </div>

          {/* LINKS */}
          <div className="hidden md:flex items-center gap-10 font-sans">
            <button
              onClick={() => onNavigate("landing")}
              className="text-sm font-semibold opacity-70 hover:opacity-100 transition-opacity"
            >
              Home
            </button>

            <button
              onClick={() => {
                onNavigate("blog");
                setPage("blog");
              }}
              className="text-sm font-semibold opacity-70 hover:opacity-100 transition-opacity"
            >
              Blog
            </button>

            {user ? (
              <div className="flex items-center gap-6">
                <Button onClick={() => onNavigate("dashboard")}>
                  Dashboard
                </Button>
                <button
                  onClick={onLogout}
                  className="text-gray-400 hover:text-red-400 transition-colors"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-6">
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

//landing Page
const LandingPage = ({ onNavigate, theme }) => (
  <div className={`${theme === 'light' ? 'bg-white text-slate-900' : 'bg-[#020618] text-white'} min-h-screen transition-colors duration-300 pt-20`}>
    {/* Hero Section */}
    <div className="min-h-[85vh] flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-600/10 blur-[120px] rounded-full"></div>
      <div className="text-center px-4 max-w-4xl flex flex-col items-center relative z-10">
        <h1 className="text-6xl md:text-8xl font-extrabold mb-8 tracking-tight leading-[1.05]">
          Unleash Your <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Imagination</span>
        </h1>
        <p className="text-gray-400 text-lg md:text-2xl mb-12 max-w-2xl mx-auto leading-relaxed">
          Craft extraordinary digital experiences with the world's most advanced creative AI platform.
        </p>
        <div className="flex justify-center w-full">
          <Button className="px-12 py-5 text-xl" onClick={() => onNavigate("signup")}>
            Get Started <ArrowRight size={22} />
          </Button>
        </div>
      </div>
    </div>
    <Work/>
    <Feature/>
    <Testmonial  />
    <Pricing   onSelectPlan={() => setPage("dashboard")} onNavigate={onNavigate} />
    <FAQ />
    
    <footer className="py-20 text-center border-t border-white/5 opacity-50">
    <span className="text-white font-black tracking-tight text-xl">Aether AI</span>
       <p className="text-sm">© 2026 Aether AI Corporation. All rights reserved.</p>
    </footer>
  </div>
);

// --- Auth Page ---
const AuthPage = ({ type, onAuth, onNavigate }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const url =
      type === "signup"
        ? "http://localhost:3001/register"
        : "http://localhost:3001/login";

    const payload =
      type === "signup"
        ? { name, email, password }
        : { email, password };

    const res = await axios.post(url, payload);

    onAuth(res.data); // sets user + redirects to dashboard
  } catch (err) {
    console.error(err.response?.data || err.message);
    alert(err.response?.data?.message || "Authentication failed");
  }
};


  return (

<div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#020618' }}>
      <div className="w-full max-w-md p-10 rounded-3xl" style={{ backgroundColor: '#020618' }}>
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-indigo-600/20 text-indigo-400 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/5">
            <Cpu size={32} />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">{type === "login" ? "Welcome Back" : "Join Aether"}</h2>
          <p className="text-gray-500">The next level of intelligence awaits.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {type === "signup" && (
             <div className="space-y-2">
                <input className="w-full bg-slate-900 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
             </div>
          )}
          <div className="space-y-2">
            <input className="w-full bg-slate-900 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <input className="w-full bg-slate-900 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <Button className="w-full py-4 text-lg font-bold" type="submit">
            {type === "login" ? "Sign In" : "Create Account"}
          </Button>
        </form>
        <button className="w-full mt-8 text-sm text-gray-400 hover:text-white transition-colors" onClick={() => onNavigate(type === "login" ? "signup" : "login")}>
          {type === "login" ? "Need an account? Join the future" : "Already have an account? Log in"}
        </button>
      </div>
    </div>
  );
};

// ----- BLOGS -----
const blogs = [
  {
    id: 1,
    title: "How Generative AI Is Reshaping SaaS Products",
    excerpt:
      "From content creation to automation, generative AI is redefining how modern SaaS platforms scale faster and smarter.",
    date: "Jan 18, 2026",
    tag: "AI Trends",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
  },
  {
    id: 2,
    title: "Why AETHER AI Was Built for Creators, Not Just Developers",
    excerpt:
      "Most AI tools are engineer-first. AETHER AI flips the model by empowering creators, founders, and teams.",
    date: "Jan 22, 2026",
    tag: "Product",
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a",
  },
  {
    id: 3,
    title: "The Real Cost of Not Using AI in Your Business",
    excerpt:
      "AI is no longer optional. We break down how companies lose time, money, and edge by ignoring automation.",
    date: "Jan 26, 2026",
    tag: "Business",
    image:
      "https://plus.unsplash.com/premium_photo-1661772661721-b16346fe5b0f",
  },
  {
    id: 4,
    title: "AI Writing Tools vs Human Creativity: The Truth",
    excerpt:
      "Does AI replace creativity or amplify it? The answer is uncomfortable—but powerful.",
    date: "Jan 30, 2026",
    tag: "AI Ethics",
    image: "https://images.unsplash.com/photo-1606857521015-7f9fcf423740",
  },
  {
    id: 5,
    title: "How AETHER AI Generates High-Quality Content in Seconds",
    excerpt:
      "A look under the hood at how Aether’s AI models generate accurate, human-like output at scale.",
    date: "Feb 2, 2026",
    tag: "Technology",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
  },
  {
    id: 6,
    title: "The Future of AI-Powered Dashboards",
    excerpt:
      "Static dashboards are dead. Intelligent, adaptive interfaces are the future of SaaS.",
    date: "Feb 6, 2026",
    tag: "UX",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
  },
  {
    id: 7,
    title: "From Idea to Execution: Building Faster With AI",
    excerpt:
      "AI shortens the gap between concept and launch. Here’s how startups are moving 10x faster.",
    date: "Feb 9, 2026",
    tag: "Startups",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd",
  },
  {
    id: 8,
    title: "Is Your Data Safe With AI Platforms?",
    excerpt:
      "Security, privacy, and trust matter. We explain how AETHER AI protects user data.",
    date: "Feb 12, 2026",
    tag: "Security",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
  },
  {
    id: 9,
    title: "Why AI SaaS Is the Fastest-Growing Tech Category",
    excerpt:
      "Investors, founders, and enterprises are betting big on AI SaaS. Here’s why.",
    date: "Feb 15, 2026",
    tag: "Market",
    image: "https://images.unsplash.com/photo-1556761175-4b46a572b786",
  },
];
// --- Blog Page ---
 function BlogPage({ theme = "dark" }) {
  const bg =
    theme === "light"
      ? "bg-white text-slate-900"
      : "bg-[#020618] text-white";

  const cardBg =
    theme === "light"
      ? "bg-gray-50 border-gray-200"
      : "bg-slate-900/40 border-white/5";

  return (
    <div className={`${bg} min-h-screen pt-32 transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 text-center">
          <h1 className="text-5xl font-extrabold mb-4 tracking-tight">
            AETHER AI Blog
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Insights on AI, SaaS, automation, and the future of intelligent
            software.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map(blog => (
            <article
              key={blog.id}
              className={`p-6 rounded-3xl border ${cardBg} hover:scale-[1.02] transition-transform`}
            >
              <img
                src={blog.image}
                alt={blog.title}
                loading="lazy"
                className="h-48 w-full rounded-2xl object-cover mb-6"
              />

              <span className="text-xs font-bold uppercase tracking-wide text-indigo-400">
                {blog.tag}
              </span>

              <h2 className="text-xl font-bold mt-4 mb-3 leading-snug">
                {blog.title}
              </h2>

              <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                {blog.excerpt}
              </p>

              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-gray-400">
                  <Calendar size={14} />
                  {blog.date}
                </span>

                <button className="flex items-center gap-2 text-indigo-400 font-bold hover:gap-3 transition-all">
                  Read More <ArrowRight size={16} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Footer */}
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

//--Dashboard--

const Dashboard = ({ user, onLogout, theme, setTheme, setUser }) => {
  const [activeTab, setActiveTab] = useState("article");

  const tabs = [
    { id: "article", label: "Article Writer" },
    { id: "avatars", label: "Avatar Generator" },
    { id: "bgremove", label: "Remove Background" },
    { id: "resume", label: "Resume Review" },
    { id: "compress", label: "Image Compress" },
    { id: "meme", label: "Meme Generator" },
    { id: "settings", label: "Settings" },
  ];

  return (
    
    <div className={`h-screen flex ${theme === "light" ? "bg-white" : "bg-[#020618] text-white"}`}>
      {/* SIDEBAR */}
      <aside className="w-72 border-r p-6">
        <h1 className="text-xl font-bold mb-8">Aether AI</h1>

        <nav className="space-y-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full text-left px-5 py-3 rounded-xl font-bold transition
                ${activeTab === tab.id ? "bg-indigo-600 text-white" : "hover:bg-indigo-600/10"}`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <button
          onClick={onLogout}
         className="mt-45 ml-5 text-red-500 font-bold "
        >
          Logout
        </button>
      </aside>

      {/* MAIN */}
      <main className="flex-1 p-12 overflow-y-auto">
        <h1 className="text-4xl font-extrabold mb-10">
          Welcome, {user?.name}
        </h1>

        {activeTab === "article" && <ArticleGenerator theme={theme} />}
        {activeTab === "avatars" && <AvatarGenerator theme={theme} />}
        {activeTab === "bgremove" && <BackgroundRemover theme={theme} />}
        {activeTab === "meme" && <MemeGenerator theme={theme} />}
        {activeTab === "compress" && <ImageCompress theme={theme} />}
        {activeTab === "resume" && <ResumeReview theme={theme} />}
        {activeTab === "settings" && (
          <SettingsPage
            user={user}
            setUser={setUser}
            theme={theme}
            setTheme={setTheme}
          />
        )}
      </main>
    </div>
  );
};


// --- App Entry ---
export default function App() {
  const [view, setView] = useState("landing");
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState("dark");

  const handleAuth = (userData) => { setUser(userData); setView("dashboard"); };
  const handleLogout = () => { setUser(null); setView("landing"); };
  const updateProfile = (data) => setUser(prev => ({ ...prev, ...data }));

  return (
    <div className={theme === "light" ? "bg-white text-slate-900" : "bg-[#020618] text-white"}>
      {view !== "dashboard" && <Navbar user={user} onNavigate={setView} onLogout={handleLogout} theme={theme} />}
      {view === "landing" && <LandingPage onNavigate={setView} theme={theme} />}
    {view === "blog" && <BlogPage theme={theme} />}      
    {(view === "login" || view === "signup") && <AuthPage type={view} onAuth={handleAuth} onNavigate={setView} />}
      {view === "dashboard" && user && (
        <Dashboard 
          user={user} 
          onLogout={handleLogout} 
          theme={theme} 
          setTheme={setTheme}
          onUpdateProfile={updateProfile}
        />
      )}
    </div>
  );
}