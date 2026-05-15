import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  Newspaper, 
  Trash2, 
  Plus, 
  LayoutDashboard,
  ShieldCheck,
  LogOut,
  Loader2,
  X,
  Upload,
  Images,
  ImageIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../lib/supabase';
import type { Feedback, NewsItem, GalleryPhoto } from '../types';

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'feedback' | 'news' | 'gallery'>('feedback');

  // Data states
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [gallery, setGallery] = useState<GalleryPhoto[]>([]);
  const [dataLoading, setDataLoading] = useState(false);

  // Modal states
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [editingNewsId, setEditingNewsId] = useState<number | null>(null);
  const [editingGalleryId, setEditingGalleryId] = useState<number | null>(null);

  // File upload states
  const [uploadingNews, setUploadingNews] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const newsFileRef = useRef<HTMLInputElement>(null);
  const galleryFileRef = useRef<HTMLInputElement>(null);
  const [newNews, setNewNews] = useState<Partial<NewsItem>>({
    title: '', category: 'Sorotan Utama',
    date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
    excerpt: '', image: ''
  });
  const [newGallery, setNewGallery] = useState<Partial<GalleryPhoto>>({
    title: '', category: 'Kegiatan', description: '', image_url: ''
  });

  // --- Auth ---
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setLoginError('Email atau kata sandi salah. Coba lagi.');
    }
    setLoginLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  // --- Supabase Storage Upload ---
  const uploadImage = async (
    file: File,
    bucket: string,
    folder: string
  ): Promise<string | null> => {
    const ext = file.name.split('.').pop();
    const filename = `${folder}/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from(bucket).upload(filename, file, { upsert: true });
    if (error) { alert('Gagal upload: ' + error.message); return null; }
    const { data } = supabase.storage.from(bucket).getPublicUrl(filename);
    return data.publicUrl;
  };

  // --- Data Fetching ---
  const fetchData = async () => {
    setDataLoading(true);
    const [fbRes, newsRes, galleryRes] = await Promise.all([
      supabase.from('feedback').select('*').order('created_at', { ascending: false }),
      supabase.from('news').select('*').order('created_at', { ascending: false }),
      supabase.from('gallery').select('*').order('created_at', { ascending: false }),
    ]);
    if (fbRes.data)      setFeedback(fbRes.data);
    if (newsRes.data)    setNews(newsRes.data);
    if (galleryRes.data) setGallery(galleryRes.data);
    setDataLoading(false);
  };

  // --- Delete ---
  const deleteItem = async (id: number, table: 'feedback' | 'news') => {
    if (!confirm('Hapus data ini?')) return;
    const { error } = await supabase.from(table).delete().eq('id', id);
    if (!error) fetchData();
    else alert('Gagal menghapus data: ' + error.message);
  };

  // --- News CRUD ---
  const handleNewsImageUpload = async (file: File) => {
    setUploadingNews(true);
    const url = await uploadImage(file, 'images', 'news');
    if (url) setNewNews((n) => ({ ...n, image: url }));
    setUploadingNews(false);
  };

  const saveNews = async (e: React.FormEvent) => {
    e.preventDefault();
    let err;
    if (editingNewsId) {
      const { error } = await supabase.from('news').update(newNews).eq('id', editingNewsId);
      err = error;
    } else {
      const { error } = await supabase.from('news').insert([newNews]);
      err = error;
    }
    if (err) { alert('Gagal simpan berita: ' + err.message); return; }
    setIsNewsModalOpen(false);
    setEditingNewsId(null);
    setNewNews({ title: '', category: 'Sorotan Utama', date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }), excerpt: '', image: '' });
    fetchData();
  };

  const handleEditNews = (item: NewsItem) => {
    setNewNews(item);
    setEditingNewsId(item.id);
    setIsNewsModalOpen(true);
  };

  const openAddNewsModal = () => {
    setEditingNewsId(null);
    setNewNews({ title: '', category: 'Sorotan Utama', date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }), excerpt: '', image: '' });
    setIsNewsModalOpen(true);
  };

  // --- Gallery CRUD ---
  const handleGalleryImageUpload = async (file: File) => {
    setUploadingGallery(true);
    const url = await uploadImage(file, 'images', 'gallery');
    if (url) setNewGallery((g) => ({ ...g, image_url: url }));
    setUploadingGallery(false);
  };

  const saveGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGallery.image_url) { alert('Foto harus diupload terlebih dahulu.'); return; }
    let err;
    if (editingGalleryId) {
      const { error } = await supabase.from('gallery').update(newGallery).eq('id', editingGalleryId);
      err = error;
    } else {
      const { error } = await supabase.from('gallery').insert([newGallery]);
      err = error;
    }
    if (err) { alert('Gagal simpan foto: ' + err.message); return; }
    setIsGalleryModalOpen(false);
    setEditingGalleryId(null);
    setNewGallery({ title: '', category: 'Kegiatan', description: '', image_url: '' });
    fetchData();
  };

  const handleEditGallery = (item: GalleryPhoto) => {
    setNewGallery(item);
    setEditingGalleryId(item.id);
    setIsGalleryModalOpen(true);
  };

  const openAddGalleryModal = () => {
    setEditingGalleryId(null);
    setNewGallery({ title: '', category: 'Kegiatan', description: '', image_url: '' });
    setIsGalleryModalOpen(true);
  };

  // --- Render ---
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-12 h-12 text-emerald-800 animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-white p-10 rounded-[2.5rem] shadow-2xl border border-emerald-100"
        >
          <div className="w-20 h-20 bg-emerald-100/50 rounded-3xl flex items-center justify-center text-emerald-800 mx-auto mb-8">
            <ShieldCheck className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-black text-center text-emerald-900 mb-2">CMS Admin</h2>
          <p className="text-slate-500 text-center mb-10">Masukkan kredensial Anda untuk masuk ke panel manajemen Dusun Cepit.</p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 text-base focus:ring-2 focus:ring-emerald-500 transition-all text-emerald-900"
                placeholder="admin@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Kata Sandi</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 text-base focus:ring-2 focus:ring-emerald-500 transition-all text-emerald-900 font-bold"
                placeholder="••••••••"
                required
              />
            </div>
            {loginError && (
              <p className="text-rose-500 text-sm font-medium text-center">{loginError}</p>
            )}
            <button
              type="submit"
              disabled={loginLoading}
              className="w-full bg-emerald-800 text-white py-4 rounded-2xl font-black text-base hover:bg-emerald-900 transition-all shadow-xl shadow-emerald-800/20 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loginLoading && <Loader2 className="w-5 h-5 animate-spin" />}
              {loginLoading ? 'Memproses...' : 'Masuk Panel'}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className="w-full lg:w-80 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-8 border-b border-slate-100 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-emerald-800 rounded-lg text-white">
              <LayoutDashboard className="w-5 h-5" />
            </div>
            <span className="text-xl font-black text-emerald-900">Admin Panel</span>
          </div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Selamat Datang, Admin</p>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {[
            { id: 'feedback', name: 'Aduan & Saran', icon: MessageSquare, count: feedback.length },
            { id: 'news', name: 'Kabar Warga', icon: Newspaper, count: news.length },
            { id: 'gallery', name: 'Galeri Foto', icon: Images, count: gallery.length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${
                activeTab === tab.id
                  ? 'bg-emerald-800 text-white shadow-lg shadow-emerald-800/20'
                  : 'text-slate-500 hover:bg-emerald-50 hover:text-emerald-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <tab.icon className="w-5 h-5" />
                <span className="font-bold text-sm">{tab.name}</span>
              </div>
              <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
              }`}>{tab.count}</span>
            </button>
          ))}
        </nav>

        <div className="p-8 border-t border-slate-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 p-4 rounded-2xl text-rose-500 hover:bg-rose-50 transition-all font-bold text-sm"
          >
            <LogOut className="w-5 h-5" /> Keluar
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-emerald-900">
              {activeTab === 'feedback' && 'Kotak Aspirasi Warga'}
              {activeTab === 'news' && 'Editor Kabar Dusun'}
              {activeTab === 'gallery' && 'Manajemen Galeri Foto'}
            </h1>
            <p className="text-slate-500 mt-2">Panel kontrol untuk mengelola konten dan aspirasi masyarakat.</p>
          </div>

          {(activeTab === 'news' || activeTab === 'gallery') && (
            <button
              onClick={() => {
                if (activeTab === 'news') openAddNewsModal();
                else openAddGalleryModal();
              }}
              className="bg-emerald-800 text-white px-8 py-3.5 rounded-2xl font-black flex items-center gap-2 hover:bg-emerald-900 transition-all shadow-xl shadow-emerald-800/20 active:scale-95"
            >
              <Plus className="w-5 h-5" />
              Tambah {activeTab === 'news' ? 'Berita' : 'Foto'}
            </button>
          )}
        </header>

        {dataLoading ? (
          <div className="flex items-center justify-center h-96">
            <Loader2 className="w-12 h-12 text-emerald-800 animate-spin" />
          </div>
        ) : (
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">

            {/* Feedback Tab */}
            {activeTab === 'feedback' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100">
                      <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Warga</th>
                      <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Tipe</th>
                      <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Isi Aspirasi</th>
                      <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {feedback.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-8 py-6">
                          <p className="font-bold text-emerald-900">{item.name}</p>
                          <p className="text-xs text-slate-400">{item.phone}</p>
                        </td>
                        <td className="px-8 py-6">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tight ${
                            item.type === 'aduan' ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'
                          }`}>
                            {item.type}
                          </span>
                        </td>
                        <td className="px-8 py-6 max-w-md">
                          <p className="text-[10px] font-black text-emerald-600 uppercase mb-1">{item.category}</p>
                          <p className="text-sm text-slate-600 leading-relaxed">{item.message}</p>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <button
                            onClick={() => deleteItem(item.id, 'feedback')}
                            className="p-3 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {feedback.length === 0 && (
                      <tr>
                        <td colSpan={4} className="px-8 py-12 text-center text-slate-400 font-medium italic">Tidak ada aspirasi masuk.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* Gallery Tab */}
            {activeTab === 'gallery' && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-8">
                {gallery.map((item) => (
                  <div key={item.id} className="bg-slate-50 rounded-3xl overflow-hidden border border-slate-100 group">
                    <div className="relative aspect-square overflow-hidden">
                      {item.image_url ? (
                        <img
                          src={item.image_url}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          alt=""
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                            const parent = (e.target as HTMLImageElement).parentElement;
                            if (parent && !parent.querySelector('.img-err')) {
                              const el = document.createElement('div');
                              el.className = 'img-err w-full h-full flex flex-col items-center justify-center bg-rose-50 gap-2';
                              el.innerHTML = `<svg xmlns='http://www.w3.org/2000/svg' class='w-8 h-8 text-rose-300' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M6 18L18 6M6 6l12 12'/></svg><p class='text-[10px] text-rose-400 font-bold text-center px-2'>Bucket tidak public</p>`;
                              parent.appendChild(el);
                            }
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-slate-200">
                          <ImageIcon className="w-10 h-10 text-slate-400" />
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-emerald-900 text-sm truncate">{item.title}</h3>
                      <span className="text-[10px] font-black text-emerald-600 uppercase tracking-wide">{item.category}</span>
                      <div className="flex gap-2 mt-3">
                        <button onClick={() => handleEditGallery(item)} className="flex-1 bg-white hover:bg-emerald-50 text-emerald-800 py-2 rounded-xl text-xs font-bold border border-emerald-100 transition-all">Edit</button>
                        <button onClick={() => deleteItem(item.id, 'gallery' as any)} className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {gallery.length === 0 && (
                  <div className="col-span-4 py-12 text-center text-slate-400 font-medium italic">Belum ada foto di galeri.</div>
                )}
              </div>
            )}

            {/* News Tab */}
            {activeTab === 'news' && (
              <div className="divide-y divide-slate-50">
                {news.map((item) => (
                  <div key={item.id} className="p-8 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                    <div className="flex items-center gap-6">
                      <img src={item.image} className="w-24 h-16 rounded-xl object-cover" alt="" />
                      <div>
                        <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">{item.category}</span>
                        <h3 className="text-lg font-bold text-emerald-900 mt-1">{item.title}</h3>
                        <p className="text-xs text-slate-400">{item.date}</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <button onClick={() => handleEditNews(item)} className="p-3 text-slate-300 hover:text-emerald-800 hover:bg-emerald-50 rounded-xl transition-all text-xs font-bold">Edit</button>
                      <button onClick={() => deleteItem(item.id, 'news')} className="p-3 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
                {news.length === 0 && (
                  <div className="py-12 text-center text-slate-400 font-medium italic">Belum ada berita.</div>
                )}
              </div>
            )}
          </div>
        )}
      </main>

      {/* News Modal */}
      <AnimatePresence>
        {isNewsModalOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsNewsModalOpen(false)} className="absolute inset-0 bg-emerald-950/40 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative w-full max-w-xl bg-white rounded-[2.5rem] p-8 shadow-2xl">
              <button onClick={() => setIsNewsModalOpen(false)} className="absolute top-6 right-6 p-2 rounded-xl hover:bg-slate-100 transition-all"><X className="w-5 h-5 text-slate-400" /></button>
              <h3 className="text-2xl font-black text-emerald-900 mb-8">{editingNewsId ? 'Edit Berita' : 'Tulis Berita Baru'}</h3>
              <form onSubmit={saveNews} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase pl-2">Judul Utama</label>
                  <input required type="text" value={newNews.title} onChange={e => setNewNews({...newNews, title: e.target.value})} className="w-full bg-slate-50 border-none rounded-xl py-3 px-4 text-sm" placeholder="Masukkan judul menarik..." />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase pl-2">Deskripsi Singkat</label>
                  <textarea required rows={3} value={newNews.excerpt} onChange={e => setNewNews({...newNews, excerpt: e.target.value})} className="w-full bg-slate-50 border-none rounded-xl py-3 px-4 text-sm" placeholder="Ringkasan berita..." />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase pl-2">Kategori</label>
                    <select value={newNews.category} onChange={e => setNewNews({...newNews, category: e.target.value})} className="w-full bg-slate-50 border-none rounded-xl py-3 px-4 text-sm">
                      <option>Sorotan Utama</option><option>Gotong Royong</option><option>Infrastruktur</option><option>Kesehatan</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase pl-2">Foto Berita</label>
                    <input ref={newsFileRef} type="file" accept="image/*" className="hidden" onChange={e => e.target.files?.[0] && handleNewsImageUpload(e.target.files[0])} />
                    <div
                      onClick={() => newsFileRef.current?.click()}
                      className="w-full bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl py-4 px-4 text-sm flex items-center gap-3 cursor-pointer hover:border-emerald-400 hover:bg-emerald-50 transition-all"
                    >
                      {uploadingNews ? (
                        <Loader2 className="w-5 h-5 text-emerald-600 animate-spin" />
                      ) : newNews.image ? (
                        <img src={newNews.image} className="w-10 h-10 rounded-lg object-cover" alt="" />
                      ) : (
                        <Upload className="w-5 h-5 text-slate-400" />
                      )}
                      <span className="text-slate-500 text-xs">{uploadingNews ? 'Mengupload...' : newNews.image ? 'Foto terpilih — klik untuk ganti' : 'Klik untuk upload foto'}</span>
                    </div>
                  </div>
                </div>
                <div className="pt-4 flex gap-3">
                  <button type="button" onClick={() => setIsNewsModalOpen(false)} className="flex-1 bg-slate-100 text-slate-500 py-4 rounded-xl font-bold">Batal</button>
                  <button type="submit" className="flex-[2] bg-emerald-800 text-white py-4 rounded-xl font-bold shadow-lg shadow-emerald-800/20">Terbitkan Berita</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Gallery Modal */}
      <AnimatePresence>
        {isGalleryModalOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsGalleryModalOpen(false)} className="absolute inset-0 bg-emerald-950/40 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative w-full max-w-xl bg-white rounded-[2.5rem] p-8 shadow-2xl">
              <button onClick={() => setIsGalleryModalOpen(false)} className="absolute top-6 right-6 p-2 rounded-xl hover:bg-slate-100 transition-all"><X className="w-5 h-5 text-slate-400" /></button>
              <h3 className="text-2xl font-black text-emerald-900 mb-8">{editingGalleryId ? 'Edit Foto' : 'Upload Foto Baru'}</h3>
              <form onSubmit={saveGallery} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase pl-2">Judul Foto</label>
                  <input required type="text" value={newGallery.title} onChange={e => setNewGallery({...newGallery, title: e.target.value})} className="w-full bg-slate-50 border-none rounded-xl py-3 px-4 text-sm" placeholder="Contoh: Gotong Royong Bersih Dusun" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase pl-2">Kategori</label>
                    <select value={newGallery.category} onChange={e => setNewGallery({...newGallery, category: e.target.value})} className="w-full bg-slate-50 border-none rounded-xl py-3 px-4 text-sm">
                      <option>Kegiatan</option><option>Infrastruktur</option><option>Sosial</option><option>Alam</option><option>Lainnya</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase pl-2">Deskripsi (opsional)</label>
                    <input type="text" value={newGallery.description || ''} onChange={e => setNewGallery({...newGallery, description: e.target.value})} className="w-full bg-slate-50 border-none rounded-xl py-3 px-4 text-sm" placeholder="Keterangan singkat..." />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase pl-2">Upload Foto</label>
                  <input ref={galleryFileRef} type="file" accept="image/*" className="hidden" onChange={e => e.target.files?.[0] && handleGalleryImageUpload(e.target.files[0])} />
                  <div
                    onClick={() => galleryFileRef.current?.click()}
                    className="w-full bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl py-6 px-4 text-sm flex flex-col items-center gap-3 cursor-pointer hover:border-emerald-400 hover:bg-emerald-50 transition-all"
                  >
                    {uploadingGallery ? (
                      <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
                    ) : newGallery.image_url ? (
                      <img src={newGallery.image_url} className="w-24 h-24 rounded-xl object-cover" alt="" />
                    ) : (
                      <Upload className="w-8 h-8 text-slate-300" />
                    )}
                    <span className="text-slate-400 text-xs text-center">{uploadingGallery ? 'Mengupload foto...' : newGallery.image_url ? 'Foto terupload — klik untuk ganti' : 'Klik untuk pilih foto dari perangkat'}</span>
                  </div>
                  <p className="text-[10px] text-amber-500 font-medium pl-2 mt-1">
                    ⚠️ Pastikan bucket <span className="font-bold">images</span> di Supabase Storage sudah bersifat <span className="font-bold">Public</span> agar foto tampil di galeri.
                  </p>
                </div>
                <div className="pt-4 flex gap-3">
                  <button type="button" onClick={() => setIsGalleryModalOpen(false)} className="flex-1 bg-slate-100 text-slate-500 py-4 rounded-xl font-bold">Batal</button>
                  <button type="submit" disabled={uploadingGallery} className="flex-[2] bg-emerald-800 text-white py-4 rounded-xl font-bold shadow-lg shadow-emerald-800/20 disabled:opacity-60">Simpan Foto</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
