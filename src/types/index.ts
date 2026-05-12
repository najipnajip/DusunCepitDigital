/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Page = 'home' | 'profile' | 'map' | 'news' | 'gallery' | 'contact';

export interface GalleryPhoto {
  id: number;
  title: string;
  description?: string;
  image_url: string;
  category: string;
  created_at: string;
}

export interface Feedback {
  id: number;
  name: string;
  phone: string;
  type: 'aduan' | 'saran';
  category: string;
  message: string;
  created_at: string;
}

export interface UMKMProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  seller: string;
  status: 'Tersedia' | 'Pre-order';
  image: string;
  phone: string;
}

export interface NewsItem {
  id: number;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  image: string;
  content?: string;
  readers?: string;
}

export interface PopularNewsItem {
  category: string;
  title: string;
  readers: string;
}

export interface VillageProfile {
  historyTitle: string;
  historyParagraph1: string;
  historyParagraph2: string;
  formationYear?: number;
  initialArea: string;
  quote: string;
  quoteAuthor: string;
  vision: string;
  missions: { title: string; desc: string }[];
  headVillageName: string;
  staff: { name: string; role: string }[];
  heroImage: string;
  historyImage: string;
}

export interface SiteSettings {
  description: string;
  address: string;
  email: string;
  phone: string;
  population: number;
  umkmPartners: number;
  productsCount: number;
  activitiesCount: number;
}

export interface Stats {
  populasi: string;
  laki_laki: string;
  perempuan: string;
  umkm: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
