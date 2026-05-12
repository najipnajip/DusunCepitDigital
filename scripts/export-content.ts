/**
 * export-content.ts
 * -------------------------------------------------------
 * Mengekstrak seluruh konten website Dusun Cepit Digital
 * dan menghasilkan file .docx yang siap dibaca.
 *
 * Jalankan dengan: npx tsx scripts/export-content.ts
 * Output         : Dusun_Cepit_Digital_Konten.docx
 */

import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  ShadingType,
  convertInchesToTwip,
  PageBreak,
} from 'docx';

// ──────────────────────────────────────────────────────────
// HELPERS
// ──────────────────────────────────────────────────────────

const ROOT = path.resolve(process.cwd());

function h1(text: string): Paragraph {
  return new Paragraph({
    text,
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 400, after: 200 },
    thematicBreak: false,
  });
}

function h2(text: string): Paragraph {
  return new Paragraph({
    text,
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 300, after: 160 },
  });
}

function h3(text: string): Paragraph {
  return new Paragraph({
    text,
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 200, after: 100 },
  });
}

function body(text: string, options?: { bold?: boolean; italic?: boolean }): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({
        text,
        size: 24,
        bold: options?.bold,
        italics: options?.italic,
        font: 'Calibri',
      }),
    ],
    spacing: { after: 120 },
  });
}

function listItem(text: string): Paragraph {
  return new Paragraph({
    text,
    bullet: { level: 0 },
    spacing: { after: 80 },
    style: 'ListParagraph',
  });
}

function separator(): Paragraph {
  return new Paragraph({
    text: '',
    thematicBreak: true,
    spacing: { before: 200, after: 200 },
  });
}

function keyValue(key: string, value: string): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({ text: `${key}: `, bold: true, size: 24, font: 'Calibri' }),
      new TextRun({ text: value, size: 24, font: 'Calibri' }),
    ],
    spacing: { after: 80 },
  });
}

function pageBreak(): Paragraph {
  return new Paragraph({ children: [new PageBreak()] });
}

// ──────────────────────────────────────────────────────────
// DATA
// ──────────────────────────────────────────────────────────

// 1. Beranda
const berandaContent = {
  judul: 'Pusat Informasi & Potensi Ekonomi Kreatif Desa',
  subjudul:
    'Portal resmi Dusun Cepit — temukan informasi warga, kabar terkini, dan lokasi dusun kami di satu tempat.',
  statistik: [
    { label: 'Populasi Dusun', nilai: '809 Jiwa' },
    { label: 'Laki-laki', nilai: '280 Jiwa' },
    { label: 'Perempuan', nilai: '529 Jiwa' },
    { label: 'Unit UMKM', nilai: '21 Unit' },
  ],
  lokasi: 'Dusun Cepit, Sewon, Bantul, DIY',
  cta: 'Punya Keluhan atau Saran? Warga dapat mengirimkan Aduan Online atau Kotak Saran Digital melalui portal ini.',
};

