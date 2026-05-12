import React, { useState } from 'react';
import { X, Send, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { supabase } from '../lib/supabase';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'aduan' | 'saran';
}

const FeedbackModal = ({ isOpen, onClose, type }: FeedbackModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    category: type === 'aduan' ? 'Infrastruktur' : 'Pembangunan Dusun',
    message: ''
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { error } = await supabase.from('feedback').insert([{ ...formData, type }]);

    if (!error) {
      alert('Terima kasih! Aspirasi Anda telah terkirim.');
      onClose();
      setFormData({ name: '', phone: '', category: type === 'aduan' ? 'Infrastruktur' : 'Pembangunan Dusun', message: '' });
    } else {
      console.error('Error submitting feedback:', error);
      alert('Gagal mengirim aspirasi. Silakan coba lagi.');
    }
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-emerald-950/60 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
      >
        <div className="flex items-center justify-between p-8 border-b border-slate-100">
          <div>
            <h3 className="text-2xl font-black text-emerald-900">
              {type === 'aduan' ? 'Kirim Aduan Online' : 'Kotak Saran Digital'}
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              {type === 'aduan' 
                ? 'Sampaikan keluhan Anda untuk perbaikan dusun.' 
                : 'Berikan saran inovatif Anda untuk kemajuan dusun.'}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-slate-400" />
          </button>
        </div>

        <form className="p-8 space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Nama Lengkap</label>
              <input 
                required 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-slate-50 border-none rounded-xl py-4 px-5 text-sm focus:ring-2 focus:ring-emerald-500" 
                placeholder="Masukkan nama Anda" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Nomor HP / WA</label>
              <input 
                required 
                type="tel" 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full bg-slate-50 border-none rounded-xl py-4 px-5 text-sm focus:ring-2 focus:ring-emerald-500" 
                placeholder="0812..." 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Kategori</label>
            <select 
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="w-full bg-slate-50 border-none rounded-xl py-4 px-5 text-sm focus:ring-2 focus:ring-emerald-500"
            >
              {type === 'aduan' ? (
                <>
                  <option>Infrastruktur</option>
                  <option>Pelayanan Publik</option>
                  <option>Keamanan & Ketertiban</option>
                  <option>Lingkungan Hidup</option>
                  <option>Lainnya</option>
                </>
              ) : (
                <>
                  <option>Pembangunan Dusun</option>
                  <option>Ekonomi & UMKM</option>
                  <option>Sosial & Budaya</option>
                  <option>Teknologi Informasi</option>
                  <option>Lainnya</option>
                </>
              )}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">
              {type === 'aduan' ? 'Isi Aduan' : 'Isi Saran'}
            </label>
            <textarea 
              required
              rows={4} 
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="w-full bg-slate-50 border-none rounded-xl py-4 px-5 text-sm focus:ring-2 focus:ring-emerald-500" 
              placeholder={type === 'aduan' ? 'Jelaskan keluhan Anda secara detail...' : 'Tuliskan saran atau ide Anda...'}
            ></textarea>
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-emerald-800 text-white py-5 rounded-2xl font-black text-lg hover:bg-emerald-900 transition-all shadow-xl shadow-emerald-800/20 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <Send className="w-6 h-6" />
            )}
            {isSubmitting ? 'Mengirim...' : 'Kirim Sekarang'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default FeedbackModal;
