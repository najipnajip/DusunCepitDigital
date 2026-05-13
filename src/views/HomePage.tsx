import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Users,
  ArrowRight,
  Navigation,
  Send,
  MessageSquare,
  TrendingUp,
} from 'lucide-react';
import { motion } from 'motion/react';
import { Page, Stats } from '../types';

interface HomePageProps {
  onNavigate: (p: Page) => void;
  onOpenFeedback: (type: 'aduan' | 'saran') => void;
}

const DEFAULT_STATS: Stats = {
  populasi: '809',
  laki_laki: '280',
  perempuan: '529',
  umkm: '21',
};

const StatCard = ({
  label,
  value,
  icon: Icon,
  delay,
}: {
  label: string;
  value?: string;
  icon: React.ElementType;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="bg-white p-5 sm:p-7 rounded-2xl sm:rounded-3xl border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all group card-lift"
  >
    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-50 rounded-xl sm:rounded-2xl flex items-center justify-center text-emerald-700 mb-3 sm:mb-4 group-hover:bg-emerald-800 group-hover:text-white transition-colors">
      <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
    </div>
    {value ? (
      <p className="text-2xl sm:text-3xl font-black text-emerald-900 mb-1">{value}</p>
    ) : (
      <div className="h-8 w-16 shimmer rounded-lg mb-1" />
    )}
    <p className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest">{label}</p>
  </motion.div>
);

const HomePage = ({ onNavigate, onOpenFeedback }: HomePageProps) => {
  const [stats, setStats] = useState<Stats | null>(null);

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
          umkm: data.umkm?.toString() || DEFAULT_STATS.umkm,
        });
      })
      .catch(() => {
        setStats(DEFAULT_STATS);
      });
  }, []);

  const statItems = [
    { label: 'Total Warga', value: stats?.populasi, icon: Users },
    { label: 'Warga Laki-laki', value: stats?.laki_laki, icon: Users },
    { label: 'Warga Perempuan', value: stats?.perempuan, icon: Users },
    { label: 'Unit UMKM', value: stats?.umkm, icon: TrendingUp },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.4 }}
      className="space-y-16 sm:space-y-20 pb-16 sm:pb-20"
    >
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section
        className="relative min-h-[520px] sm:h-[620px] flex items-center overflow-hidden"
        aria-label="Hero Dusun Cepit"
      >
        <div className="absolute inset-0 z-0">
          <img
            src="/candi-banyunibo.png"
            alt="Pemandangan Dusun Cepit dengan latar Candi Banyunibo"
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/75 via-emerald-950/55 to-emerald-900/40" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-white py-16 sm:py-0 w-full">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="max-w-2xl"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 text-emerald-950 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-widest mb-4 sm:mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-900 pulse-ring" />
              Portal Resmi Dusun Cepit
            </span>
            {/* H1: only one per view */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 sm:mb-6 leading-[1.08] tracking-tight">
              Pusat Informasi{' '}
              <span className="text-gradient-emerald">&amp; Potensi</span>{' '}
              <br className="hidden sm:block" />
              Desa Kami
            </h1>
            <p className="text-base sm:text-xl text-emerald-50/80 mb-8 sm:mb-10 leading-relaxed max-w-xl">
              Portal resmi Dusun Cepit, Bokoharjo — temukan informasi warga, kabar terkini, dan lokasi dusun kami di satu tempat.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={() => onNavigate('map')}
                className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 px-7 py-3.5 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all shadow-xl shadow-emerald-500/25 active:scale-95 group"
              >
                <MapPin className="w-5 h-5 group-hover:scale-110 transition-transform shrink-0" />
                Lihat Peta Lokasi
              </button>
              <button
                onClick={() => onNavigate('news')}
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur border border-white/20 text-white px-7 py-3.5 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all active:scale-95"
              >
                Kabar Terkini
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 text-white/40 text-xs font-medium">
          <span>Scroll</span>
          <div className="w-0.5 h-8 bg-white/20 rounded-full" />
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────────────── */}
      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        aria-label="Statistik Dusun Cepit"
      >
        <div className="text-center mb-8">
          <span className="text-emerald-600 font-black uppercase tracking-widest text-xs">Data Warga</span>
          <h2 className="text-2xl sm:text-3xl font-black text-emerald-900 mt-1">Dusun Cepit dalam Angka</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {statItems.map((stat, i) => (
            <StatCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              icon={stat.icon}
              delay={i * 0.08}
            />
          ))}
        </div>
      </section>

      {/* ── Peta Preview ─────────────────────────────────────────────── */}
      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        aria-label="Peta Lokasi Dusun Cepit"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6 sm:mb-10">
          <div>
            <span className="text-emerald-600 font-black uppercase tracking-widest text-xs">Temukan Kami</span>
            <h2 className="text-2xl sm:text-3xl font-black text-emerald-900 mt-1">Peta Lokasi Dusun</h2>
            <p className="text-slate-500 text-sm mt-1">
              Lokasi strategis Dusun Cepit di Kabupaten Sleman, DIY.
            </p>
          </div>
          <button
            onClick={() => onNavigate('map')}
            className="inline-flex items-center gap-2 text-emerald-800 font-bold hover:gap-3 transition-all text-sm shrink-0 min-h-0"
          >
            Lihat Detail <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-slate-100 relative">
          <iframe
            title="Peta Lokasi Dusun Cepit, Bokoharjo, Prambanan, Sleman"
            src="https://www.google.com/maps/d/u/0/embed?mid=1yEVm4obSVIiOCzhMnVXE9m6s59O1KzM&ehbc=2E312F&noprof=1"
            width="100%"
            height="360"
            style={{ border: 0, display: 'block' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4">
            <button
              onClick={() => onNavigate('map')}
              className="inline-flex items-center gap-2 bg-emerald-900 hover:bg-emerald-800 text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-lg transition-all active:scale-95"
            >
              <Navigation className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              Buka Halaman Peta
            </button>
          </div>
        </div>

        {/* Info ringkas */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-4 sm:mt-6">
          {[
            { icon: MapPin, label: 'Alamat', value: 'Cepit, Bokoharjo, Prambanan, Sleman' },
            { icon: Navigation, label: 'Kecamatan', value: 'Prambanan, Kabupaten Sleman' },
            { icon: Users, label: 'Jumlah Warga', value: `${stats?.populasi ?? '...'} Jiwa` },
          ].map((item, i) => (
            <div key={i} className="bg-white border border-slate-100 rounded-xl sm:rounded-2xl p-4 sm:p-5 flex items-center gap-3 sm:gap-4 shadow-sm">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-emerald-50 rounded-lg sm:rounded-xl flex items-center justify-center text-emerald-700 shrink-0">
                <item.icon className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <p className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.label}</p>
                <p className="font-bold text-emerald-900 text-xs sm:text-sm">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────────────── */}
      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        aria-label="Kirim Aspirasi"
      >
        <div className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] bg-emerald-900 px-6 sm:px-10 py-14 sm:py-20 text-center shadow-2xl">
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="inline-block px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-widest rounded-full mb-4">
              Aspirasi Warga
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white mb-4 sm:mb-6 leading-tight">
              Punya Keluhan atau Saran?
            </h2>
            <p className="text-emerald-100/80 text-base sm:text-lg mb-8 sm:mb-10 leading-relaxed">
              Kami mendengarkan setiap aspirasi Anda demi mewujudkan dusun yang lebih baik, transparan, dan responsif terhadap kebutuhan warga.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <button
                onClick={() => onOpenFeedback('aduan')}
                className="inline-flex items-center justify-center gap-2 bg-emerald-500 text-emerald-950 px-8 py-3.5 sm:py-4 rounded-xl font-bold hover:scale-105 hover:bg-emerald-400 transition-all active:scale-95"
              >
                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                Kirim Aduan Online
              </button>
              <button
                onClick={() => onOpenFeedback('saran')}
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-3.5 sm:py-4 rounded-xl font-bold hover:bg-white/20 transition-all active:scale-95"
              >
                <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
                Kotak Saran Digital
              </button>
            </div>
          </div>
          <div className="absolute -top-16 -right-16 w-64 sm:w-80 h-64 sm:h-80 bg-emerald-500/15 rounded-full blur-3xl" />
          <div className="absolute -bottom-16 -left-16 w-64 sm:w-80 h-64 sm:h-80 bg-black/20 rounded-full blur-3xl" />
        </div>
      </section>
    </motion.div>
  );
};

export default HomePage;