// 2. Profil Dusun
const profilContent = {
  sejarahJudul: 'Sejarah Berdirinya Dusun Cepit',
  sejarahP1:
    'Dusun Cepit pertama kali terbentuk pada awal tahun 1920-an, bermula dari sekumpulan petani yang bermigrasi mencari lahan subur di lereng bukit hijau. Nama "Cepit" sendiri diberikan oleh para sesepuh dusun sebagai doa agar seluruh penduduk yang tinggal di wilayah ini senantiasa dilimpahi kesejahteraan dan keberkahan hasil bumi.',
  sejarahP2:
    'Seiring berjalannya waktu, Dusun Cepit bertransformasi dari dusun agraris murni menjadi dusun yang adaptif terhadap teknologi tanpa meninggalkan akar budaya gotong royong. Pada tahun 2020, Dusun Cepit ditetapkan sebagai salah satu Dusun Digital percontohan yang berhasil mengintegrasikan layanan publik dengan platform modern.',
  tahunBerdiri: 1924,
  luasWilayah: '128 Ha',
  kutipan: '"Warisan luhur untuk masa depan yang Cepit." — Sesepuh Dusun',
  visi: '"Mewujudkan Dusun Cepit yang Mandiri, Sejahtera, dan Berbasis Teknologi dengan Tetap Menjaga Kelestarian Budaya Lokal."',
  misi: [
    {
      judul: '01. Pelayanan Publik Digital',
      deskripsi: 'Menyederhanakan administrasi dusun melalui sistem digital yang transparan.',
    },
    {
      judul: '02. Pemberdayaan UMKM',
      deskripsi:
        'Meningkatkan ekonomi kreatif warga melalui pelatihan dan pemasaran digital.',
    },
    {
      judul: '03. Infrastruktur Hijau',
      deskripsi:
        'Membangun sarana prasana dusun yang ramah lingkungan dan berkelanjutan.',
    },
    {
      judul: '04. Kualitas SDM',
      deskripsi:
        'Mendukung akses pendidikan dan kesehatan yang berkualitas bagi seluruh warga.',
    },
  ],
  kepalaGayun: 'Eko Susilo',
  pengurus: [
    { nama: 'Maryanto', jabatan: 'Ketua RW 15' },
    { nama: 'Suprapto', jabatan: 'Ketua RW 16' },
    { nama: 'Parjiyanto', jabatan: 'Ketua RT 01' },
    { nama: 'Erwin Jatmiko', jabatan: 'Ketua RT 02' },
    { nama: 'Muhammad Nizar Zulmi', jabatan: 'Ketua RT 03' },
    { nama: 'Supratman', jabatan: 'Ketua RT 04' },
    { nama: 'Isti Alfiyah', jabatan: 'Ketua PKK Padukuhan' },
    { nama: 'Sudarsih', jabatan: 'Ketua PKK Padukuhan' },
    { nama: 'Tri Astuti', jabatan: 'Ketua PKK RW 15' },
    { nama: 'Nur Siwi Handayaningsih', jabatan: 'Ketua PKK RW 16' },
    { nama: 'Sendy Prasetyo', jabatan: 'Ketua Karang Taruna RW 15' },
    { nama: 'Luthfi', jabatan: 'Ketua Karang Taruna RW 16' },
  ],
};

// 3. Berita (dari supabase_seed.sql)
const beritaContent = [
  {
    judul:
      'Revitalisasi Balai Dusun: Ruang Kolaborasi Baru untuk Kreativitas Warga',
    kategori: 'Sorotan Utama',
    tanggal: '15 Juni 2024',
    ringkasan:
      'Pemerintah dusun bersama tokoh pemuda resmi membuka wajah baru Balai Dusun Cepit yang kini dilengkapi dengan fasilitas co-working space dan perpustakaan digital.',
  },
  {
    judul: 'Warga RW 05 Kompak Bersihkan Saluran Irigasi Sawah',
    kategori: 'Gotong Royong',
    tanggal: '12 Juni 2024',
    ringkasan:
      'Menyambut musim tanam, para petani dan warga bahu membahu memastikan aliran air lancar ke area persawahan warga.',
  },
  {
    judul: 'Penyuluhan Gizi Balita: Kreasi Menu Sehat dari Hasil Bumi',
    kategori: 'Kesehatan',
    tanggal: '10 Juni 2024',
    ringkasan:
      'Ibu-ibu PKK mendemonstrasikan cara mengolah jagung dan kacang-kacangan lokal menjadi MPASI bergizi tinggi.',
  },
];

