import React, { useState } from "react";

/* =========================
   TYPE
========================= */
type EventType =
  | "kuliah"
  | "libur"
  | "uts"
  | "uas"
  | "wisuda"
  | "pembayaran"
  | "perwalian"
  | "yudisium"
  | "none";

interface DayEvent {
  date: string; // YYYY-MM-DD
  type: EventType;
  label: string;
}

/* =========================
   HELPER RANGE
========================= */
function range(
  start: string,
  end: string,
  type: EventType,
  label: string
): DayEvent[] {
  const res: DayEvent[] = [];
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
}

/* =========================
   DATA KALENDER
========================= */
const events: DayEvent[] = [
  ...range("2025-09-01", "2025-09-05", "libur", "Hari Libur"),
  ...range("2025-09-06", "2025-09-11", "pembayaran", "Pembayaran Uang Kuliah"),
  { date: "2025-09-12", type: "perwalian", label: "Pelantikan Angkatan 2025" },
  ...range("2025-09-12", "2025-09-21", "kuliah", "Kuliah Umum PKBN & P2BPT"),
  ...range("2025-09-22", "2025-09-30", "kuliah", "Perkuliahan"),

  ...range("2025-10-01", "2025-10-31", "kuliah", "Perkuliahan"),
  ...range("2025-10-11", "2025-10-12", "wisuda", "Wisuda"),

  ...range("2025-11-01", "2025-11-09", "kuliah", "Perkuliahan"),
  ...range("2025-11-10", "2025-11-15", "uts", "Evaluasi Tengah Semester"),
  ...range("2025-11-16", "2025-11-30", "kuliah", "Perkuliahan"),

  ...range("2025-12-01", "2025-12-11", "kuliah", "Perkuliahan"),
  ...range("2025-12-12", "2025-12-19", "uas", "Evaluasi Akhir Semester"),
  ...range("2025-12-20", "2025-12-31", "libur", "Hari Libur"),

  ...range("2026-01-01", "2026-01-04", "libur", "Hari Libur"),
  ...range("2026-01-05", "2026-01-19", "uas", "EAS Lanjutan"),
  ...range("2026-01-20", "2026-01-25", "libur", "Hari Libur"),
  ...range("2026-01-26", "2026-01-28", "perwalian", "Perwalian Online"),
  ...range("2026-01-29", "2026-01-31", "libur", "Hari Libur"),

  ...range("2026-02-01", "2026-02-02", "libur", "Hari Libur"),
  ...range("2026-02-03", "2026-02-06", "pembayaran", "Pembayaran Uang Kuliah"),
  ...range("2026-02-09", "2026-06-06", "kuliah", "Perkuliahan Semester Genap"),
  { date: "2026-02-27", type: "yudisium", label: "Batas Akhir Yudisium" },

  ...range("2026-04-13", "2026-04-18", "uts", "UTS Semester Genap"),
  ...range("2026-04-11", "2026-04-12", "wisuda", "Wisuda"),

  ...range("2026-06-08", "2026-06-13", "uas", "UAS Semester Genap"),
  ...range("2026-06-14", "2026-06-17", "libur", "Hari Libur"),
  ...range("2026-06-18", "2026-06-20", "perwalian", "Perwalian Semester Pendek"),
  ...range("2026-06-23", "2026-06-25", "pembayaran", "Pembayaran Semester Pendek"),

  ...range("2026-07-01", "2026-07-26", "kuliah", "Perkuliahan Semester Pendek"),
  ...range("2026-07-27", "2026-08-01", "uts", "UTS Semester Pendek"),
  ...range("2026-08-01", "2026-08-22", "kuliah", "Perkuliahan Semester Pendek"),
  ...range("2026-08-24", "2026-08-29", "uas", "UAS Semester Pendek"),

  ...range("2026-09-01", "2026-09-30", "libur", "Tidak Ada Kegiatan Akademik"),
];

/* =========================
   WARNA
========================= */
const eventColor: Record<EventType, string> = {
  kuliah: "bg-green-500 text-white",
  libur: "bg-red-500 text-white",
  uts: "bg-yellow-400 text-black",
  uas: "bg-blue-500 text-white",
  wisuda: "bg-gray-800 text-white",
  pembayaran: "bg-purple-500 text-white",
  perwalian: "bg-orange-500 text-white",
  yudisium: "bg-gray-300 text-black",
  none: "bg-white",
};

const months = [
  { year: 2025, month: 8 },
  { year: 2025, month: 9 },
  { year: 2025, month: 10 },
  { year: 2025, month: 11 },
  { year: 2026, month: 0 },
  { year: 2026, month: 1 },
  { year: 2026, month: 2 },
  { year: 2026, month: 3 },
  { year: 2026, month: 4 },
  { year: 2026, month: 5 },
  { year: 2026, month: 6 },
  { year: 2026, month: 7 },
  { year: 2026, month: 8 },
];

const dayNames = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

/* =========================
   HELPER INITIAL PAGE
========================= */
const getInitialPage = () => {
  const now = new Date();
  const y = now.getFullYear();
  const m = now.getMonth();

  const index = months.findIndex(
    (item) => item.year === y && item.month === m
  );

  return index === -1 ? 0 : index;
};

/* =========================
   COMPONENT
========================= */
const AcademicCalendar: React.FC = () => {
  const [selected, setSelected] = useState<DayEvent | null>(null);
  const [hovered, setHovered] = useState<DayEvent | null>(null);

  const [page, setPage] = useState(getInitialPage());
  const totalPages = months.length;
  const { year, month } = months[page];

  const today = new Date().toISOString().split("T")[0];
  const getEvent = (date: string) => events.find((e) => e.date === date);

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold">📆 Kalender Akademik 2025 / 2026</h1>

      <div className="flex justify-between items-center">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 0))}
          disabled={page === 0}
          className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50"
        >
          ← Sebelumnya
        </button>

        <h2 className="font-bold text-lg">
          {firstDay.toLocaleString("id-ID", {
            month: "long",
            year: "numeric",
          })}
        </h2>

        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
          disabled={page === totalPages - 1}
          className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50"
        >
          Berikutnya →
        </button>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <div className="grid grid-cols-7 gap-2 text-center mb-2">
          {dayNames.map((d) => (
            <div key={d} className="font-semibold text-gray-500">
              {d}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {Array(firstDay.getDay()).fill(null).map((_, i) => (
            <div key={i} />
          ))}

          {Array.from({ length: lastDay.getDate() }, (_, i) => {
            const day = i + 1;
            const date = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
            const ev = getEvent(date);
            const isToday = date === today;

            return (
              <div
                key={date}
                onClick={() => ev && setSelected(ev)}
                onMouseEnter={() => ev && setHovered(ev)}
                onMouseLeave={() => setHovered(null)}
                className={`relative cursor-pointer rounded-lg p-2 text-sm transition
                  ${
                    isToday
                      ? "bg-amber-700 text-white"
                      : ev
                      ? eventColor[ev.type]
                      : "bg-gray-100"
                  }`}
              >
                {day}

                {hovered?.date === date && (
                  <div className="absolute z-20 -top-10 left-1/2 -translate-x-1/2
                    bg-white text-gray-800 text-xs px-3 py-1 rounded shadow border whitespace-nowrap">
                    {hovered.label}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {selected && (
        <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-xl">
          <h3 className="font-bold">📌 Detail Tanggal</h3>
          <p className="mt-2">
            <b>{selected.date}</b> — {selected.label}
          </p>
        </div>
      )}
    </div>
  );
};

export default AcademicCalendar;
