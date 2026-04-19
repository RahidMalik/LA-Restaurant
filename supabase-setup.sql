-- ──────────────────────────────────────────────────────
--  Maison Noir — Supabase Database Setup
--  Run this in: Supabase Dashboard → SQL Editor
-- ──────────────────────────────────────────────────────

-- Categories table
CREATE TABLE categories (
  id   UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  icon TEXT DEFAULT '🍽'
);

-- Menu items table
CREATE TABLE menu_items (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name         TEXT NOT NULL,
  description  TEXT,
  price        NUMERIC NOT NULL,
  category     TEXT NOT NULL,
  image_url    TEXT,
  is_available BOOLEAN DEFAULT true,
  is_featured  BOOLEAN DEFAULT false,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- Sample categories
INSERT INTO categories (name, slug, icon) VALUES
  ('Starters',  'starters',  '🌿'),
  ('Mains',     'mains',     '🍽'),
  ('Desserts',  'desserts',  '🍮'),
  ('Drinks',    'drinks',    '🥂');

-- Storage bucket for images
INSERT INTO storage.buckets (id, name, public)
VALUES ('restaurant-images', 'restaurant-images', true);

-- Allow public reads on images
CREATE POLICY "Public image access"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'restaurant-images');

-- Allow authenticated (admin) uploads
CREATE POLICY "Admin image upload"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'restaurant-images');
