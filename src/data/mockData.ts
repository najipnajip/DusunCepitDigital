/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { UMKMProduct, NewsItem, PopularNewsItem } from '../types';

export const UMKM_PRODUCTS: UMKMProduct[] = [
  {
    id: 1,
    name: "Set Anyaman Bambu Premium",
    category: "Kerajinan",
    price: 125000,
    seller: "Pengrajin Barokah",
    status: "Tersedia",
    image: "https://picsum.photos/seed/bamboo/400/400",
    phone: "6281234567890"
  },
  {
    id: 2,
    name: "Kopi Robusta Cepit 250g",
    category: "Kuliner",
    price: 45000,
    seller: "Kopi Tani Sejahtera",
    status: "Tersedia",
    image: "https://picsum.photos/seed/coffee/400/400",
    phone: "6281234567891"
  },
  {
    id: 3,
    name: "Kripik Tempe Aneka Rasa",
    category: "Kuliner",
    price: 15000,
    seller: "Dapur Ibu RT 03",
    status: "Tersedia",
    image: "https://picsum.photos/seed/tempeh/400/400",
    phone: "6281234567892"
  },
  {
    id: 4,
    name: "Kain Batik Tulis Motif Alam",
    category: "Fashion",
    price: 350000,
    seller: "Sanggar Seni Cepit",
    status: "Pre-order",
    image: "https://picsum.photos/seed/batik/400/400",
    phone: "6281234567893"
  },
  {
    id: 5,
    name: "Guci Keramik Hias Tangan",
    category: "Kerajinan",
    price: 85000,
    seller: "Tanah Liat Indah",
    status: "Tersedia",
    image: "https://picsum.photos/seed/pottery/400/400",
    phone: "6281234567894"
  },
  {
    id: 6,
    name: "Madu Hutan Asli Cepit",
    category: "Kuliner",
    price: 75000,
    seller: "Madu Murni Dusun",
    status: "Tersedia",
    image: "https://picsum.photos/seed/honey/400/400",
    phone: "6281234567895"
  }
];

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: 1,
    title: "Revitalisasi Balai Dusun: Ruang Kolaborasi Baru untuk Kreativitas Warga",
    category: "Sorotan Utama",
    date: "15 Juni 2024",
    excerpt: "Pemerintah dusun bersama tokoh pemuda resmi membuka wajah baru Balai Dusun Cepit yang kini dilengkapi dengan fasilitas co-working space dan perpustakaan digital.",
    image: "https://picsum.photos/seed/village/800/450"
  },
  {
    id: 2,
    title: "Warga RW 05 Kompak Bersihkan Saluran Irigasi Sawah",
    category: "Gotong Royong",
    date: "12 Juni 2024",
    excerpt: "Menyambut musim tanam, para petani dan warga bahu membahu memastikan aliran air lancar ke area persawahan warga.",
    image: "https://picsum.photos/seed/farm/600/400"
  },
  {
    id: 3,
    title: "Penyuluhan Gizi Balita: Kreasi Menu Sehat dari Hasil Bumi",
    category: "Kesehatan",
    date: "10 Juni 2024",
    excerpt: "Ibu-ibu PKK mendemonstrasikan cara mengolah jagung dan kacang-kacangan lokal menjadi MPASI bergizi tinggi.",
    image: "https://picsum.photos/seed/health/600/400"
  }
];

export const POPULAR_NEWS: PopularNewsItem[] = [
  { category: "Infrastruktur", title: "Update Pembangunan Jembatan Gantung Dusun Utara", readers: "1.2k" },
  { category: "Ekonomi", title: "Pasar Dusun Cepit Raih Penghargaan Pasar Terbersih", readers: "950" },
  { category: "Sosial", title: "Penyaluran Bantuan Air Bersih untuk Wilayah Kering", readers: "840" }
];
