import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Instagram,
  Globe,
  Home,
  Newspaper,
  Image,
  Navigation,
  MessageSquare,
} from 'lucide-react';
import { SiteSettings, Page } from '../types';

const FALLBACK_SETTINGS: SiteSettings = {
  description: 'Membangun jembatan digital antara pemerintah, warga, dan pengusaha lokal untuk masa depan yang lebih sejahtera dan terhubung.',
  address: 'Cepit, Bokoharjo, Kec. Prambanan, Kabupaten Sleman, DIY 55572',
  email: 'admin@dusuncepit.go.id',
  phone: '(0274) 123-4567',
  population: 809,
  umkmPartners: 21,
  productsCount: 350,
  activitiesCount: 12,
};

const QUICK_LINKS: { label: string; icon: React.ElementType; page: Page }[] = [
  { label: 'Beranda', icon: Home, page: 'home' },
  { label: 'Profil Dusun', icon: Globe, page: 'profile' },
  { label: 'Peta Lokasi', icon: Navigation, page: 'map' },
  { label: 'Kabar Warga', icon: Newspaper, page: 'news' },
  { label: 'Galeri', icon: Image, page: 'gallery' },
  { label: 'Kontak', icon: MessageSquare, page: 'contact' },
];

const navigateTo = (page: Page) => {
  window.dispatchEvent(new CustomEvent('navigate', { detail: page }));
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const Footer = () => {
  const [settings, setSettings] = useState<SiteSettings>(FALLBACK_SETTINGS);

  useEffect(() => {
    fetch('/api/site-settings')
      .then(res => res.json())
      .then(data => setSettings(data))
      .catch(() => {});
  }, []);

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14 pb-14 border-b border-slate-800/80">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 text-white mb-5">
              <div className="p-2 bg-emerald-800/80 rounded-xl">
                <MapPin className="w-5 h-5 text-emerald-300" />
              </div>
              <span className="text-xl font-extrabold tracking-tight uppercase">Dusun Cepit</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400 mb-6 max-w-xs">
              {settings.description}
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                aria-label="Website Pemerintah"
                className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center hover:bg-emerald-800 hover:text-white transition-all text-slate-400 min-h-0"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com/tunas_mekar15"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram Dusun Cepit"
                className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center hover:bg-pink-700 hover:text-white transition-all text-slate-400 min-h-0"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-5 text-sm uppercase tracking-widest">Menu Utama</h3>
            <ul className="space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => navigateTo(link.page)}
                    className="flex items-center gap-2.5 text-sm text-slate-400 hover:text-emerald-400 transition-colors group min-h-0 w-full text-left"
                  >
                    <link.icon className="w-3.5 h-3.5 text-slate-600 group-hover:text-emerald-500 transition-colors shrink-0" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-5 text-sm uppercase tracking-widest">Hubungi Kami</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                <span className="text-sm text-slate-400 leading-relaxed">{settings.address}</span>
              </li>
              <li>
                <a
                  href="https://instagram.com/tunas_mekar15"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 text-sm text-slate-400 hover:text-pink-400 transition-colors"
                >
                  <Instagram className="w-4 h-4 text-pink-500 shrink-0" />
                  @tunas_mekar15
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/mudamudicepit016"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 text-sm text-slate-400 hover:text-pink-400 transition-colors"
                >
                  <Instagram className="w-4 h-4 text-pink-500 shrink-0" />
                  @mudamudicepit016
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/merakitcepit"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 text-sm text-slate-400 hover:text-pink-400 transition-colors"
                >
                  <Instagram className="w-4 h-4 text-pink-500 shrink-0" />
                  @merakitcepit
                </a>
              </li>
            </ul>
          </div>

          {/* Stats */}
          <div>
            <h3 className="text-white font-bold mb-5 text-sm uppercase tracking-widest">Data Dusun</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Total Warga', value: settings.population?.toLocaleString('id-ID') ?? '809' },
                { label: 'UMKM Aktif', value: settings.umkmPartners?.toString() ?? '21' },
                { label: 'Kegiatan', value: settings.activitiesCount?.toString() ?? '12' },
                { label: 'Program', value: '4' },
              ].map((stat) => (
                <div key={stat.label} className="bg-slate-900 rounded-xl p-3">
                  <p className="text-base font-black text-emerald-400">{stat.value}</p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex items-center justify-center">
          <p className="text-xs text-slate-500 text-center">
            &copy; {new Date().getFullYear()} Pemerintah Dusun Cepit &mdash; Dikelola oleh Tim Multimedia Dusun
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
