import React, { useState } from 'react';
import { 
  MapPin, 
  User, 
  Menu, 
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Page } from '../types';

interface NavbarProps {
  currentPage: Page;
  setCurrentPage: (p: Page) => void;
}

const Navbar = ({ currentPage, setCurrentPage }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks: { name: string, id: Page }[] = [
    { name: 'Beranda', id: 'home' },
    { name: 'Profil', id: 'profile' },
    { name: 'Peta Lokasi', id: 'map' },
    { name: 'Kabar Warga', id: 'news' },
    { name: 'Galeri', id: 'gallery' },
    { name: 'Kontak', id: 'contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-emerald-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => setCurrentPage('home')}>
            <div className="relative h-12 w-12 flex items-center justify-center shrink-0">
              <img 
                src="/logo.png" 
                alt="Logo Dusun Cepit" 
                className="h-full w-full object-contain drop-shadow-md"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-emerald-900 uppercase block leading-none">Dusun Cepit</span>
              <span className="text-xs font-bold text-slate-600 uppercase tracking-[0.2em]">Portal Resmi Dusun</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => setCurrentPage(link.id)}
                className={`text-base font-semibold transition-colors ${
                  currentPage === link.id 
                    ? 'text-emerald-800 underline underline-offset-8 decoration-2 font-bold' 
                    : 'text-slate-700 hover:text-emerald-800'
                }`}
              >
                {link.name}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a 
              href="/admin"
              className="hidden sm:flex bg-emerald-800 hover:bg-emerald-900 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all items-center gap-2 shadow-lg shadow-emerald-800/20 active:scale-95"
            >
              <User className="w-4 h-4" />
              Portal Warga
            </a>
            
            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden p-2 text-slate-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-emerald-900/10 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    setCurrentPage(link.id);
                    setIsMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-2 rounded-lg text-sm font-medium ${
                    currentPage === link.id 
                      ? 'bg-emerald-50 text-emerald-800 font-bold' 
                      : 'text-slate-600'
                  }`}
                >
                  {link.name}
                </button>
              ))}
              <a 
                href="/admin"
                className="w-full bg-emerald-800 text-white px-6 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2"
              >
                <User className="w-4 h-4" />
                Portal Warga
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
