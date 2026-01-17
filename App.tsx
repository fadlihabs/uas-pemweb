import React, { useState, useEffect } from "react";
import { User, Course, Task, View } from "./types";

import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import SmartStudy from "./components/SmartStudy";
import CampusMap from "./components/CampusMap";
import Register from "./components/Register";
import MataKuliah from "./components/MataKuliah";
import TugasPage from "./components/Tugas";
import AcademicCalendar from "./components/AcademicCalendar";
import Riwayat from "./components/Riwayat";
import Profile from "./components/Profile";


import {
  Sparkles,
  Users,
  Layers,
  ShieldCheck,
  BookOpen,
  Calendar,
  MapPin,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Hero3D from "./components/Hero3D";
import ParticlesBackground from "./components/ParticlesBackground";
import AnimatedCard from "./components/AnimatedCard";

const App: React.FC = () => {
  /* =========================
     STATE (ASLI – TIDAK DIUBAH)
  ========================= */
  const [user, setUser] = useState<User | null>(null);
  const [view, setView] = useState<View>("dashboard");
  const [courses, setCourses] = useState<Course[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isAuth, setIsAuth] = useState(false);

  const [nim, setNim] = useState("");
  const [password, setPassword] = useState("");
  const [showRegister, setShowRegister] = useState(false);
  const [showLanding, setShowLanding] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  /* =========================
     LOAD USER (AMAN)
  ========================= */
  useEffect(() => {
    const savedUser = localStorage.getItem("sca_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuth(true);
      setShowLanding(false);
    }
  }, []);

  /* =========================
     LOGIN (ASLI)
  ========================= */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `http://localhost:8080/smart-campus-api/login.php?nim=${nim}&password=${password}`
      );
      const data = await res.json();

      if (data.status === "OK") {
        const apiUser: User = {
          id: data.data.id_user,
          name: data.data.nama,
          nim: data.data.nim,
          prodi: data.data.prodi,
          semester: data.data.semester,
          role: "student",
        };

        setUser(apiUser);
        localStorage.setItem("sca_user", JSON.stringify(apiUser));
        setIsAuth(true);
        setShowLanding(false);
        setView("dashboard");
      } else {
        alert(data.message);
      }
    } catch {
      alert("Gagal koneksi ke server");
    }
  };

  /* =========================
     LOGOUT (ASLI)
  ========================= */
  const handleLogout = () => {
    localStorage.removeItem("sca_user");
    setUser(null);
    setIsAuth(false);
    setShowLanding(true);
  };

  /* =====================================================
     LANDING PAGE
  ===================================================== */
  if (!isAuth && showLanding) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative min-h-screen text-white overflow-x-hidden">
        <ParticlesBackground />
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-indigo-900 to-purple-900 opacity-95" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "26px 26px",
          }}
        />

        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-indigo-500/30 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-purple-500/30 rounded-full blur-[120px]" />

        <nav className="relative z-10 flex justify-between items-center px-12 py-6">
          <h1 className="font-bold text-xl">Smart Campus</h1>
          <div className="flex gap-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2">
            <button onClick={() => setShowLanding(false)}>Login</button>
            <button
              onClick={() => {
                setShowLanding(false);
                setShowRegister(true);
              }}
              className="bg-indigo-600 px-4 rounded-full"
            >
              Daftar
            </button>
          </div>
        </nav>

        <section className="px-12 pt-24 pb-32 max-w-6xl mx-auto">
          <div className="bg-white/7 backdrop-blur-xl border border-white/12 rounded-3xl p-8 shadow-2xl grid gap-8 md:grid-cols-2 items-center">
            <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.6 }} className="px-6 md:px-0">
              <Sparkles className="text-indigo-300 mb-4" />
              <h2 className="text-5xl md:text-6xl font-extrabold">
                Asisten Digital <br />
                <span className="text-indigo-300">Mahasiswa Modern</span>
              </h2>
              <p className="mt-6 max-w-3xl text-indigo-100">
                Kelola perkuliahan, tugas, kalender, peta kampus, dan riwayat
                akademik dalam satu platform modern dan terintegrasi.
              </p>

              <div className="mt-10 flex gap-6">
                <motion.button
                  onClick={() => setShowLanding(false)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-3 bg-indigo-600 rounded-xl font-bold shadow-xl transition-transform"
                >
                  Mulai Sekarang
                </motion.button>
                <motion.button
                  onClick={() => {
                    setShowLanding(false);
                    setShowRegister(true);
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-3 border border-indigo-300 rounded-xl"
                >
                  Daftar Akun
                </motion.button>
              </div>
            </motion.div>

            <div className="hero-foreground hidden md:block">
              <Hero3D />
            </div>
          </div>
        </section>

        <section className="px-12 pb-32 max-w-6xl mx-auto text-center">
          <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-12 shadow-xl">
            <h3 className="text-4xl font-extrabold mb-4">
              Mengapa Memilih{" "}
              <span className="text-indigo-300">Smart Campus?</span>
            </h3>
            <p className="text-indigo-100 mb-12">
              Optimalisasi yang tepat untuk pengalaman akademik yang mulus.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: <Layers />, title: "Terintegrasi" },
                { icon: <ShieldCheck />, title: "Aman" },
                { icon: <Users />, title: "User Friendly" },
                { icon: <BookOpen />, title: "Mata Kuliah" },
                { icon: <Calendar />, title: "Kalender" },
                { icon: <MapPin />, title: "Peta Kampus" },
              ].map((f, i) => (
                <AnimatedCard key={i} className="rounded-2xl">
                  <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-xl text-left">
                    <div className="text-indigo-300 mb-4">{f.icon}</div>
                    <h4 className="text-xl font-bold">{f.title}</h4>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </section>
      </motion.div>
    );
  }

  /* =====================================================
     LOGIN UI (UPGRADE – LOGIC AMAN)
  ===================================================== */
  if (!isAuth) {
    if (showRegister) {
      return <Register onBack={() => setShowRegister(false)} />;
    }

    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <ParticlesBackground />
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-indigo-900 to-purple-900 opacity-95" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-indigo-500/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/30 rounded-full blur-[120px]" />

        <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-10 text-white">
          <div className="text-center mb-8">
            <div className="mx-auto mb-4 w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg">
              🎓
            </div>
            <h1 className="text-2xl font-bold">Login Mahasiswa</h1>
            <p className="text-indigo-200 text-sm">Smart Campus</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="bg-white/10 border border-white/20 rounded-xl px-4 py-3">
              <input
                placeholder="NIM"
                value={nim}
                onChange={(e) => setNim(e.target.value)}
                className="bg-transparent outline-none w-full text-white placeholder-indigo-300 focus:ring-2 focus:ring-indigo-400/50 rounded-md"
                required
              />
            </div>

            <div className="bg-white/10 border border-white/20 rounded-xl px-4 py-3">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-transparent outline-none w-full text-white placeholder-indigo-300 focus:ring-2 focus:ring-indigo-400/50 rounded-md"
                required
              />
            </div>

            <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} className="w-full bg-indigo-600 hover:bg-indigo-700 transition py-3 rounded-xl font-bold shadow-lg">
              Login
            </motion.button>
          </form>

          <p className="text-center text-sm text-indigo-200 mt-6">
            Belum punya akun?{" "}
            <span
              onClick={() => setShowRegister(true)}
              className="text-indigo-300 font-bold cursor-pointer hover:underline"
            >
              Daftar
            </span>
          </p>
        </div>
      </motion.div>
    );
  }

  /* =====================================================
     DASHBOARD (ASLI)
  ===================================================== */
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Sidebar
        currentView={view}
        setView={setView}
        user={user}
        onLogout={handleLogout}
        isOpen={isSidebarOpen}
      />
      {/* ⬇️ TOMBOL TOGGLE SIDEBAR */}
      <button
      onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      className={`fixed top-4 z-[60] bg-indigo-600 text-white px-3 py-2 rounded-lg shadow hover:bg-indigo-700 transition-all duration-300
        ${isSidebarOpen ? "left-[17rem]" : "left-4"}
        `}
     >
      ☰
      </button>

      <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 ml-64 p-10">
        <AnimatePresence mode="wait">
          {view === "dashboard" && (
            <motion.div key="dashboard" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>
              <Dashboard />
            </motion.div>
          )}

          {view === "courses" && (
            <motion.div key="courses" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>
              <MataKuliah userId={user!.id} />
            </motion.div>
          )}

          {view === "tasks" && (
            <motion.div key="tasks" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>
              <TugasPage userId={user!.id} />
            </motion.div>
          )}

          {view === "smart-study" && (
            <motion.div key="smart-study" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>
              <SmartStudy courses={courses} tasks={tasks} />
            </motion.div>
          )}

          {view === "map" && (
            <motion.div key="map" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>
              <CampusMap />
            </motion.div>
          )}

          {view === "calendar" && (
            <motion.div key="calendar" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>
              <AcademicCalendar />
            </motion.div>
          )}

          {view === "riwayat" && (
            <motion.div key="riwayat" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>
              <Riwayat />
            </motion.div>
          )}
          {/* ⬇️⬇️⬇️ TAMBAHAN SATU-SATUNYA */}
          {view === "profile" && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
            >
              <Profile user={user!} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.main>
    </div>
  );
};

export default App;
