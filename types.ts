export interface User {
  id: number;
  name: string;
  nim: string;
  prodi: string;
  semester: number;
  role: 'student' | 'admin';
}

export type Matkul = Course;
export type Tugas = Task;

export interface Course {
  id_matkul: number;
  kode_matkul: string;
  nama_matkul: string;
  dosen: string;
  sks: number;
  hari: string;
  jam_mulai: string;
  jam_selesai: string;
  ruangan: string;
}

export interface Task {
  id_tugas: number;
  id_matkul: number;
  judul: string;
  deskripsi: string;
  deadline: string;
  jam_deadline: string;
  status: "belum" | "proses" | "selesai";
  prioritas: "rendah" | "sedang" | "tinggi";
  mata_kuliah?: string;
}

export interface StudySession {
  id: string;
  date: string;
  duration: number;
  topic: string;
  courseId: string;
}

export interface CampusLocation {
  id: string;
  name: string;
  type: 'building' | 'lab' | 'library' | 'facility';
  facilities: string[];
  description: string;
  coordinates: { x: number; y: number };
}

export type View =
  | 'dashboard'
  | 'courses'
  | 'tasks'
  | 'smart-study'
  | 'map'
  | 'calendar'
  | 'riwayat'
  | 'admin'
  | 'profile';
