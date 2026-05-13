import React, { useState, useEffect } from 'react';
import {
  MapPin,
  User,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Page } from '../types';

interface NavbarProps {
  currentPage: Page;
  setCurrentPage: (p: Page) => void;
}

const Navbar = ({ currentPage, setCurrentPage }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const navLinks: { name: string; id: Page }[] = [
    { name: 'Beranda', id: 'home' },
    { name: 'Profil', id: 'profile' },
    { name: 'Peta Lokasi', id: 'map' },
    { name: 'Kabar Warga', id: 'news' },
    { name: 'Galeri', id: 'gallery' },
    { name: 'Kontak', id: 'contact' },
  ];

  const navigate = (page: Page) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-sm border-b border-emerald-900/10'
          : 'bg-white/80 backdrop-blur-md border-b border-transparent'
      }`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-20 items-center justify-between gap-2">
          {/* Logo */}
          <button
            onClick={() => navigate('home')}
            className="flex items-center gap-2.5 sm:gap-3 shrink-0 min-h-0 rounded-xl px-1"
            aria-label="Kembali ke Beranda"
          >
            <div className="relative h-9 w-9 sm:h-11 sm:w-11 shrink-0">
              <img
                src="/logo.png"
                alt="Logo Dusun Cepit"
                className="h-full w-full object-contain drop-shadow-sm"
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-base sm:text-lg font-extrabold tracking-tight text-emerald-900 uppercase">
                Dusun Cepit
              </span>
              <span className="text-[9px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-[0.18em]">
                Portal Resmi Dusun
              </span>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Navigasi Utama">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => navigate(link.id)}
                aria-current={currentPage === link.id ? 'page' : undefined}
                className={`relative px-3 lg:px-4 py-2 text-sm font-semibold rounded-xl transition-all min-h-0 ${
                  currentPage === link.id
                    ? 'text-emerald-800 bg-emerald-50'
                    : 'text-slate-600 hover:text-emerald-800 hover:bg-emerald-50/70'
                }`}
              >
                {link.name}
                {currentPage === link.id && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-1 left-3 right-3 h-0.5 bg-emerald-600 rounded-full"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* Portal Warga CTA - hidden on xs, shown sm+ */}
            <a
              href="/admin"
              className="hidden sm:inline-flex bg-emerald-800 hover:bg-emerald-700 text-white px-4 lg:px-5 py-2 rounded-xl text-xs lg:text-sm font-bold items-center gap-1.5 shadow-md shadow-emerald-800/20 active:scale-95 min-h-0"
            >
              <User className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">Portal Warga</span>
              <span className="lg:hidden">Admin</span>
            </a>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-emerald-50 active:scale-95 min-h-0"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? 'Tutup menu' : 'Buka menu'}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isMenuOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <X className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <Menu className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 top-16 bg-black/20 backdrop-blur-[2px] md:hidden z-40"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className="md:hidden absolute w-full bg-white border-b border-emerald-900/10 shadow-xl z-50"
            >
              <nav className="px-4 py-4 space-y-1" aria-label="Navigasi Mobile">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => navigate(link.id)}
                    aria-current={currentPage === link.id ? 'page' : undefined}
                    className={`flex w-full items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all min-h-0 ${
                      currentPage === link.id
                        ? 'bg-emerald-50 text-emerald-800 font-bold'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-emerald-800'
                    }`}
                  >
                    {link.name}
                    {currentPage === link.id && (
                      <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                    )}
                    {currentPage !== link.id && (
                      <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />
                    )}
                  </motion.button>
                ))}
              </nav>
              <div className="px-4 pb-4">
                <a
                  href="/admin"
                  className="flex w-full items-center justify-center gap-2 bg-emerald-800 hover:bg-emerald-700 text-white px-5 py-3 rounded-xl text-sm font-bold transition-all active:scale-95 min-h-0"
                >
                  <User className="w-4 h-4" />
                  Portal Warga
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
