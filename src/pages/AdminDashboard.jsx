import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Mail, Calendar, BarChart3, ArrowLeft, 
  Search, Download, Trash2, CheckCircle2, Clock,
  ChevronRight, ExternalLink, Filter, RefreshCw
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

// ── Shared Components ─────────────────────────────────────────────────────────

function TabButton({ active, icon: Icon, label, onClick, count }) {
  return (
    <button
      onClick={onClick}
      className={`relative flex items-center gap-3 px-6 py-4 transition-all duration-300 border-b-2 ${
        active 
          ? 'border-accent-cyan text-white bg-white/5' 
          : 'border-transparent text-white/40 hover:text-white/70 hover:bg-white/[0.02]'
      }`}
    >
      <Icon size={18} className={active ? 'text-accent-cyan' : ''} />
      <span className="font-semibold text-sm tracking-wide">{label}</span>
      {count !== undefined && (
        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
          active ? 'bg-accent-cyan text-primary-950' : 'bg-white/10 text-white/40'
        }`}>
          {count}
        </span>
      )}
    </button>
  );
}

function AdminCard({ title, value, icon: Icon, color, trend }) {
  return (
    <div className="relative group overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
      <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-10 blur-2xl" style={{ backgroundColor: color }} />
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 rounded-xl bg-white/5 border border-white/10" style={{ color }}>
          <Icon size={24} />
        </div>
        {trend && (
          <span className="text-[10px] font-bold text-accent-cyan bg-accent-cyan/10 px-2 py-1 rounded-lg">
            {trend}
          </span>
        )}
      </div>
      <h3 className="text-white/50 text-xs font-bold uppercase tracking-widest mb-1">{title}</h3>
      <p className="text-3xl font-bold text-white">{value}</p>
    </div>
  );
}

// ── Main Dashboard ───────────────────────────────────────────────────────────

export default function AdminDashboard({ onBack }) {
  const [activeTab, setActiveTab] = useState('subscribers');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    subscribers: [],
    messages: [],
    bookings: []
  });
  const [searchTerm, setSearchTerm] = useState('');

  // 🔒 Prevent background scroll when admin is open
  useEffect(() => {
    if (window.__lenis) window.__lenis.stop();
    document.body.style.overflow = 'hidden';
    
    return () => {
      if (window.__lenis) window.__lenis.start();
      document.body.style.overflow = 'unset';
    };
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [subs, msgs, bks] = await Promise.all([
        supabase.from('newsletter_subscribers').select('*').order('created_at', { ascending: false }),
        supabase.from('contact_messages').select('*').order('created_at', { ascending: false }),
        supabase.from('bookings').select('*').order('created_at', { ascending: false })
      ]);

      setData({
        subscribers: subs.data || [],
        messages: msgs.data || [],
        bookings: bks.data || []
      });
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = data[activeTab].filter(item => {
    const search = searchTerm.toLowerCase();
    if (activeTab === 'subscribers') return item.email.toLowerCase().includes(search);
    if (activeTab === 'messages') return item.name.toLowerCase().includes(search) || item.email.toLowerCase().includes(search);
    if (activeTab === 'bookings') return item.notes?.toLowerCase().includes(search);
    return true;
  });

  return (
    <div 
      data-lenis-prevent
      className="fixed inset-0 z-[9999] bg-[#0B1020] overflow-y-auto text-white font-sans selection:bg-accent-cyan/30"
    >
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent-cyan/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent-purple/5 rounded-full blur-[120px]" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0B1020]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button 
              onClick={onBack}
              className="p-2 rounded-xl hover:bg-white/10 transition-colors text-white/60 hover:text-white"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Intelligence <span className="gradient-text">Command</span></h1>
              <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold">Agency Management Suite</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={fetchData}
              className={`p-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all ${loading ? 'animate-spin' : ''}`}
            >
              <RefreshCw size={18} className="text-accent-cyan" />
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-white/10">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent-cyan to-accent-purple p-[1px]">
                <div className="w-full h-full rounded-full bg-primary-950 flex items-center justify-center text-xs font-bold">
                  AD
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-10">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <AdminCard title="Total Subscribers" value={data.subscribers.length} icon={Users} color="#00F5FF" trend="+12%" />
          <AdminCard title="Inbound Leads" value={data.messages.length} icon={Mail} color="#7C3AED" trend="+5%" />
          <AdminCard title="Pending Bookings" value={data.bookings.length} icon={Calendar} color="#FF4D9D" />
          <AdminCard title="Conversion Rate" value="4.8%" icon={BarChart3} color="#FF8A00" trend="+2.4%" />
        </div>

        {/* Content Section */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl overflow-hidden shadow-2xl">
          {/* Tabs & Search */}
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/10 bg-white/[0.02]">
            <div className="flex overflow-x-auto no-scrollbar">
              <TabButton 
                active={activeTab === 'subscribers'} 
                label="Newsletter" 
                icon={Mail} 
                count={data.subscribers.length}
                onClick={() => setActiveTab('subscribers')} 
              />
              <TabButton 
                active={activeTab === 'messages'} 
                label="Contact Leads" 
                icon={Users} 
                count={data.messages.length}
                onClick={() => setActiveTab('messages')} 
              />
              <TabButton 
                active={activeTab === 'bookings'} 
                label="Bookings" 
                icon={Calendar} 
                count={data.bookings.length}
                onClick={() => setActiveTab('bookings')} 
              />
            </div>

            <div className="p-4 md:pr-6 flex items-center gap-4">
              <div className="relative">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                <input 
                  type="text" 
                  placeholder="Filter results..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-2.5 text-sm outline-none focus:border-accent-cyan/50 transition-all w-64"
                />
              </div>
              <button className="p-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
                <Download size={18} className="text-white/60" />
              </button>
            </div>
          </div>

          {/* Table Area */}
          <div className="p-2 min-h-[500px]">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-24 gap-4">
                <div className="w-12 h-12 rounded-full border-2 border-accent-cyan/20 border-t-accent-cyan animate-spin" />
                <p className="text-white/40 font-bold text-xs uppercase tracking-widest">Loading Intelligence...</p>
              </div>
            ) : filteredData.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                  <Search size={32} className="text-white/20" />
                </div>
                <h3 className="text-xl font-bold mb-2">No results found</h3>
                <p className="text-white/40 max-w-xs mx-auto">Try adjusting your search or filters to find what you're looking for.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-white/40 text-[11px] font-bold uppercase tracking-[0.2em] border-b border-white/5">
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">
                        {activeTab === 'subscribers' ? 'Email Address' : 'Contact Info'}
                      </th>
                      {activeTab !== 'subscribers' && <th className="px-6 py-4">Preview</th>}
                      <th className="px-6 py-4">Date Added</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredData.map((item) => (
                      <motion.tr 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        key={item.id} 
                        className="group hover:bg-white/[0.02] transition-colors"
                      >
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-accent-cyan shadow-[0_0_8px_rgba(0,245,255,0.5)]" />
                            <span className="text-[10px] font-bold text-white/60 uppercase">New</span>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex flex-col">
                            {activeTab === 'subscribers' ? (
                              <span className="text-sm font-semibold text-white">{item.email}</span>
                            ) : (
                              <>
                                <span className="text-sm font-semibold text-white">{item.name}</span>
                                <span className="text-xs text-white/40">{item.email}</span>
                              </>
                            )}
                          </div>
                        </td>
                        {activeTab !== 'subscribers' && (
                          <td className="px-6 py-5 max-w-xs">
                            <p className="text-xs text-white/60 truncate">
                              {activeTab === 'messages' ? item.message : `Call Request: ${item.notes || 'No notes'}`}
                            </p>
                          </td>
                        )}
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2 text-white/40">
                            <Clock size={12} />
                            <span className="text-xs">
                              {new Date(item.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-5 text-right">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                            <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors">
                              <ExternalLink size={14} />
                            </button>
                            <button className="p-2 rounded-lg bg-white/5 hover:bg-accent-pink/10 text-white/60 hover:text-accent-pink transition-colors">
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Footer Area */}
          <div className="px-6 py-4 bg-white/[0.01] border-t border-white/10 flex items-center justify-between">
            <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest">
              Last Sync: {new Date().toLocaleTimeString()}
            </p>
            <div className="flex items-center gap-1">
              <button disabled className="p-1.5 rounded-lg text-white/20"><ChevronRight size={16} className="rotate-180" /></button>
              <span className="text-xs font-bold text-accent-cyan px-2">1</span>
              <button disabled className="p-1.5 rounded-lg text-white/20"><ChevronRight size={16} /></button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
