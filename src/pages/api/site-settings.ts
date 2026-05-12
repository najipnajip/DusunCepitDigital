import type { APIRoute } from 'astro';

const FALLBACK_SETTINGS = {
  description: 'Membangun jembatan digital antara pemerintah, warga, dan pengusaha lokal untuk masa depan yang lebih sejahtera dan terhubung.',
  address: 'Cepit, Bokoharjo, Kec. Prambanan, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55572',
  email: 'admin@dusunCepit.go.id',
  phone: '(0331) 456-789',
  population: 809,
  umkmPartners: 21,
  productsCount: 350,
  activitiesCount: 12,
};

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify(FALLBACK_SETTINGS), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600'
    }
  });
};
