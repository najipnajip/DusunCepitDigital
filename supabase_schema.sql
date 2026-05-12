-- ============================================================
-- Supabase Schema for Dusun Cepit Digital CMS
-- Run this in your Supabase SQL Editor (Dashboard > SQL Editor)
-- ============================================================

-- 1. NEWS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS news (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT DEFAULT 'Sorotan Utama',
  date TEXT,
  excerpt TEXT,
  image TEXT,
  content TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. UMKM PRODUCTS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS umkm_products (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT DEFAULT 'Kuliner',
  price INTEGER DEFAULT 0,
  seller TEXT,
  status TEXT DEFAULT 'Tersedia',
  image TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. FEEDBACK TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS feedback (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT,
  type TEXT NOT NULL CHECK (type IN ('aduan', 'saran')),
  category TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE umkm_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- NEWS POLICIES
-- Public can read all news
CREATE POLICY "Anyone can read news"
  ON news FOR SELECT
  USING (true);

-- Only authenticated admin can insert news
CREATE POLICY "Authenticated users can insert news"
  ON news FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Only authenticated admin can update news
CREATE POLICY "Authenticated users can update news"
  ON news FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Only authenticated admin can delete news
CREATE POLICY "Authenticated users can delete news"
  ON news FOR DELETE
  TO authenticated
  USING (true);

-- UMKM PRODUCTS POLICIES
-- Public can read all products
CREATE POLICY "Anyone can read products"
  ON umkm_products FOR SELECT
  USING (true);

-- Only authenticated admin can insert products
CREATE POLICY "Authenticated users can insert products"
  ON umkm_products FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Only authenticated admin can update products
CREATE POLICY "Authenticated users can update products"
  ON umkm_products FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Only authenticated admin can delete products
CREATE POLICY "Authenticated users can delete products"
  ON umkm_products FOR DELETE
  TO authenticated
  USING (true);

-- FEEDBACK POLICIES
-- Public (anonymous) can submit feedback — this is critical for the public form
CREATE POLICY "Anyone can submit feedback"
  ON feedback FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only authenticated admin can read feedback
CREATE POLICY "Authenticated users can read feedback"
  ON feedback FOR SELECT
  TO authenticated
  USING (true);

-- Only authenticated admin can delete feedback
CREATE POLICY "Authenticated users can delete feedback"
  ON feedback FOR DELETE
  TO authenticated
  USING (true);

-- ============================================================
-- AUTO-UPDATE updated_at TRIGGER
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_news_updated_at
  BEFORE UPDATE ON news
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_umkm_products_updated_at
  BEFORE UPDATE ON umkm_products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- 4. GALLERY TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS gallery (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  category TEXT DEFAULT 'Kegiatan',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

-- Anyone can read gallery
CREATE POLICY "Anyone can read gallery"
  ON gallery FOR SELECT
  USING (true);

-- Only authenticated admin can insert gallery photos
CREATE POLICY "Authenticated users can insert gallery"
  ON gallery FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Only authenticated admin can update gallery
CREATE POLICY "Authenticated users can update gallery"
  ON gallery FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Only authenticated admin can delete gallery
CREATE POLICY "Authenticated users can delete gallery"
  ON gallery FOR DELETE
  TO authenticated
  USING (true);

CREATE TRIGGER update_gallery_updated_at
  BEFORE UPDATE ON gallery
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- 5. SUPABASE STORAGE — BUCKET SETUP
-- Run these via Supabase Dashboard > Storage > New Bucket
-- OR run via SQL Editor:
-- ============================================================

-- Create public bucket for all media uploads
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true)
ON CONFLICT DO NOTHING;

-- Allow authenticated users to upload to images bucket
CREATE POLICY "Authenticated users can upload images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'images');

-- Allow authenticated users to update (overwrite) images
CREATE POLICY "Authenticated users can update images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'images');

-- Allow authenticated users to delete images
CREATE POLICY "Authenticated users can delete images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'images');

-- Allow anyone to read public images
CREATE POLICY "Anyone can view images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'images');