// 4. UMKM (dari supabase_seed.sql)
const umkmContent = [
  { nama: 'Set Anyaman Bambu Premium', kategori: 'Kerajinan', harga: 'Rp 125.000', penjual: 'Pengrajin Barokah', status: 'Tersedia', telepon: '6281234567890' },
  { nama: 'Kopi Robusta Cepit 250g', kategori: 'Kuliner', harga: 'Rp 45.000', penjual: 'Kopi Tani Sejahtera', status: 'Tersedia', telepon: '6281234567891' },
  { nama: 'Kripik Tempe Aneka Rasa', kategori: 'Kuliner', harga: 'Rp 15.000', penjual: 'Dapur Ibu RT 03', status: 'Tersedia', telepon: '6281234567892' },
  { nama: 'Kain Batik Tulis Motif Alam', kategori: 'Fashion', harga: 'Rp 350.000', penjual: 'Sanggar Seni Cepit', status: 'Pre-order', telepon: '6281234567893' },
  { nama: 'Guci Keramik Hias Tangan', kategori: 'Kerajinan', harga: 'Rp 85.000', penjual: 'Tanah Liat Indah', status: 'Tersedia', telepon: '6281234567894' },
  { nama: 'Madu Hutan Asli Cepit', kategori: 'Kuliner', harga: 'Rp 75.000', penjual: 'Madu Murni Dusun', status: 'Tersedia', telepon: '6281234567895' },
];

// 5. Kontak
const kontakContent = {
  alamat: 'Dusun Cepit, RT 01 / RW 02, Desa Cepit, Kec. Pandak, Bantul, DIY 55761',
  subAlamat: 'Kantor Kepala Dusun Cepit',
  telepon: '(0274) 123-4567',
  whatsapp: '0812-3456-7890',
  email: 'admin@dusuncepit.go.id',
  jamOperasional: [
    { hari: 'Senin – Kamis', jam: '08.00 – 15.00 WIB' },
    { hari: 'Jumat', jam: '08.00 – 11.30 WIB' },
    { hari: 'Sabtu', jam: '09.00 – 12.00 WIB' },
    { hari: 'Minggu & Hari Libur', jam: 'Tutup' },
  ],
};

// ──────────────────────────────────────────────────────────
// BUILD TABLE HELPERS
// ──────────────────────────────────────────────────────────

function makeTableRow(cells: string[], isHeader = false): TableRow {
  return new TableRow({
    children: cells.map(
      (text) =>
        new TableCell({
          children: [
            new Paragraph({
              children: [new TextRun({ text, bold: isHeader, size: 20, font: 'Calibri' })],
              spacing: { before: 60, after: 60 },
            }),
          ],
          margins: {
            top: convertInchesToTwip(0.05),
            bottom: convertInchesToTwip(0.05),
            left: convertInchesToTwip(0.1),
            right: convertInchesToTwip(0.1),
          },
          shading: isHeader
            ? { type: ShadingType.SOLID, color: '1a5c38', fill: '1a5c38' }
            : undefined,
        }),
    ),
    tableHeader: isHeader,
  });
}

// ──────────────────────────────────────────────────────────
// UMKM TABLE
// ──────────────────────────────────────────────────────────

function buildUmkmTable(): Table {
  const headers = ['Nama Produk', 'Kategori', 'Harga', 'Penjual', 'Status'];
  const rows = [
    makeTableRow(headers, true),
    ...umkmContent.map((p) =>
      makeTableRow([p.nama, p.kategori, p.harga, p.penjual, p.status]),
    ),
  ];
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows,
    borders: {
      top: { style: BorderStyle.SINGLE, size: 1, color: 'cccccc' },
      bottom: { style: BorderStyle.SINGLE, size: 1, color: 'cccccc' },
      left: { style: BorderStyle.SINGLE, size: 1, color: 'cccccc' },
      right: { style: BorderStyle.SINGLE, size: 1, color: 'cccccc' },
      insideH: { style: BorderStyle.SINGLE, size: 1, color: 'cccccc' },
      insideV: { style: BorderStyle.SINGLE, size: 1, color: 'cccccc' },
    },
  });
}

