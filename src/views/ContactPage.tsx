import React from 'react';
import { motion } from 'motion/react';
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Clock,
  Navigation,
  ExternalLink,
} from 'lucide-react';

const CONTACT_INFO = [
  {
    icon: MapPin,
    label: 'Alamat',
    value: 'Cepit, Bokoharjo, Kec. Prambanan, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55572',
    subtext: 'Kantor Kepala Dusun Cepit',
    color: 'emerald',
  },
  {
    icon: Phone,
    label: 'Telepon',
    value: '(0274) 123-4567',
    subtext: 'Senin – Jumat, 08.00 – 15.00 WIB',
    color: 'blue',
    href: 'tel:02741234567',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '0812-3456-7890',
    subtext: 'Respon cepat via WhatsApp',
    color: 'green',
    href: 'https://wa.me/6281234567890',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'admin@dusuncepit.go.id',
    subtext: 'Untuk keperluan resmi & berkas',
    color: 'purple',
    href: 'mailto:admin@dusuncepit.go.id',
  },
];

const JAM_OPERASIONAL = [
  { hari: 'Senin – Kamis', jam: '08.00 – 15.00 WIB' },
  { hari: 'Jumat', jam: '08.00 – 11.30 WIB' },
  { hari: 'Sabtu', jam: '09.00 – 12.00 WIB' },
  { hari: 'Minggu & Hari Libur', jam: 'Tutup' },
];

const colorMap: Record<string, string> = {
  emerald: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  blue: 'bg-blue-50 text-blue-700 ring-blue-200',
  green: 'bg-green-50 text-green-700 ring-green-200',
  purple: 'bg-purple-50 text-purple-700 ring-purple-200',
};

const ContactPage = () => {
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
              <Navigation className="w-4 h-4" />
              Hubungi Kami
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 tracking-tight">
              Kontak &amp; <span className="text-emerald-300">Lokasi</span>
            </h1>
            <p className="text-emerald-200 text-base sm:text-lg max-w-2xl mx-auto">
              Temukan kami secara langsung atau hubungi melalui saluran komunikasi yang tersedia.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* Left: Contact Cards + Hours */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-black text-emerald-900 mb-6">Saluran Komunikasi</h2>
              <div className="space-y-4">
                {CONTACT_INFO.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel="noreferrer"
                        className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all group"
                      >
                        <div className={`p-3 rounded-xl ring-1 ${colorMap[item.color]} shrink-0`}>
                          <item.icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{item.label}</p>
                          <p className="font-bold text-slate-800 truncate group-hover:text-emerald-800 transition-colors">{item.value}</p>
                          <p className="text-xs text-slate-400 mt-0.5">{item.subtext}</p>
                        </div>
                        <ExternalLink className="w-4 h-4 text-slate-300 shrink-0 group-hover:text-emerald-600 transition-colors self-center" />
                      </a>
                    ) : (
                      <div className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
                        <div className={`p-3 rounded-xl ring-1 ${colorMap[item.color]} shrink-0`}>
                          <item.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{item.label}</p>
                          <p className="font-bold text-slate-800">{item.value}</p>
                          <p className="text-xs text-slate-400 mt-0.5">{item.subtext}</p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Jam Operasional */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-emerald-900 text-white rounded-3xl p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-emerald-800 rounded-xl">
                  <Clock className="w-5 h-5 text-emerald-300" />
                </div>
                <h3 className="font-black text-lg">Jam Operasional</h3>
              </div>
              <div className="space-y-3">
                {JAM_OPERASIONAL.map((item) => (
                  <div key={item.hari} className="flex items-center justify-between border-b border-emerald-800/50 pb-3 last:border-0 last:pb-0">
                    <span className="text-emerald-300 text-sm font-medium">{item.hari}</span>
                    <span className={`text-sm font-bold ${item.jam === 'Tutup' ? 'text-rose-400' : 'text-white'}`}>
                      {item.jam}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3 flex flex-col gap-6"
          >
            <h2 className="text-2xl font-black text-emerald-900">Lokasi Kami</h2>
            <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-200 flex-1 min-h-[450px]">
              <iframe
                title="Lokasi Dusun Cepit"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15812.33240495763!2d110.48400743696834!3d-7.7810135655445425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a5a99b16867a7%3A0x93946b4be7e7dbfe!2sCepit%2C%20Bokoharjo%2C%20Kec.%20Prambanan%2C%20Kabupaten%20Sleman%2C%20Daerah%20Istimewa%20Yogyakarta!5e0!3m2!1sid!2sid!4v1778599919147!5m2!1sid!2sid"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '450px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Directions button */}
            <a
              href="https://maps.google.com/?q=Cepit+Bokoharjo+Prambanan+Sleman+Yogyakarta"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-3 bg-emerald-800 hover:bg-emerald-900 text-white px-8 py-4 rounded-2xl font-black text-sm transition-all shadow-xl shadow-emerald-800/20 active:scale-95"
            >
              <Navigation className="w-5 h-5" />
              Buka di Google Maps
            </a>
          </motion.div>
        </div>
      </section>

      {/* CTA WhatsApp Banner */}
      <section className="bg-gradient-to-r from-emerald-800 to-emerald-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <MessageCircle className="w-12 h-12 text-emerald-300 mx-auto mb-4" />
            <h2 className="text-3xl font-black text-white mb-3">
              Ada pertanyaan? Chat kami langsung!
            </h2>
            <p className="text-emerald-200 mb-8 max-w-xl mx-auto">
              Tim kami siap membantu warga Dusun Cepit melalui WhatsApp. Respon cepat di hari kerja.
            </p>
            <a
              href="https://wa.me/6281234567890?text=Halo%20admin%20Dusun%20Cepit%2C%20saya%20ingin%20bertanya..."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-10 py-4 rounded-2xl font-black text-base transition-all shadow-2xl active:scale-95"
            >
              <MessageCircle className="w-5 h-5" />
              Chat via WhatsApp
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
