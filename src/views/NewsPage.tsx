import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Send, 
  Newspaper
} from 'lucide-react';
import { motion } from 'motion/react';
import { NewsItem } from '../types';

import { supabase } from '../lib/supabase';

const NewsPage = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('news')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (error) console.error('Error fetching news:', error);
        else setNewsItems(data || []);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-800"></div>
      </div>
    );
  }

  if (newsItems.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-40 text-center"
      >
        <div className="w-24 h-24 bg-emerald-50 rounded-3xl flex items-center justify-center text-emerald-300 mx-auto mb-8">
          <Newspaper className="w-12 h-12" />
        </div>
        <h2 className="text-3xl font-black text-emerald-900 mb-3">Belum Ada Berita</h2>
        <p className="text-slate-500 text-lg">Berita akan muncul di sini setelah Admin menambahkannya.</p>
      </motion.div>
    );
  }

  return (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
  >
    {/* Page-level heading (visually hidden for SEO, visible semantics) */}
    <h1 className="sr-only">Kabar Warga — Berita &amp; Informasi Dusun Cepit</h1>
    {/* Featured News */}
    <section className="relative mb-20 rounded-[2.5rem] overflow-hidden group shadow-2xl">
      <div className="relative h-[500px] w-full">
        <img 
          src={newsItems[0].image} 
          alt="Featured News" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-10 md:p-16 max-w-4xl">
          <span className="bg-emerald-500 px-4 py-1.5 rounded-full text-xs font-black text-emerald-950 uppercase tracking-widest mb-6 inline-block">
            {newsItems[0].category}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-white mb-4 sm:mb-6 leading-tight">
            {newsItems[0].title}
          </h2>
          <p className="text-emerald-50/80 text-base mb-8 line-clamp-2">
            {newsItems[0].excerpt}
          </p>
          <div className="flex items-center gap-6">
            <button className="bg-white text-emerald-900 px-10 py-4 rounded-xl font-bold hover:bg-emerald-500 hover:text-emerald-950 transition-all flex items-center gap-2">
              Baca Selengkapnya <ArrowRight className="w-5 h-5" />
            </button>
            <div className="flex gap-3">
              <button className="w-12 h-12 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button className="w-12 h-12 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all">
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div className="flex flex-col lg:flex-row gap-16">
      <div className="flex-1">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl sm:text-3xl font-black text-emerald-900">Terbaru di Dusun</h2>
          <div className="flex gap-2">
            <button className="px-5 py-2.5 bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-800/20">Terbaru</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {newsItems.slice(1).map((news) => (
            <article key={news.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100 group">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={news.image} 
                  alt={news.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-lg text-xs font-bold uppercase">{news.category}</span>
                  <span className="text-xs text-slate-500 font-medium">{news.date}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-emerald-900 mb-3 sm:mb-4 group-hover:text-emerald-600 transition-colors leading-snug">
                  {news.title}
                </h3>
                <p className="text-slate-500 text-sm mb-8 line-clamp-2 leading-relaxed">
                  {news.excerpt}
                </p>
                <a href="#" className="text-emerald-800 font-bold text-sm flex items-center gap-1 group/link">
                  Selengkapnya <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>
            </article>
          ))}
        </div>
        
        <div className="mt-16 flex justify-center">
          <button className="bg-white border-2 border-emerald-900/10 text-emerald-950 px-12 py-4 rounded-xl font-bold hover:bg-emerald-900 hover:text-white transition-all shadow-lg active:scale-95">
            Muat Berita Lainnya
          </button>
        </div>
      </div>

      <aside className="w-full lg:w-80 space-y-10">
        <div className="bg-emerald-900 rounded-[2.5rem] p-10 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-2xl font-black mb-4 leading-tight">Punya Cerita Menarik?</h3>
            <p className="text-emerald-100/80 text-sm mb-10">Bagikan kabar seputar RT/RW atau kegiatan komunitas Anda di sini.</p>
            <button className="w-full bg-emerald-500 text-emerald-950 py-4 rounded-xl font-bold hover:scale-105 transition-transform flex items-center justify-center gap-2">
              <Send className="w-5 h-5" />
              Kirim Kabar Warga
            </button>
          </div>
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        </div>

      </aside>
    </div>
  </motion.div>
  );
};

export default NewsPage;