// Pengurus Table
function buildPengurusTable(): Table {
  const headers = ['Nama', 'Jabatan'];
  const rows = [
    makeTableRow(headers, true),
    ...profilContent.pengurus.map((p) => makeTableRow([p.nama, p.jabatan])),
  ];
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows,
    borders: {
      top: { style: BorderStyle.SINGLE, size: 1, color: 'cccccc' },
      bottom: { style: BorderStyle.SINGLE, size: 1, color: 'cccccc' },
      left: { style: BorderStyle.SINGLE, size: 1, color: 'cccccc' },
      right: { style: BorderStyle.SINGLE, size: 1, color: 'cccccc' },
      insideH: { style: BorderStyle.SINGLE, size: 1, color: 'cccccc' },
      insideV: { style: BorderStyle.SINGLE, size: 1, color: 'cccccc' },
    },
  });
}

// Jam Operasional Table
function buildJamTable(): Table {
  const headers = ['Hari', 'Jam'];
  const rows = [
    makeTableRow(headers, true),
    ...kontakContent.jamOperasional.map((j) => makeTableRow([j.hari, j.jam])),
  ];
  return new Table({
    width: { size: 60, type: WidthType.PERCENTAGE },
    rows,
    borders: {
      top: { style: BorderStyle.SINGLE, size: 1, color: 'cccccc' },
      bottom: { style: BorderStyle.SINGLE, size: 1, color: 'cccccc' },
      left: { style: BorderStyle.SINGLE, size: 1, color: 'cccccc' },
      right: { style: BorderStyle.SINGLE, size: 1, color: 'cccccc' },
      insideH: { style: BorderStyle.SINGLE, size: 1, color: 'cccccc' },
      insideV: { style: BorderStyle.SINGLE, size: 1, color: 'cccccc' },
    },
  });
}

// ──────────────────────────────────────────────────────────
// ASSEMBLE DOCUMENT
// ──────────────────────────────────────────────────────────

