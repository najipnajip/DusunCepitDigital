import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Users,
  ArrowRight,
  Navigation,
  Send,
  History
} from 'lucide-react';
import { motion } from 'motion/react';
import { Page, Stats } from '../types';
import { supabase } from '../lib/supabase';

interface HomePageProps {
  onNavigate: (p: Page) => void;
  onOpenFeedback: (type: 'aduan' | 'saran') => void;
}

const DEFAULT_STATS: Stats = {
  populasi: '809',
  laki_laki: '280',
  perempuan: '529',
  umkm: '21'
};

const HomePage = ({ onNavigate, onOpenFeedback }: HomePageProps) => {
  const [stats, setStats] = useState<Stats>(DEFAULT_STATS);

  useEffect(() => {
    fetch('/api/stats')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(data => {
        setStats({
          populasi: data.populasi?.toLocaleString('id-ID') || DEFAULT_STATS.populasi,
          laki_laki: data.laki_laki?.toString() || DEFAULT_STATS.laki_laki,
          perempuan: data.perempuan?.toString() || DEFAULT_STATS.perempuan,
          umkm: data.umkm?.toString() || DEFAULT_STATS.umkm
        });
      })
      .catch(() => { });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-20 pb-20"
    >
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/candi-banyunibo.png"
            alt="Candi Banyunibo"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-emerald-950/60 backdrop-blur-[2px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-white">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl"
          >
            <span className="inline-block px-4 py-1.5 bg-emerald-500 text-emerald-950 rounded-full text-xs font-black uppercase tracking-widest mb-6">
              Selamat Datang di Portal Resmi
            </span>
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              Pusat Informasi & Potensi <span className="text-emerald-400">Ekonomi Kreatif</span> Desa
            </h1>
            <p className="text-xl text-emerald-50/80 mb-10 leading-relaxed">
              Portal resmi Dusun Cepit — temukan informasi warga, kabar terkini, dan lokasi dusun kami di satu tempat.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => onNavigate('map')}
                className="bg-emerald-500 hover:bg-emerald-400 text-emerald-950 px-10 py-4 rounded-xl font-bold text-lg flex items-center gap-2 transition-all shadow-xl shadow-emerald-500/20 active:scale-95 group"
              >
                <MapPin className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Lihat Peta Lokasi
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Populasi Dusun', value: stats.populasi, icon: Users },
            { label: 'Laki-laki', value: stats.laki_laki, icon: Users },
            { label: 'Perempuan', value: stats.perempuan, icon: Users },
            { label: 'Unit UMKM', value: stats.umkm, icon: MapPin },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl border border-emerald-900/10 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
              <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-800 mb-4 group-hover:bg-emerald-800 group-hover:text-white transition-colors">
                <stat.icon className="w-6 h-6" />
              </div>
              <p className="text-3xl font-black text-emerald-900 mb-1">{stat.value}</p>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Peta Lokasi Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-black text-emerald-900 mb-2">Temukan Kami di Peta</h2>
            <p className="text-slate-500">Lokasi strategis Dusun Cepit di Kabupaten Sleman, DIY.</p>
          </div>
          <button
            onClick={() => onNavigate('map')}
            className="hidden md:flex items-center gap-2 text-emerald-800 font-bold hover:gap-4 transition-all"
          >
            Lihat Detail <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-100 relative">
          <iframe
            title="Peta Lokasi Dusun Cepit"
            src="https://www.google.com/maps/d/u/0/embed?mid=1yEVm4obSVIiOCzhMnVXE9m6s59O1KzM&ehbc=2E312F&noprof=1"
            width="100%"
            height="420"
            style={{ border: 0, display: 'block' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          {/* Overlay CTA */}
          <div className="absolute bottom-4 right-4">
            <button
              onClick={() => onNavigate('map')}
              className="flex items-center gap-2 bg-emerald-900 hover:bg-emerald-800 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg transition-all active:scale-95"
            >
              <Navigation className="w-4 h-4" />
              Buka Halaman Peta
            </button>
          </div>
        </div>

        {/* Info ringkas */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          {[
            { icon: MapPin, label: 'Alamat', value: 'Cepit, Bokoharjo, Prambanan, Sleman' },
            { icon: Navigation, label: 'Kecamatan', value: 'Prambanan, Kabupaten Sleman' },
            { icon: Users, label: 'Warga', value: `${stats.populasi} Jiwa` },
          ].map((item, i) => (
            <div key={i} className="bg-white border border-slate-100 rounded-2xl p-5 flex items-center gap-4 shadow-sm">
              <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-700 shrink-0">
                <item.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.label}</p>
                <p className="font-bold text-emerald-900 text-sm">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-emerald-900 px-8 py-20 text-center shadow-2xl">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Punya Keluhan atau Saran?</h2>
            <p className="text-emerald-100 text-lg mb-10 opacity-90">
              Kami mendengarkan setiap aspirasi Anda demi mewujudkan dusun yang lebih baik, transparan, dan responsif terhadap kebutuhan warga.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => onOpenFeedback('aduan')}
                className="bg-emerald-500 text-emerald-950 px-10 py-4 rounded-xl font-bold hover:scale-105 transition-transform flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Kirim Aduan Online
              </button>
              <button
                onClick={() => onOpenFeedback('saran')}
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-4 rounded-xl font-bold hover:bg-white/20 transition-all flex items-center justify-center gap-2"
              >
                <History className="w-5 h-5" />
                Kotak Saran Digital
              </button>
            </div>
          </div>
          <div className="absolute -top-12 -right-12 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-12 -left-12 w-80 h-80 bg-black/20 rounded-full blur-3xl"></div>
        </div>
      </section>
    </motion.div>
  );
};

export default HomePage;
