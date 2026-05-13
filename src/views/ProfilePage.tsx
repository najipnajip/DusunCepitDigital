import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { motion } from 'motion/react';
import { VillageProfile } from '../types';

const FALLBACK_PROFILE: VillageProfile = {
  historyTitle: 'Sejarah Berdirinya Dusun Cepit',
  historyParagraph1: 'Dusun Cepit pertama kali terbentuk pada awal tahun 1920-an, bermula dari sekumpulan petani yang bermigrasi mencari lahan subur di lereng bukit hijau. Nama "Cepit" sendiri diberikan oleh para sesepuh dusun sebagai doa agar seluruh penduduk yang tinggal di wilayah ini senantiasa dilimpahi kesejahteraan dan keberkahan hasil bumi.',
  historyParagraph2: 'Seiring berjalannya waktu, Dusun Cepit bertransformasi dari dusun agraris murni menjadi dusun yang adaptif terhadap teknologi tanpa meninggalkan akar budaya gotong royong. Pada tahun 2020, Dusun Cepit ditetapkan sebagai salah satu Dusun Digital percontohan yang berhasil mengintegrasikan layanan publik dengan platform modern.',
  initialArea: '97 Ha',
  quote: 'Warisan luhur untuk masa depan yang Cepit.',
  quoteAuthor: 'Sesepuh Dusun',
  vision: '"Mewujudkan Dusun Cepit yang Mandiri, Sejahtera, dan Berbasis Teknologi dengan Tetap Menjaga Kelestarian Budaya Lokal."',
  missions: [
    { title: 'Pelayanan Publik Digital', desc: 'Menyederhanakan administrasi dusun melalui sistem digital yang transparan.' },
    { title: 'Pemberdayaan UMKM', desc: 'Meningkatkan ekonomi kreatif warga melalui pelatihan dan pemasaran digital.' },
    { title: 'Infrastruktur Hijau', desc: 'Membangun sarana prasana dusun yang ramah lingkungan dan berkelanjutan.' },
    { title: 'Kualitas SDM', desc: 'Mendukung akses pendidikan dan kesehatan yang berkualitas bagi seluruh warga.' },
  ],
  headVillageName: 'Eko Susilo',
  staff: [
    { name: 'Maryanto', role: 'Ketua RW 15' },
    { name: 'Suprapto', role: 'Ketua RW 16' },
    { name: 'Parjiyanto', role: 'Ketua RT 01' },
    { name: 'Erwin Jatmiko', role: 'Ketua RT 02' },
    { name: 'Muhammad Nizar Zulmi', role: 'Ketua RT 03' },
    { name: 'Supratman', role: 'Ketua RT 04' },
    { name: 'Isti Alfiyah', role: 'Ketua PKK Padukuhan' },
    { name: 'Sudarsih', role: 'Ketua PKK Padukuhan' },
    { name: 'Tri Astuti', role: 'Ketua PKK RW 15' },
    { name: 'Nur Siwi Handayaningsih', role: 'Ketua PKK RW 16' },
    { name: 'Sendy Prasetyo', role: 'Ketua Karang Taruna RW 15' },
    { name: 'Luthfi', role: 'Ketua Karang Taruna RW 16' }
  ],
  heroImage: 'https://picsum.photos/seed/village-aerial/1920/600',
  historyImage: 'https://picsum.photos/seed/old-village/800/600',
};

