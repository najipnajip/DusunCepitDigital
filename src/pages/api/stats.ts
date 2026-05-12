import type { APIRoute } from 'astro';

const FALLBACK_STATS = {
  populasi: 809,
  laki_laki: 280,
  perempuan: 529,
  umkm: 21,
};

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify(FALLBACK_STATS), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600'
    }
  });
};
