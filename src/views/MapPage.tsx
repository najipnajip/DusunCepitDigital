import React, { useState } from 'react';
import { MapPin, Navigation, Clock, Phone, Image as ImageIcon, Globe, Download, ZoomIn } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const MapPage = () => {
  const [viewMode, setViewMode] = useState<'interactive' | 'infographic'>('interactive');
  const [isZoomed, setIsZoomed] = useState(false);

  const landmarks = [
    { icon: Clock, label: 'Balai Dusun', desc: 'Pusat kegiatan administrasi dan kemasyarakatan' },
    { icon: MapPin, label: 'Masjid Al-Hikmah', desc: 'Masjid utama warga Dusun Cepit' },
    { icon: Navigation, label: 'Pos Kamling RT 01–03', desc: 'Pos keamanan lingkungan' },
    { icon: Phone, label: 'Puskesmas Terdekat', desc: 'Fasilitas kesehatan terdekat dari dusun' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-4">
            <MapPin className="w-3.5 h-3.5" />
            Lokasi Dusun
          </div>
          <h1 className="text-4xl font-black text-emerald-900 mb-3">Peta Lokasi Dusun Cepit</h1>
          <p className="text-slate-600 max-w-2xl leading-relaxed">
            Pilih tampilan peta interaktif untuk navigasi langsung, atau lihat infografis peta wilayah dusun.
          </p>
        </div>

        {/* Toggle Switch */}
        <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200 w-fit">
          <button
            onClick={() => setViewMode('interactive')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
              viewMode === 'interactive' 
                ? 'bg-white text-emerald-900 shadow-sm' 
                : 'text-slate-500 hover:text-emerald-700'
            }`}
          >
            <Globe className="w-4 h-4" />
            Interaktif
          </button>
          <button
            onClick={() => setViewMode('infographic')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
              viewMode === 'infographic' 
                ? 'bg-white text-emerald-900 shadow-sm' 
                : 'text-slate-500 hover:text-emerald-700'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            Infografis
          </button>
        </div>
      </div>

      {/* Map Content Area */}
      <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-100 mb-12 bg-slate-50 min-h-[520px]">
        <AnimatePresence mode="wait">
          {viewMode === 'interactive' ? (
            <motion.div
              key="maps"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full"
            >
              <iframe
                title="Peta Lokasi Dusun Cepit"
                src="https://www.google.com/maps/d/u/0/embed?mid=1yEVm4obSVIiOCzhMnVXE9m6s59O1KzM&ehbc=2E312F&noprof=1"
                width="100%"
                height="520"
                style={{ border: 0, display: 'block' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
          ) : (
            <motion.div
              key="infographic"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="relative w-full h-full flex flex-col items-center p-4 md:p-8"
            >
              <div className="relative group cursor-zoom-in max-w-4xl w-full" onClick={() => setIsZoomed(true)}>
                <img 
                  src="/peta-infografis.jpg" 
                  alt="Infografis Peta Dusun Cepit" 
                  className="w-full h-auto rounded-xl shadow-lg border border-slate-200 transition-transform hover:scale-[1.01]"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center rounded-xl">
                  <ZoomIn className="text-white opacity-0 group-hover:opacity-100 w-10 h-10 drop-shadow-lg transition-opacity" />
                </div>
              </div>
              
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <a 
                  href="/peta-infografis.jpg" 
                  download 
                  className="flex items-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white px-8 py-3.5 rounded-2xl font-black transition-all active:scale-95 shadow-xl shadow-emerald-800/20"
                >
                  <Download className="w-5 h-5" />
                  Download Peta (JPG)
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Info Cards + CTA */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Landmark Cards */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {landmarks.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-700 mb-4">
                <item.icon className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-emerald-900 mb-1">{item.label}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Sidebar Alamat */}
        <div className="flex flex-col gap-5">
          <div className="bg-emerald-900 text-white p-8 rounded-3xl relative overflow-hidden">
            <div className="relative z-10">
              <h4 className="font-black text-lg mb-2">Alamat Resmi</h4>
              <p className="text-emerald-100/80 text-sm leading-relaxed mb-6">
                Cepit, Bokoharjo, Kec. Prambanan, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55572
              </p>
              <a
                href="https://maps.google.com/?q=Cepit+Bokoharjo+Prambanan+Sleman+Yogyakarta"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 px-5 py-2.5 rounded-xl font-bold text-sm transition-all active:scale-95"
              >
                <Navigation className="w-4 h-4" />
                Buka di Google Maps
              </a>
            </div>
            <MapPin className="absolute -bottom-4 -right-4 w-28 h-28 text-white/10 rotate-12" />
          </div>
        </div>
      </div>

      {/* Lightbox Zoom */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsZoomed(false)}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.img 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src="/peta-infografis.jpg" 
              className="max-w-full max-h-full rounded-lg shadow-2xl"
            />
            <div className="absolute top-6 right-6 text-white font-bold bg-white/10 px-4 py-2 rounded-full backdrop-blur-md">
              Klik di mana saja untuk tutup
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default MapPage;