const ProfilePage = () => {
  const [profile, setProfile] = useState<VillageProfile>(FALLBACK_PROFILE);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/profile?v=' + Date.now())
      .then(res => res.json())
      .then(data => {
        setProfile(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-20 pb-20"
    >
      {/* Header */}
      <section className="relative h-[400px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={profile.heroImage}
            alt="Village Aerial"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-white text-center">
          <span className="text-emerald-400 font-black uppercase tracking-widest text-xs sm:text-sm mb-3 sm:mb-4 block">Tentang Kami</span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black mb-4 sm:mb-6">Profil <span className="text-emerald-400">Dusun Cepit</span></h1>
          <p className="text-base sm:text-xl text-emerald-50/80 max-w-3xl mx-auto leading-relaxed">
            Mengenal lebih dekat sejarah, visi misi, dan struktur pemerintahan Dusun Cepit yang modern dan mandiri.
          </p>
        </div>
      </section>

      {/* History */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-emerald-600 font-black uppercase tracking-widest text-xs mb-4 block">Sejarah Kami</span>
            <h2 className="text-4xl font-black text-emerald-900 mb-8 leading-tight">{profile.historyTitle}</h2>
            <div className="space-y-6 text-slate-600 leading-relaxed">
              <p>{profile.historyParagraph1}</p>
              <p>{profile.historyParagraph2}</p>
            </div>
            <div className="mt-10 flex gap-10">
              <div>
                <p className="text-3xl font-black text-emerald-800">{profile.initialArea}</p>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Luas Wilayah</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl">
              <img
                src={profile.historyImage}
                alt="Old Village"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-3xl shadow-xl border border-slate-100 max-w-xs">
              <p className="text-emerald-800 font-bold italic text-lg mb-2">"{profile.quote}"</p>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">— {profile.quoteAuthor}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Mission */}
      <section className="bg-emerald-900 py-24 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black mb-4">Visi & Misi</h2>
            <p className="text-emerald-100/70 max-w-2xl mx-auto">Landasan utama kami dalam melayani warga dan membangun dusun yang berkelanjutan.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1 bg-white/5 backdrop-blur-sm p-12 rounded-[3rem] border border-white/10">
              <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center text-emerald-950 mb-8">
                <Star className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black mb-6">Visi</h3>
              <p className="text-xl text-emerald-50/90 italic leading-relaxed">
                {profile.vision}
              </p>
            </div>

            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
              {profile.missions.map((misi, i) => (
                <div key={i} className="bg-white/5 p-8 rounded-3xl border border-white/10 group hover:bg-emerald-500 hover:text-emerald-950 transition-all">
                  <div className="text-emerald-500 font-black text-3xl mb-4 group-hover:text-emerald-900">0{i + 1}</div>
                  <h4 className="text-lg font-bold mb-3">{misi.title}</h4>
                  <p className="text-sm opacity-70 group-hover:opacity-100">{misi.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Structure */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-emerald-600 font-black uppercase tracking-widest text-xs mb-4 block">Pemerintahan</span>
        <h2 className="text-4xl font-black text-emerald-900 mb-16">Struktur Organisasi Dusun</h2>

        <div className="flex flex-col items-center">
          {/* Kepala Dusun */}
          <div className="mb-16 relative">
            <div className="w-24 h-24 rounded-3xl bg-emerald-100 flex items-center justify-center mx-auto mb-6 shadow-sm">
              <span className="text-3xl font-black text-emerald-800 tracking-tighter">
                {getInitials(profile.headVillageName)}
              </span>
            </div>
            <h3 className="text-2xl font-black text-emerald-900">{profile.headVillageName}</h3>
            <p className="text-xs font-black text-emerald-500 uppercase tracking-widest">Kepala Dusun</p>
            <div className="w-px h-16 bg-emerald-200 mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 w-full">
            {/* RW 15 Branch */}
            <div className="space-y-10">
              <div className="bg-emerald-50/50 p-8 rounded-[3rem] border border-emerald-100">
                <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-6">Wilayah RW 15</p>
                <StaffCard
                  staff={profile.staff.find(s => s.role === 'Ketua RW 15')}
                  initials={getInitials(profile.staff.find(s => s.role === 'Ketua RW 15')?.name || '??')}
                />
                <div className="w-px h-10 bg-emerald-200 mx-auto my-4"></div>
                <div className="grid grid-cols-2 gap-4">
                  {profile.staff.filter(s => s.role === 'Ketua RT 01' || s.role === 'Ketua RT 02').map((rt, i) => (
                    <StaffCard key={i} staff={rt} compact initials={getInitials(rt.name)} />
                  ))}
                </div>
                <div className="w-px h-10 bg-emerald-200 mx-auto my-4"></div>
                <StaffCard
                  staff={profile.staff.find(s => s.role === 'Ketua Karang Taruna RW 15')}
                  compact
                  initials={getInitials(profile.staff.find(s => s.role === 'Ketua Karang Taruna RW 15')?.name || '??')}
                />
              </div>
            </div>

            {/* RW 16 Branch */}
            <div className="space-y-10">
              <div className="bg-emerald-50/50 p-8 rounded-[3rem] border border-emerald-100">
                <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-6">Wilayah RW 16</p>
                <StaffCard
                  staff={profile.staff.find(s => s.role === 'Ketua RW 16')}
                  initials={getInitials(profile.staff.find(s => s.role === 'Ketua RW 16')?.name || '??')}
                />
                <div className="w-px h-10 bg-emerald-200 mx-auto my-4"></div>
                <div className="grid grid-cols-2 gap-4">
                  {profile.staff.filter(s => s.role === 'Ketua RT 03' || s.role === 'Ketua RT 04').map((rt, i) => (
                    <StaffCard key={i} staff={rt} compact initials={getInitials(rt.name)} />
                  ))}
                </div>
                <div className="w-px h-10 bg-emerald-200 mx-auto my-4"></div>
                <StaffCard
                  staff={profile.staff.find(s => s.role === 'Ketua Karang Taruna RW 16')}
                  compact
                  initials={getInitials(profile.staff.find(s => s.role === 'Ketua Karang Taruna RW 16')?.name || '??')}
                />
              </div>
            </div>
          </div>

          {/* Other Organizations */}
          <div className="mt-16 w-full max-w-4xl mx-auto">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8">Lembaga Kemasyarakatan</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {profile.staff.filter(s => s.role === 'Ketua PKK Padukuhan').map((s, i) => (
                <StaffCard key={i} staff={s} initials={getInitials(s.name)} />
              ))}
              <StaffCard
                staff={profile.staff.find(s => s.role === 'Ketua PKK RW 15')}
                initials={getInitials(profile.staff.find(s => s.role === 'Ketua PKK RW 15')?.name || '??')}
              />
              <StaffCard
                staff={profile.staff.find(s => s.role === 'Ketua PKK RW 16')}
                initials={getInitials(profile.staff.find(s => s.role === 'Ketua PKK RW 16')?.name || '??')}
              />
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

const StaffCard = ({ staff, compact = false, initials }: { staff?: { name: string, role: string }, compact?: boolean, initials: string }) => {
  if (!staff) return null;
  return (
    <div className={`bg-white rounded-[2rem] border border-emerald-950/5 shadow-sm hover:shadow-xl transition-all group ${compact ? 'p-6' : 'p-8'}`}>
      <div className={`${compact ? 'w-12 h-12' : 'w-16 h-16'} rounded-2xl bg-emerald-50 flex items-center justify-center mb-4 mx-auto group-hover:bg-emerald-800 transition-colors`}>
        <span className={`font-black tracking-tighter ${compact ? 'text-sm' : 'text-base'} text-emerald-700 group-hover:text-white`}>
          {initials}
        </span>
      </div>
      <h4 className={`${compact ? 'text-xs' : 'text-sm'} font-black text-emerald-900 mb-1`}>{staff.name}</h4>
      <p className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">{staff.role}</p>
    </div>
  );
};

export default ProfilePage;
