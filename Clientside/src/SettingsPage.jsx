import React, { useEffect, useState, useRef } from "react";
import { 
  Bell, 
  User, 
  Palette, 
  Save, 
  Camera, 
  Mail, 
  Settings as SettingsIcon,
  LogOut,
  ChevronRight
} from "lucide-react";


const Card = ({ children, theme, className = "" }) => {
  const bg = theme === "dark" ? "bg-slate-900 text-white" : "bg-white text-black border border-gray-100";
  return (
    <div className={`p-6 rounded-3xl shadow-sm ${bg} ${className}`}>
      {children}
    </div>
  );
};


const ProfilePage = ({ user, theme }) => {
  const cardBg = theme === "dark" ? "bg-slate-800" : "bg-gray-50";

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Card theme={theme} className="text-center py-10">
        <div className="relative inline-block mb-4">
          <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-indigo-500/20 mx-auto bg-gray-200">
            {user.avatar ? (
              <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-indigo-100 text-indigo-600">
                <User size={48} />
              </div>
            )}
          </div>
        </div>
        <h1 className="text-2xl font-bold">{user.name || "Anonymous User"}</h1>
        <p className="text-slate-500 dark:text-slate-400">Standard Account</p>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card theme={theme}>
          <div className="flex items-center gap-3 text-indigo-500 mb-2">
            <Mail size={18} />
            <span className="text-xs font-bold uppercase tracking-wider">Email Address</span>
          </div>
          <p className="font-medium">{user.email || "not-set@example.com"}</p>
        </Card>
        
        <Card theme={theme}>
          <div className="flex items-center gap-3 text-emerald-500 mb-2">
            <User size={18} />
            <span className="text-xs font-bold uppercase tracking-wider">Display Name</span>
          </div>
          <p className="font-medium">{user.name || "Guest"}</p>
        </Card>
      </div>

      <Card theme={theme}>
        <h3 className="font-bold mb-4">Activity Overview</h3>
        <div className={`space-y-3`}>
          {[
            { label: "Account Created", value: "January 2024" },
            { label: "Last Login", value: "Today" },
            { label: "Status", value: "Active", color: "text-emerald-500" }
          ].map((item, i) => (
            <div key={i} className={`flex justify-between items-center p-3 rounded-xl ${cardBg}`}>
              <span className="text-sm opacity-70">{item.label}</span>
              <span className={`text-sm font-bold ${item.color || ""}`}>{item.value}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};


const SettingsPage = ({ user, setUser, theme, setTheme, notifications, setNotifications }) => {
  const [name, setName] = useState(user?.name || "");
  const fileInputRef = useRef(null);

  const saveName = () => {
    if (!name.trim()) return;
    setUser(prev => ({ ...prev, name: name.trim() }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser(prev => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const cardBg = theme === "dark" ? "bg-slate-900 text-white" : "bg-white text-black border border-gray-100";
  const inputBg = theme === "dark" ? "bg-white/5" : "bg-black/5";

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Card theme={theme}>
        <div className="flex items-center gap-3 mb-6">
          <User className="text-indigo-500" />
          <h2 className="text-xl font-bold">Profile Settings</h2>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
          <div className="relative group">
            <div className="w-24 h-24 rounded-2xl overflow-hidden bg-indigo-100 flex items-center justify-center">
              {user.avatar ? (
                <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <User size={32} className="text-indigo-400" />
              )}
            </div>
            <button 
              onClick={() => fileInputRef.current.click()}
              className="absolute -bottom-2 -right-2 p-2 bg-indigo-600 text-white rounded-lg shadow-lg hover:scale-110 transition-transform"
            >
              <Camera size={16} />
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleImageUpload} 
            />
          </div>
          
          <div className="flex-1 w-full">
            <label className="block mb-2 text-sm font-medium opacity-70">Display Name</label>
            <div className="flex gap-2">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className={`flex-1 px-4 py-2.5 rounded-xl outline-none ring-indigo-500 focus:ring-2 transition-all ${inputBg}`}
              />
              <button
                onClick={saveName}
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-colors flex items-center gap-2"
              >
                <Save size={18} />
                <span className="hidden sm:inline">Save</span>
              </button>
            </div>
          </div>
        </div>
      </Card>

      <Card theme={theme}>
        <div className="flex items-center gap-3 mb-6">
          <Palette className="text-pink-500" />
          <h2 className="text-xl font-bold">Appearance</h2>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setTheme("dark")}
            className={`p-4 rounded-2xl border-2 transition-all text-left ${
              theme === "dark" 
                ? "border-indigo-500 bg-indigo-500/10" 
                : "border-transparent " + inputBg
            }`}
          >
            <div className="w-full h-12 bg-slate-900 rounded-lg mb-3 border border-white/10" />
            <span className="font-bold">Dark Mode</span>
          </button>

          <button
            onClick={() => setTheme("light")}
            className={`p-4 rounded-2xl border-2 transition-all text-left ${
              theme === "light" 
                ? "border-indigo-500 bg-indigo-500/10" 
                : "border-transparent " + inputBg
            }`}
          >
            <div className="w-full h-12 bg-white rounded-lg mb-3 border border-black/10" />
            <span className="font-bold">Light Mode</span>
          </button>
        </div>
      </Card>

      <Card theme={theme}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-xl">
               <Bell size={20} />
            </div>
            <div>
              <h2 className="font-bold">Push Notifications</h2>
              <p className="text-sm opacity-60">Stay updated with latest activity</p>
            </div>
          </div>
          
          <button 
            onClick={() => setNotifications(!notifications)}
            className={`w-14 h-8 rounded-full relative transition-colors ${notifications ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-700'}`}
          >
            <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${notifications ? 'left-7' : 'left-1'}`} />
          </button>
        </div>
      </Card>
    </div>
  );
};

export default function App() {
  const [view, setView] = useState("profile"); // 'profile' or 'settings'
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [notifications, setNotifications] = useState(
    JSON.parse(localStorage.getItem("notifications")) ?? true
  );
  const [user, setUser] = useState({
    name: localStorage.getItem("name") || "Alex Rivera",
    email: "alex.rivera@example.com",
    avatar: localStorage.getItem("avatar") || null,
  });

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.className = theme;
    document.body.style.backgroundColor = theme === "dark" ? "#020617" : "#f8fafc";
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem("name", user.name);
    if (user.avatar) localStorage.setItem("avatar", user.avatar);
  }, [user]);

  const navItemClass = (active) => `
    flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all
    ${active 
      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" 
      : "hover:bg-gray-200 dark:hover:bg-white/10 opacity-70 hover:opacity-100"}
  `;

  return (
    <div className={`min-h-screen flex flex-col md:flex-row font-sans ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
      
      {/* SIDEBAR NAVIGATION */}
      <nav className={`w-full md:w-64 p-6 flex flex-col gap-2 ${theme === 'dark' ? 'bg-slate-950' : 'bg-white border-r border-gray-100'}`}>
        <div className="mb-6 px-4">
          {/* Logo Section Removed */}
        </div>

        <button onClick={() => setView("profile")} className={navItemClass(view === "profile")}>
          <User size={20} /> User Profile
        </button>
        <button onClick={() => setView("settings")} className={navItemClass(view === "settings")}>
          <SettingsIcon size={20} /> Settings
        </button>
        
        <div className="mt-auto pt-6 border-t border-gray-200 dark:border-white/5 opacity-50">
          <button className="flex items-center gap-3 px-4 py-3 w-full text-left hover:text-red-500 transition-colors">
            <LogOut size={20} /> Sign Out
          </button>
        </div>
      </nav>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        <header className="max-w-2xl mx-auto flex justify-between items-center mb-8">
          <h1 className="text-3xl font-black capitalize">{view}</h1>
          <div className="flex items-center gap-3">
             <div className="text-right hidden sm:block">
               <p className="text-sm font-bold">{user.name}</p>
               <p className="text-xs opacity-50">Pro Plan</p>
             </div>
             <div className="w-10 h-10 rounded-full bg-indigo-600 overflow-hidden ring-2 ring-indigo-500/20">
               {user.avatar ? <img src={user.avatar} className="w-full h-full object-cover" /> : null}
             </div>
          </div>
        </header>

        {view === "profile" ? (
          <ProfilePage user={user} theme={theme} />
        ) : (
          <SettingsPage 
            user={user} 
            setUser={setUser} 
            theme={theme} 
            setTheme={setTheme} 
            notifications={notifications}
            setNotifications={setNotifications}
          />
        )}
      </main>
    </div>
  );
}