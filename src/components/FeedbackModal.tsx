import React, { useState } from 'react';
import { X, Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../lib/supabase';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'aduan' | 'saran';
}

type Status = 'idle' | 'submitting' | 'success' | 'error';

const FeedbackModal = ({ isOpen, onClose, type }: FeedbackModalProps) => {
  const [status, setStatus] = useState<Status>('idle');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    category: type === 'aduan' ? 'Infrastruktur' : 'Pembangunan Dusun',
    message: ''
  });

  if (!isOpen) return null;

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      category: type === 'aduan' ? 'Infrastruktur' : 'Pembangunan Dusun',
      message: '',
    });
    setStatus('idle');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.message.trim().length < 10) return;
    setStatus('submitting');

    const { error } = await supabase.from('feedback').insert([{ ...formData, type }]);

    if (!error) {
      setStatus('success');
      setFormData({ name: '', phone: '', category: type === 'aduan' ? 'Infrastruktur' : 'Pembangunan Dusun', message: '' });
      setTimeout(() => {
        handleClose();
      }, 2200);
    } else {
      console.error('Error submitting feedback:', error);
      setStatus('error');
    }
  };

  const inputClass = 'w-full bg-slate-50 border border-slate-200 focus:border-emerald-400 rounded-xl py-3.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all placeholder:text-slate-400';

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
        className="absolute inset-0 bg-emerald-950/60 backdrop-blur-sm"
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 60, scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        className="relative w-full sm:max-w-lg bg-white rounded-t-[2rem] sm:rounded-[2rem] shadow-2xl overflow-hidden max-h-[95dvh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Drag indicator (mobile) */}
        <div className="sm:hidden flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 bg-slate-200 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-start justify-between px-6 py-5 border-b border-slate-100">
          <div>
            <h2 id="modal-title" className="text-xl font-black text-emerald-900">
              {type === 'aduan' ? 'Kirim Aduan Online' : 'Kotak Saran Digital'}
            </h2>
            <p className="text-sm text-slate-500 mt-0.5">
              {type === 'aduan'
                ? 'Sampaikan keluhan Anda untuk perbaikan dusun.'
                : 'Berikan saran inovatif Anda untuk kemajuan dusun.'}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 ml-3 shrink-0 min-h-0"
            aria-label="Tutup dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success/Error Toast */}
        <AnimatePresence>
          {(status === 'success' || status === 'error') && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`mx-6 mt-4 rounded-2xl flex items-center gap-3 px-4 py-3.5 text-sm font-semibold ${
                status === 'success'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}
            >
              {status === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
              )}
              {status === 'success'
                ? 'Terima kasih! Aspirasi Anda telah terkirim.'
                : 'Gagal mengirim. Silakan coba lagi.'}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form */}
        <form className="px-6 py-5 space-y-4" onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="fb-name" className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                Nama Lengkap <span className="text-red-400">*</span>
              </label>
              <input
                id="fb-name"
                required
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={inputClass}
                placeholder="Nama Anda"
                autoComplete="name"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="fb-phone" className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                No. HP / WA <span className="text-red-400">*</span>
              </label>
              <input
                id="fb-phone"
                required
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={inputClass}
                placeholder="0812..."
                autoComplete="tel"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="fb-category" className="text-xs font-bold text-slate-500 uppercase tracking-widest">
              Kategori
            </label>
            <select
              id="fb-category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className={inputClass}
            >
              {type === 'aduan' ? (
                <>
                  <option>Infrastruktur</option>
                  <option>Pelayanan Publik</option>
                  <option>Keamanan &amp; Ketertiban</option>
                  <option>Lingkungan Hidup</option>
                  <option>Lainnya</option>
                </>
              ) : (
                <>
                  <option>Pembangunan Dusun</option>
                  <option>Ekonomi &amp; UMKM</option>
                  <option>Sosial &amp; Budaya</option>
                  <option>Teknologi Informasi</option>
                  <option>Lainnya</option>
                </>
              )}
            </select>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="fb-message" className="text-xs font-bold text-slate-500 uppercase tracking-widest">
              {type === 'aduan' ? 'Isi Aduan' : 'Isi Saran'} <span className="text-red-400">*</span>
            </label>
            <textarea
              id="fb-message"
              required
              minLength={10}
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className={`${inputClass} resize-none`}
              placeholder={
                type === 'aduan'
                  ? 'Jelaskan keluhan Anda secara detail (min. 10 karakter)...'
                  : 'Tuliskan saran atau ide Anda (min. 10 karakter)...'
              }
            />
            <p className={`text-xs text-right transition-colors ${formData.message.length > 0 && formData.message.length < 10 ? 'text-red-400' : 'text-slate-400'}`}>
              {formData.message.length} karakter {formData.message.length < 10 ? `(min. 10)` : '✓'}
            </p>
          </div>

          <button
            type="submit"
            disabled={status === 'submitting' || status === 'success'}
            className="w-full bg-emerald-800 text-white py-4 rounded-2xl font-black text-base hover:bg-emerald-700 active:scale-[0.98] transition-all shadow-lg shadow-emerald-800/20 flex items-center justify-center gap-2.5 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === 'submitting' ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Mengirim...</>
            ) : status === 'success' ? (
              <><CheckCircle2 className="w-5 h-5" /> Terkirim!</>
            ) : (
              <><Send className="w-5 h-5" /> Kirim Sekarang</>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default FeedbackModal;
