// data/campusMap.ts

export interface Gedung {
  id: string;
  nama: string;
  deskripsi: string;
  fasilitas: string[];
  x: number; // posisi horizontal (%)
  y: number; // posisi vertikal (%)
}

export const GEDUNG_ITENAS: Gedung[] = [
  {
    id: "rektorat",
    nama: "Gedung Rektorat",
    deskripsi: "Pusat administrasi kampus dan kantor pimpinan.",
    fasilitas: ["WiFi", "AC", "Meeting Room"],
    x: 40,
    y: 25,
  },
  {
    id: "perpustakaan",
    nama: "Perpustakaan",
    deskripsi: "Tempat belajar dan referensi mahasiswa.",
    fasilitas: ["WiFi", "Ruang Baca", "Komputer"],
    x: 60,
    y: 40,
  },
];