async function main() {
  const doc = new Document({
    creator: 'Dusun Cepit Digital',
    title: 'Konten Website Dusun Cepit Digital',
    description:
      'Dokumen ini berisi seluruh konten portal digital resmi Dusun Cepit.',
    styles: {
      paragraphStyles: [
        {
          id: 'Heading1',
          name: 'Heading 1',
          run: { size: 36, bold: true, color: '1a5c38', font: 'Calibri' },
          paragraph: { spacing: { before: 480, after: 240 } },
        },
        {
          id: 'Heading2',
          name: 'Heading 2',
          run: { size: 28, bold: true, color: '1a7a4a', font: 'Calibri' },
          paragraph: { spacing: { before: 360, after: 180 } },
        },
        {
          id: 'Heading3',
          name: 'Heading 3',
          run: { size: 24, bold: true, color: '2a9a5a', font: 'Calibri' },
          paragraph: { spacing: { before: 240, after: 120 } },
        },
        {
          id: 'ListParagraph',
          name: 'List Paragraph',
          run: { size: 24, font: 'Calibri' },
        },
      ],
    },
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: convertInchesToTwip(1),
              bottom: convertInchesToTwip(1),
              left: convertInchesToTwip(1.25),
              right: convertInchesToTwip(1.25),
            },
          },
        },
        children: [
          // ── COVER ──────────────────────────────────────
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 1440, after: 480 },
            children: [
              new TextRun({
                text: 'DUSUN CEPIT DIGITAL',
                bold: true,
                size: 56,
                color: '1a5c38',
                font: 'Calibri',
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 240 },
            children: [
              new TextRun({
                text: 'Dokumen Konten Portal Resmi',
                size: 32,
                color: '555555',
                font: 'Calibri',
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 1440 },
            children: [
              new TextRun({
                text: `Dibuat: ${new Date().toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}`,
                size: 24,
                color: '888888',
                italics: true,
                font: 'Calibri',
              }),
            ],
          }),
          separator(),
          pageBreak(),

          // ── BAB 1: BERANDA ──────────────────────────────
          h1('BAB 1: BERANDA'),
          body(berandaContent.judul, { bold: true }),
          body(berandaContent.subjudul),
          separator(),

          h2('1.1 Statistik Dusun'),
          ...berandaContent.statistik.map((s) => keyValue(s.label, s.nilai)),
          separator(),

          h2('1.2 Lokasi'),
          keyValue('Alamat', berandaContent.lokasi),
          separator(),

          h2('1.3 Layanan Warga'),
          body(berandaContent.cta),
          pageBreak(),

          // ── BAB 2: PROFIL DUSUN ──────────────────────────
          h1('BAB 2: PROFIL DUSUN'),

          h2('2.1 Sejarah'),
          h3(profilContent.sejarahJudul),
          body(profilContent.sejarahP1),
          body(profilContent.sejarahP2),
          separator(),

          h2('2.2 Data Singkat'),
          keyValue('Tahun Berdiri', String(profilContent.tahunBerdiri)),
          keyValue('Luas Wilayah Awal', profilContent.luasWilayah),
          body(profilContent.kutipan, { italic: true }),
          separator(),

          h2('2.3 Visi'),
          body(profilContent.visi, { italic: true }),
          separator(),

          h2('2.4 Misi'),
          ...profilContent.misi.flatMap((m) => [
            body(m.judul, { bold: true }),
            body(m.deskripsi),
          ]),
          separator(),

          h2('2.5 Struktur Organisasi'),
          h3(`Kepala Dusun: ${profilContent.kepalaGayun}`),
          new Paragraph({ text: '', spacing: { after: 160 } }),
          buildPengurusTable(),
          pageBreak(),

          // ── BAB 3: BERITA ────────────────────────────────
          h1('BAB 3: BERITA & INFORMASI'),
          ...beritaContent.flatMap((b, i) => [
            h2(`${i + 1}. ${b.judul}`),
            keyValue('Kategori', b.kategori),
            keyValue('Tanggal', b.tanggal),
            body(b.ringkasan),
            separator(),
          ]),
          pageBreak(),

          // ── BAB 4: UMKM ─────────────────────────────────
          h1('BAB 4: PRODUK UMKM LOKAL'),
          body(
            'Berikut adalah daftar produk UMKM yang terdaftar di portal Dusun Cepit Digital:',
          ),
          new Paragraph({ text: '', spacing: { after: 160 } }),
          buildUmkmTable(),
          pageBreak(),

          // ── BAB 5: KONTAK ────────────────────────────────
          h1('BAB 5: KONTAK & LOKASI'),

          h2('5.1 Informasi Kontak'),
          keyValue('Alamat', kontakContent.alamat),
          keyValue('Keterangan', kontakContent.subAlamat),
          keyValue('Telepon', kontakContent.telepon),
          keyValue('WhatsApp', kontakContent.whatsapp),
          keyValue('Email', kontakContent.email),
          separator(),

          h2('5.2 Jam Operasional'),
          new Paragraph({ text: '', spacing: { after: 160 } }),
          buildJamTable(),
          new Paragraph({ text: '', spacing: { after: 240 } }),
          separator(),

          // ── PENUTUP ──────────────────────────────────────
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 960 },
            children: [
              new TextRun({
                text: '— Dusun Cepit Digital —',
                size: 24,
                bold: true,
                color: '1a5c38',
                font: 'Calibri',
                italics: true,
              }),
            ],
          }),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  const outPath = path.join(ROOT, 'Dusun_Cepit_Digital_Konten.docx');
  writeFileSync(outPath, buffer);
  console.log(`\n✅ File berhasil dibuat: ${outPath}\n`);
}

main().catch((err) => {
  console.error('❌ Error:', err);
  process.exit(1);
});
