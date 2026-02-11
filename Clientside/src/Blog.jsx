import React, { useState} from 'react';
import { 
  Search, 
  PlusCircle, 
  Clock, 
  User, 
  ArrowRight, 
  X, 
  Layout, 
  BookOpen,
  MessageCircle,
  TrendingUp
} from 'lucide-react';

// --- Initial Mock Data ---
const INITIAL_BLOGS = [
  {
    id: 1,
    title: "The Future of Web Development in 2025",
    excerpt: "Exploring the shift towards edge computing, AI-integrated IDEs, and the evolution of React Server Components.",
    author: "Alex Rivers",
    date: "May 12, 2024",
    category: "Technology",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "Mastering Minimalist UI Design",
    excerpt: "Why less is more: A deep dive into white space, typography, and visual hierarchy for modern applications.",
    author: "Sarah Chen",
    date: "May 10, 2024",
    category: "Design",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "Sustainable Living in the Digital Age",
    excerpt: "Practical tips for reducing your digital carbon footprint while maintaining a connected lifestyle.",
    author: "Marcus Thorne",
    date: "May 08, 2024",
    category: "Lifestyle",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    title: "Remote Work: The Hybrid Model",
    excerpt: "How the world's leading tech companies are navigating the balance between office culture and flexibility.",
    author: "Jordan Smith",
    date: "May 05, 2024",
    category: "Business",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1587560699334-bea93391dcee?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    title: "The Rise of Artificial General Intelligence",
    excerpt: "Understanding the milestones and ethical considerations on the path toward creating AGI.",
    author: "Dr. Elena Vance",
    date: "May 02, 2024",
    category: "AI",
    readTime: "12 min",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    title: "Cybersecurity Essentials for Startups",
    excerpt: "Don't let a data breach end your dream. Key protocols every small team should implement today.",
    author: "Kevin Wright",
    date: "April 28, 2024",
    category: "Security",
    readTime: "7 min",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80"
  }
];

// --- Sub-Component: Blog Card ---
const BlogCard = ({ blog }) => (
  <div className="group bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 flex flex-col h-full">
    <div className="relative overflow-hidden h-48">
      <img 
        src={blog.image} 
        alt={blog.title}
        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
      />
      <div className="absolute top-4 left-4">
        <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-indigo-600 text-xs font-bold rounded-full uppercase tracking-wider">
          {blog.category}
        </span>
      </div>
    </div>
    
    <div className="p-6 flex flex-col flex-grow">
      <div className="flex items-center gap-4 text-xs text-slate-400 mb-3">
        <span className="flex items-center gap-1"><User size={14} /> {blog.author}</span>
        <span className="flex items-center gap-1"><Clock size={14} /> {blog.readTime}</span>
      </div>
      
      <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors">
        {blog.title}
      </h3>
      
      <p className="text-slate-600 text-sm mb-6 line-clamp-3">
        {blog.excerpt}
      </p>
      
      <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
        <span className="text-xs text-slate-400 font-medium">{blog.date}</span>
        <button className="text-indigo-600 hover:text-indigo-700 font-semibold text-sm flex items-center gap-1 group/btn">
          Read More <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  </div>
);

// --- Main App Component ---
export default function Blog() {
  const [blogs, setBlogs] = useState(INITIAL_BLOGS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Form State
  const [newBlog, setNewBlog] = useState({
    title: "",
    excerpt: "",
    author: "",
    category: "Technology",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80"
  });

  const handleCreatePost = (e) => {
    e.preventDefault();
    const blogToAdd = {
      ...newBlog,
      id: Date.now(),
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    };
    setBlogs([blogToAdd, ...blogs]);
    setIsModalOpen(false);
    setNewBlog({
      title: "",
      excerpt: "",
      author: "",
      category: "Technology",
      readTime: "5 min",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80"
    });
  };

  const filteredBlogs = blogs.filter(b => 
    b.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    b.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Hero Section */}
      <header className="py-16 md:py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <Layout className="text-white" size={24} />
            </div>
            <span className="text-2xl font-black tracking-tight text-slate-800">BLOG<span className="text-indigo-600">HUB</span></span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
            Insights for the <span className="text-indigo-600">Modern Creator</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-10">
            A curated collection of stories, tutorials, and insights regarding technology, design, and the digital lifestyle.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 max-w-2xl mx-auto">
            {/* Search Bar */}
            <div className="flex-grow relative group w-full">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500">
                <Search size={20} />
              </div>
              <input 
                type="text" 
                placeholder="Search articles..."
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:bg-white transition-all text-slate-700"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Create Post Button (Moved from Nav) */}
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl text-base font-bold shadow-lg shadow-indigo-200 transition-all active:scale-95 w-full md:w-auto whitespace-nowrap"
            >
              <PlusCircle size={20} />
              <span>Create Post</span>
            </button>
          </div>
        </div>
      </header>

      {/* Featured / Trending Tabs (Visual Only) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 flex items-center gap-6 overflow-x-auto pb-4 no-scrollbar">
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-full text-sm font-bold shadow-md shadow-indigo-100 whitespace-nowrap">
          <TrendingUp size={16} /> Latest Articles
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-white text-slate-600 hover:bg-slate-100 rounded-full text-sm font-bold border border-slate-200 whitespace-nowrap transition-colors">
          <BookOpen size={16} /> Design
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-white text-slate-600 hover:bg-slate-100 rounded-full text-sm font-bold border border-slate-200 whitespace-nowrap transition-colors">
          <MessageCircle size={16} /> Tutorials
        </button>
      </div>

      {/* Blog Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map(blog => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
            <p className="text-slate-400 text-lg">No articles found matching your search.</p>
          </div>
        )}
      </main>

      {/* Create Post Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-800">Publish New Article</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X size={20} className="text-slate-500" />
              </button>
            </div>
            
            <form onSubmit={handleCreatePost} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Article Title</label>
                <input 
                  required
                  type="text" 
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                  placeholder="e.g. How to Build a React App"
                  value={newBlog.title}
                  onChange={(e) => setNewBlog({...newBlog, title: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Author Name</label>
                  <input 
                    required
                    type="text" 
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                    placeholder="Your Name"
                    value={newBlog.author}
                    onChange={(e) => setNewBlog({...newBlog, author: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Category</label>
                  <select 
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                    value={newBlog.category}
                    onChange={(e) => setNewBlog({...newBlog, category: e.target.value})}
                  >
                    <option>Technology</option>
                    <option>Design</option>
                    <option>Business</option>
                    <option>Lifestyle</option>
                    <option>AI</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Excerpt</label>
                <textarea 
                  required
                  rows="3"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all resize-none"
                  placeholder="A short summary of the article..."
                  value={newBlog.excerpt}
                  onChange={(e) => setNewBlog({...newBlog, excerpt: e.target.value})}
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Cover Image URL (Optional)</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                  placeholder="https://images.unsplash.com/..."
                  value={newBlog.image}
                  onChange={(e) => setNewBlog({...newBlog, image: e.target.value})}
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-3 border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-4 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all active:scale-95"
                >
                  Post Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <Layout className="text-white" size={16} />
            </div>
            <span className="text-white font-black tracking-tight text-xl">Aether AI</span>
          </div>
          <p className="text-sm">© 2026 Aether AI Corporation. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}