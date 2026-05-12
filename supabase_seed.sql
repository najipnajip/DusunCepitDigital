-- ============================================================
-- Seed Data for Dusun Cepit Digital CMS
-- Run this AFTER supabase_schema.sql
-- ============================================================

-- UMKM PRODUCTS (from mockData.ts)
INSERT INTO umkm_products (name, category, price, seller, status, image, phone) VALUES
  ('Set Anyaman Bambu Premium', 'Kerajinan', 125000, 'Pengrajin Barokah', 'Tersedia', 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?auto=format&fit=crop&q=80&w=800', '6281234567890'),
  ('Kopi Robusta Cepit 250g', 'Kuliner', 45000, 'Kopi Tani Sejahtera', 'Tersedia', 'https://images.unsplash.com/photo-1559056191-4917a2125f37?auto=format&fit=crop&q=80&w=800', '6281234567891'),
  ('Kripik Tempe Aneka Rasa', 'Kuliner', 15000, 'Dapur Ibu RT 03', 'Tersedia', 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?auto=format&fit=crop&q=80&w=800', '6281234567892'),
  ('Kain Batik Tulis Motif Alam', 'Fashion', 350000, 'Sanggar Seni Cepit', 'Pre-order', 'https://images.unsplash.com/photo-1558171813-4c088753af8f?auto=format&fit=crop&q=80&w=800', '6281234567893'),
  ('Guci Keramik Hias Tangan', 'Kerajinan', 85000, 'Tanah Liat Indah', 'Tersedia', 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&q=80&w=800', '6281234567894'),
  ('Madu Hutan Asli Cepit', 'Kuliner', 75000, 'Madu Murni Dusun', 'Tersedia', 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=800', '6281234567895');

-- NEWS (from mockData.ts)
INSERT INTO news (title, category, date, excerpt, image) VALUES
  ('Revitalisasi Balai Dusun: Ruang Kolaborasi Baru untuk Kreativitas Warga', 'Sorotan Utama', '15 Juni 2024', 'Pemerintah dusun bersama tokoh pemuda resmi membuka wajah baru Balai Dusun Cepit yang kini dilengkapi dengan fasilitas co-working space dan perpustakaan digital.', 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=800'),
  ('Warga RW 05 Kompak Bersihkan Saluran Irigasi Sawah', 'Gotong Royong', '12 Juni 2024', 'Menyambut musim tanam, para petani dan warga bahu membahu memastikan aliran air lancar ke area persawahan warga.', 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=800'),
  ('Penyuluhan Gizi Balita: Kreasi Menu Sehat dari Hasil Bumi', 'Kesehatan', '10 Juni 2024', 'Ibu-ibu PKK mendemonstrasikan cara mengolah jagung dan kacang-kacangan lokal menjadi MPASI bergizi tinggi.', 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=800');

-- SAMPLE FEEDBACK
INSERT INTO feedback (name, phone, type, category, message) VALUES
  ('Anto Wijaya', '08123456789', 'saran', 'Infrastruktur', 'Mohon perbaikan lampu jalan di RT 04.');
