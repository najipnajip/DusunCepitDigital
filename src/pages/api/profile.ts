import type { APIRoute } from 'astro';

const FALLBACK_PROFILE = {
  historyTitle: 'Sejarah Nama Dusun Cepit',
  historyParagraph1: 'Nama Dusun Cepit berasal dari kondisi geografis wilayahnya yang berada di posisi terjepit di antara beberapa wilayah sekitar, yaitu bagian tengah, selatan gunung, utara gunung, dan timur gunung. Pada ejaan lama, nama ini ditulis sebagai "Cepit" yang merujuk pada kata "tercepit", menggambarkan letak dusun yang seolah berada di antara himpitan wilayah lain.',
  historyParagraph2: 'Seiring perkembangan bahasa dan penggunaan ejaan baru, penyebutan tersebut tetap dikenal sebagai Cepit dan menjadi identitas dusun hingga saat ini. Selain itu, terdapat nilai sejarah lokal seperti Belik Watuwondo, sebuah sumber mata air dengan susunan batu asli yang dipahat menyerupai tangga, yang menjadi bagian dari cerita budaya dan warisan masyarakat setempat.',
  initialArea: '97 Ha',
  quote: 'Guyub rukun, gemah ripah loh jinawi, masyarakat bahagia, sejahtera, mulia dunia hingga akhirat.',
  quoteAuthor: 'Tokoh Masyarakat Dusun Cepit',
  vision: 'Mewujudkan Dusun Cepit sebagai lingkungan yang harmonis, mandiri, produktif, serta berlandaskan nilai budaya, gotong royong, dan kesejahteraan masyarakat.',
  missions: [
    { title: 'Menjaga Kerukunan dan Solidaritas Warga' },
    { title: 'Melestarikan Tradisi dan Budaya Lokal' },
    { title: 'Mendorong Pertumbuhan UMKM dan Ekonomi Warga' },
    { title: 'Meningkatkan Kegiatan Sosial dan Partisipasi Masyarakat' },
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
  heroImage: '/profile.webp',
  historyImage: '/PaEko.jpg'
};

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify(FALLBACK_PROFILE), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store, max-age=0'
    }
  });
};
