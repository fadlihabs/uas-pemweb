export type CalendarType =
  | "libur"
  | "kuliah"
  | "pembayaran"
  | "ets"
  | "eas"
  | "wisuda"
  | "perwalian"
  | "yudisium";

export interface AcademicEvent {
  date: string; // YYYY-MM-DD
  type: CalendarType;
  label: string;
}

// helper buat range tanggal
const range = (
  start: string,
  end: string,
  type: CalendarType,
  label: string
): AcademicEvent[] => {
  const res: AcademicEvent[] = [];
  let d = new Date(start);
  const e = new Date(end);

  while (d <= e) {
    res.push({
      date: d.toISOString().split("T")[0],
      type,
      label,
    });
    d.setDate(d.getDate() + 1);
  }
  return res;
};

export const academicEvents: AcademicEvent[] = [
  // =====================
  // SEPTEMBER 2025
  // =====================
  ...range("2025-09-01", "2025-09-05", "libur", "Hari Libur"),
  ...range("2025-09-06", "2025-09-11", "pembayaran", "Pembayaran Uang Kuliah"),
  {
    date: "2025-09-12",
    type: "perwalian",
    label: "Pelantikan Angkatan 2025",
  },
  ...range(
    "2025-09-12",
    "2025-09-21",
    "kuliah",
    "Kuliah Umum PKBN & P2BPT"
  ),
  ...range("2025-09-22", "2025-09-30", "kuliah", "Perkuliahan"),

  // =====================
  // OKTOBER 2025
  // =====================
  ...range("2025-10-01", "2025-10-31", "kuliah", "Perkuliahan"),
  ...range("2025-10-11", "2025-10-12", "wisuda", "Wisuda"),

  // =====================
  // NOVEMBER 2025
  // =====================
  ...range("2025-11-01", "2025-11-09", "kuliah", "Perkuliahan"),
  ...range("2025-11-10", "2025-11-15", "ets", "Evaluasi Tengah Semester"),
  ...range("2025-11-16", "2025-11-30", "kuliah", "Perkuliahan"),

  // =====================
  // DESEMBER 2025
  // =====================
  ...range("2025-12-01", "2025-12-11", "kuliah", "Perkuliahan"),
  ...range("2025-12-12", "2025-12-19", "eas", "Evaluasi Akhir Semester"),
  ...range("2025-12-20", "2025-12-31", "libur", "Hari Libur"),

  // =====================
  // JANUARI 2026
  // =====================
  ...range("2026-01-01", "2026-01-04", "libur", "Hari Libur"),
  ...range("2026-01-05", "2026-01-19", "eas", "EAS Lanjutan"),
  ...range("2026-01-20", "2026-01-25", "libur", "Hari Libur"),
  ...range(
    "2026-01-26",
    "2026-01-28",
    "perwalian",
    "Perwalian Online Semester Genap"
  ),
  ...range("2026-01-29", "2026-01-31", "libur", "Hari Libur"),

  // =====================
  // FEBRUARI 2026
  // =====================
  ...range("2026-02-01", "2026-02-02", "libur", "Hari Libur"),
  ...range(
    "2026-02-03",
    "2026-02-06",
    "pembayaran",
    "Pembayaran Uang Kuliah"
  ),
  ...range(
    "2026-02-09",
    "2026-06-06",
    "kuliah",
    "Perkuliahan Semester Genap"
  ),
  {
    date: "2026-02-27",
    type: "yudisium",
    label: "Batas Akhir Yudisium",
  },

  // =====================
  // APRIL 2026 (wisuda di tengah)
  // =====================
  ...range("2026-04-01", "2026-04-12", "kuliah", "Perkuliahan"),
  ...range("2026-04-13", "2026-04-18", "ets", "ETS Semester Genap"),
  ...range("2026-04-19", "2026-04-30", "kuliah", "Perkuliahan"),
  ...range("2026-04-11", "2026-04-12", "wisuda", "Wisuda"),

  // =====================
  // JUNI 2026
  // =====================
  ...range("2026-06-01", "2026-06-06", "kuliah", "Perkuliahan"),
  ...range("2026-06-08", "2026-06-13", "eas", "EAS Semester Genap"),
  ...range("2026-06-14", "2026-06-17", "libur", "Hari Libur"),
  ...range(
    "2026-06-18",
    "2026-06-20",
    "perwalian",
    "Perwalian Semester Pendek"
  ),
  ...range(
    "2026-06-23",
    "2026-06-25",
    "pembayaran",
    "Pembayaran Semester Pendek"
  ),

  // =====================
  // JULI 2026
  // =====================
  ...range(
    "2026-07-01",
    "2026-07-26",
    "kuliah",
    "Perkuliahan Semester Pendek"
  ),
  ...range("2026-07-27", "2026-08-01", "ets", "ETS Semester Pendek"),

  // =====================
  // AGUSTUS 2026
  // =====================
  ...range(
    "2026-08-01",
    "2026-08-22",
    "kuliah",
    "Perkuliahan Semester Pendek"
  ),
  ...range("2026-08-24", "2026-08-29", "eas", "EAS Semester Pendek"),

  // =====================
  // SEPTEMBER 2026
  // =====================
  ...range(
    "2026-09-01",
    "2026-09-30",
    "libur",
    "Tidak Ada Kegiatan Akademik"
  ),
];
