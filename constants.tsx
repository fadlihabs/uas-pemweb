
import { CampusLocation } from './types';

export const DAYS = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

export const CAMPUS_LOCATIONS: CampusLocation[] = [
  {
    id: '1',
    name: 'Gedung Rektorat',
    type: 'building',
    facilities: ['WiFi', 'AC', 'Meeting Room'],
    description: 'Pusat administrasi kampus dan kantor pimpinan.',
    coordinates: { x: 50, y: 30 }
  },
  {
    id: '2',
    name: 'Perpustakaan Pusat',
    type: 'library',
    facilities: ['WiFi', 'Stop Kontak', 'AC', 'Reading Zone'],
    description: 'Koleksi buku lengkap dengan area belajar tenang.',
    coordinates: { x: 150, y: 80 }
  },
  {
    id: '3',
    name: 'Lab Terpadu Teknik',
    type: 'lab',
    facilities: ['WiFi', 'High-end PC', 'AC', 'Electronics Lab'],
    description: 'Laboratorium untuk riset dan praktikum mahasiswa teknik.',
    coordinates: { x: 250, y: 150 }
  },
  {
    id: '4',
    name: 'Kantin Utama',
    type: 'facility',
    facilities: ['WiFi', 'Area Makan Outdoor'],
    description: 'Pusat kuliner kampus dengan berbagai pilihan makanan.',
    coordinates: { x: 100, y: 200 }
  },
  {
    id: '5',
    name: 'Masjid Kampus',
    type: 'facility',
    facilities: ['AC', 'Area Wudhu'],
    description: 'Tempat ibadah utama di lingkungan kampus.',
    coordinates: { x: 300, y: 50 }
  }
];

export const ACADEMIC_EVENTS = [
  { date: '2024-05-15', title: 'Awal Perkuliahan Semester Genap', type: 'academic' },
  { date: '2024-07-10', title: 'Ujian Tengah Semester (UTS)', type: 'exam' },
  { date: '2024-08-17', title: 'Libur Hari Kemerdekaan', type: 'holiday' },
  { date: '2024-09-25', title: 'Ujian Akhir Semester (UAS)', type: 'exam' },
  { date: '2024-10-01', title: 'Libur Akhir Semester', type: 'holiday' },
];
