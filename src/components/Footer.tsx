import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Search, 
  Mail, 
  Phone, 
  Globe, 
  ShieldCheck, 
  FileText, 
  Accessibility 
} from 'lucide-react';
import { SiteSettings } from '../types';

const FALLBACK_SETTINGS: SiteSettings = {
  description: 'Membangun jembatan digital antara pemerintah, warga, dan pengusaha lokal untuk masa depan yang lebih sejahtera dan terhubung.',
  address: 'Kantor Dusun Cepit, Jl. Raya Hijau No. 12, Gemilang',
  email: 'admin@dusunCepit.go.id',
  phone: '(0331) 456-789',
  population: 809,
  umkmPartners: 21,
  productsCount: 350,
  activitiesCount: 12,
};

const Footer = () => {
  const [settings, setSettings] = useState<SiteSettings>(FALLBACK_SETTINGS);

  useEffect(() => {
    fetch('/api/site-settings')
      .then(res => res.json())
      .then(data => setSettings(data))
      .catch((err) => console.error('[Footer] Failed to fetch site settings:', err));
  }, []);

  return (
    <footer className="bg-slate-950 text-slate-300 py-20 border-t border-slate-900 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 border-b border-slate-800 pb-16">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 text-white mb-6">
              <div className="p-1.5 bg-emerald-800 rounded-lg text-white">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold tracking-tight uppercase">Dusun Cepit</span>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              {settings.description}
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center hover:bg-emerald-800 hover:text-white transition-all">
                <Globe className="w-5 h-5" />
              </a>
              <a href={`mailto:${settings.email}`} className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center hover:bg-emerald-800 hover:text-white transition-all">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Menu Utama</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Peta Lokasi</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Berita Komunitas</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Data Penduduk</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Informasi Wisata</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Hubungi Kami</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-500 shrink-0" />
                {settings.address}
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-emerald-500 shrink-0" />
                {settings.email}
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-emerald-500 shrink-0" />
                {settings.phone}
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Cari Informasi</h4>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Cari layanan/berita..." 
                className="w-full bg-slate-800 border-none rounded-xl py-3 pl-4 pr-10 text-sm focus:ring-2 focus:ring-emerald-500"
              />
              <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" />
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm">
            © {new Date().getFullYear()} Pemerintah Dusun Cepit. Dikelola oleh Tim Multimedia Dusun.
          </p>
          <div className="flex items-center gap-6 text-xs font-bold uppercase tracking-[0.1em]">
            <a href="#" className="hover:text-white transition-colors flex items-center gap-1.5"><ShieldCheck className="w-4 h-4" /> Privasi</a>
            <a href="#" className="hover:text-white transition-colors flex items-center gap-1.5"><FileText className="w-4 h-4" /> Keamanan</a>
            <a href="#" className="hover:text-white transition-colors flex items-center gap-1.5"><Accessibility className="w-4 h-4" /> Aksesibilitas</a>
            <a 
              href="/admin"
              className="hover:text-white transition-colors flex items-center gap-1.5 text-emerald-500"
            >
              <ShieldCheck className="w-4 h-4" /> Login Admin
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
