import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, X, ChevronLeft, ChevronRight, ZoomIn, Images } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { GalleryPhoto } from '../types';

const CATEGORIES = ['Semua', 'Kegiatan', 'Infrastruktur', 'Sosial', 'Alam', 'Lainnya'];

const GalleryPage = () => {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [filtered, setFiltered] = useState<GalleryPhoto[]>([]);
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    fetchPhotos();
  }, []);

  useEffect(() => {
    if (activeCategory === 'Semua') {
      setFiltered(photos);
    } else {
      setFiltered(photos.filter((p) => p.category === activeCategory));
    }
  }, [activeCategory, photos]);

  const fetchPhotos = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setPhotos(data);
    if (error) console.error('[Gallery] Error fetching:', error.message);
    setLoading(false);
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    document.body.style.overflow = '';
  };

  const prevPhoto = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filtered.length) % filtered.length);
  };

  const nextPhoto = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filtered.length);
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'ArrowLeft') prevPhoto();
      if (e.key === 'ArrowRight') nextPhoto();
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightboxIndex, filtered.length]);

  const currentPhoto = lightboxIndex !== null ? filtered[lightboxIndex] : null;

  return (
    <div className="min-h-screen bg-[#fcfdfc]">
      {/* Hero */}
      <section className="relative bg-emerald-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400 rounded-full translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-400 rounded-full -translate-x-1/3 translate-y-1/3" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-emerald-800/50 border border-emerald-700 text-emerald-300 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
              <Camera className="w-4 h-4" />
              Dokumentasi Visual
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 tracking-tight">
              Galeri <span className="text-emerald-300">Dusun Cepit</span>
            </h1>
            <p className="text-emerald-200 text-base sm:text-lg max-w-2xl mx-auto">
              Rekam jejak kegiatan, pembangunan, dan kehidupan masyarakat Dusun Cepit.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter */}
      <section className="sticky top-20 z-30 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3 overflow-x-auto pb-1 no-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? 'bg-emerald-800 text-white shadow-lg shadow-emerald-800/20'
                    : 'bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="aspect-square bg-slate-200 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-32 text-slate-400"
          >
            <Images className="w-20 h-20 mb-6 text-slate-200" />
            <p className="text-xl font-bold text-slate-300">Belum ada foto</p>
            <p className="text-sm mt-2">Foto kegiatan akan ditampilkan di sini.</p>
          </motion.div>
        ) : (
          <motion.div
            layout
            className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4"
          >
            {filtered.map((photo, i) => (
              <GalleryItem
                key={photo.id}
                photo={photo}
                index={i}
                onClick={() => openLightbox(i)}
              />
            ))}
          </motion.div>
        )}
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && currentPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-emerald-950/95 backdrop-blur-xl p-4"
          >
            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all text-white z-10"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Counter */}
            <div className="absolute top-6 left-6 text-white/60 text-sm font-bold">
              {lightboxIndex + 1} / {filtered.length}
            </div>

            {/* Prev */}
            <button
              onClick={prevPhoto}
              className="absolute left-4 md:left-8 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all text-white z-10"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>

            {/* Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              className="max-w-4xl w-full"
            >
              <img
                src={currentPhoto.image_url}
                alt={currentPhoto.title}
                className="w-full max-h-[75vh] object-contain rounded-2xl"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect fill='%23064e3b' width='400' height='300'/%3E%3Ctext fill='%2334d399' font-family='sans-serif' font-size='16' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3EGambar tidak tersedia%3C/text%3E%3C/svg%3E";
                }}
              />
              <div className="mt-4 text-center">
                <h3 className="text-white text-lg font-bold">{currentPhoto.title}</h3>
                {currentPhoto.description && (
                  <p className="text-emerald-300 text-sm mt-1">{currentPhoto.description}</p>
                )}
                <span className="inline-block mt-2 text-[10px] font-black uppercase tracking-widest text-emerald-300 bg-emerald-800/50 border border-emerald-700 px-3 py-1 rounded-full">
                  {currentPhoto.category}
                </span>
              </div>
            </motion.div>

            {/* Next */}
            <button
              onClick={nextPhoto}
              className="absolute right-4 md:right-8 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all text-white z-10"
            >
              <ChevronRight className="w-7 h-7" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ── Extracted gallery card to manage per-image loading state ──────────────────
const GalleryItem = ({
  photo,
  index,
  onClick,
}: {
  photo: GalleryPhoto;
  index: number;
  onClick: () => void;
}) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      className="relative group cursor-pointer rounded-2xl overflow-hidden break-inside-avoid mb-4 bg-slate-100"
      onClick={onClick}
      style={{ minHeight: '150px' }}
    >
      {/* Skeleton while loading */}
      {!imgLoaded && !imgError && (
        <div className="absolute inset-0 bg-slate-200 animate-pulse rounded-2xl" />
      )}

      {imgError ? (
        <div className="w-full flex flex-col items-center justify-center py-12 text-slate-400 gap-2">
          <Images className="w-8 h-8 text-slate-300" />
          <p className="text-xs font-medium text-slate-400">Gambar tidak tersedia</p>
          <p className="text-[10px] text-slate-300">Pastikan bucket Supabase bersifat Public</p>
        </div>
      ) : (
        <img
          src={photo.image_url}
          alt={photo.title}
          className={`w-full object-cover transition-all duration-500 group-hover:scale-110 ${
            imgLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImgLoaded(true)}
          onError={() => {
            setImgError(true);
            setImgLoaded(true);
          }}
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4">
        <ZoomIn className="w-6 h-6 text-white mb-2 self-end" />
        <p className="text-white font-bold text-sm leading-tight">{photo.title}</p>
        {photo.description && (
          <p className="text-emerald-200 text-xs mt-1 line-clamp-2">{photo.description}</p>
        )}
        <span className="mt-2 text-[10px] font-black uppercase tracking-widest text-emerald-300 bg-emerald-900/50 px-2.5 py-1 rounded-full w-fit">
          {photo.category}
        </span>
      </div>
    </motion.div>
  );
};

export default GalleryPage;
