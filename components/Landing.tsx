import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarDays,
  CheckSquare,
  BrainCircuit,
  MapPin,
} from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-indigo-900 to-gray-900 text-white">
      {/* ================= NAVBAR ================= */}
      <nav className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-wide">
          🎓 Smart Campus Assistant
        </h1>

        <div className="flex gap-4">
          <Link
            to="/login"
            className="px-4 py-2 rounded-lg hover:bg-white/10 transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition font-semibold"
          >
            Register
          </Link>
        </div>
      </nav>

      {/* ================= HERO ================= */}
      <section className="max-w-7xl mx-auto px-8 py-24 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-5xl font-extrabold leading-tight mb-6">
            Kelola Aktivitas Kampus <br />
            <span className="text-indigo-400">Dalam Satu Aplikasi</span>
          </h2>

          <p className="text-gray-300 text-lg mb-10">
            <b>Smart Campus Assistant</b> adalah platform terintegrasi
            untuk membantu mahasiswa mengelola mata kuliah, jadwal,
            tugas, kalender akademik, dan rencana belajar secara
            terstruktur dan efisien.
          </p>

          <div className="flex gap-4">
            <Link
              to="/login"
              className="px-8 py-4 bg-indigo-600 rounded-xl font-bold hover:bg-indigo-700 transition"
            >
              Mulai Sekarang
            </Link>
            <Link
              to="/register"
              className="px-8 py-4 border border-white/30 rounded-xl font-bold hover:bg-white/10 transition"
            >
              Buat Akun
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 bg-indigo-600/20 blur-3xl rounded-full" />
          <div className="relative bg-indigo-900/60 border border-white/10 rounded-3xl p-10 shadow-2xl">
            <p className="text-lg italic text-gray-200">
              “Fokus belajar tanpa ribet. Semua informasi akademikmu
              tersusun rapi, mudah diakses, dan selalu up-to-date.”
            </p>
            <p className="mt-6 text-indigo-400 font-semibold">
              — Smart Campus Assistant
            </p>
          </div>
        </div>
      </section>

      {/* ================= FITUR ================= */}
      <section className="max-w-7xl mx-auto px-8 py-20">
        <h3 className="text-3xl font-bold text-center mb-4">
          Mengapa Menggunakan Smart Campus Assistant?
        </h3>
        <p className="text-center text-gray-400 mb-16">
          Dirancang khusus untuk kebutuhan mahasiswa modern
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <Feature
            icon={<LayoutDashboard />}
            title="Dashboard Akademik"
            desc="Ringkasan jadwal, tugas, dan progres akademik dalam satu tampilan."
          />
          <Feature
            icon={<CalendarDays />}
            title="Kalender Akademik"
            desc="Lihat jadwal kuliah, UTS, UAS, dan agenda kampus secara visual."
          />
          <Feature
            icon={<CheckSquare />}
            title="Manajemen Tugas"
            desc="Catat deadline, prioritas, dan status tugas dengan rapi."
          />
          <Feature
            icon={<BrainCircuit />}
            title="AI Study Hub"
            desc="Bantu susun rencana belajar dan fokus materi dengan bantuan AI."
          />
          <Feature
            icon={<MapPin />}
            title="Peta Kampus"
            desc="Navigasi lokasi gedung dan fasilitas kampus dengan mudah."
          />
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-indigo-800/40 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-8 py-20 text-center">
          <h3 className="text-4xl font-bold mb-6">
            Siap Menjadi Mahasiswa yang Lebih Terorganisir?
          </h3>
          <p className="text-gray-300 mb-10">
            Mulai kelola kehidupan akademikmu dengan lebih cerdas hari ini.
          </p>

          <Link
            to="/login"
            className="inline-block px-10 py-4 bg-indigo-600 rounded-xl font-bold hover:bg-indigo-700 transition"
          >
            Masuk ke Smart Campus Assistant
          </Link>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="text-center text-sm text-gray-400 py-6">
        © {new Date().getFullYear()} Smart Campus Assistant. All rights reserved.
      </footer>
    </div>
  );
};

const Feature = ({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) => (
  <div className="bg-indigo-900/50 border border-white/10 rounded-2xl p-8 hover:scale-[1.02] transition">
    <div className="w-12 h-12 bg-indigo-600/20 rounded-xl flex items-center justify-center mb-4 text-indigo-400">
      {icon}
    </div>
    <h4 className="font-bold text-lg mb-2">{title}</h4>
    <p className="text-gray-400 text-sm">{desc}</p>
  </div>
);

export default Landing;
