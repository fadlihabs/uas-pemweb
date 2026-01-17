import React, { useState } from "react";
import { MapPin, Navigation, Info } from "lucide-react";

const buildings = [
  {
    id: 20,
    name: "Gedung Elektro",
    desc: "Gedung perkuliahan dan aktivitas akademik jurusan Teknik Elektro.",
    top: "32%",
    left: "22%",
    facilities: ["Ruang Kelas", "Lab", "WiFi"],
  },
  {
    id: 18,
    name: "Gedung Geodesi",
    desc: "Gedung perkuliahan jurusan Teknik Geodesi.",
    top: "32%",
    left: "30%",
    facilities: ["Ruang Kelas", "Lab", "WiFi"],
  },
  {
    id: 14,
    name: "Gedung Fakultas",
    desc: "Gedung administrasi dan kegiatan akademik fakultas.",
    top: "24%",
    left: "32%",
    facilities: ["Administrasi", "Ruang Dosen"],
  },
  {
    id: 23,
    name: "Masjid Itenas",
    desc: "Tempat ibadah dan kegiatan keagamaan kampus.",
    top: "58%",
    left: "33%",
    facilities: ["Tempat Wudhu", "AC"],
  },
  {
    id: 13,
    name: "Gedung Serba Guna",
    desc: "Gedung acara kampus dan kegiatan besar.",
    top: "63%",
    left: "42%",
    facilities: ["Aula", "Sound System"],
  },
  {
    id: 2,
    name: "Gedung Informatika",
    desc: "Gedung perkuliahan dan praktikum jurusan Informatika.",
    top: "75%",
    left: "50%",
    facilities: ["Lab Komputer", "WiFi"],
  },
  {
    id: 24,
    name: "Cafetaria",
    desc: "Area makan dan istirahat mahasiswa.",
    top: "48%",
    left: "48%",
    facilities: ["Makanan", "Minuman", "Tempat Duduk"],
  },
];

const CampusMap: React.FC = () => {
  const [activeBuilding, setActiveBuilding] = useState<any>(null);

  return (
    <div className="flex gap-6">
      
      {/* 🗺️ MAP AREA */}
      <div className="relative flex-1 rounded-2xl overflow-hidden shadow-lg border bg-gray-100">
        <img
          src="/assets/Screenshot 2026-01-08 083307.png"
          alt="Peta Kampus"
          className="w-full h-auto"
        />

        {buildings.map((b) => (
          <button
            key={b.id}
            onClick={() => setActiveBuilding(b)}
            className="absolute -translate-x-1/2 -translate-y-full group"
            style={{ top: b.top, left: b.left }}
          >
            <MapPin
              className={`w-9 h-9 drop-shadow-lg transition ${
                activeBuilding?.id === b.id
                  ? "text-indigo-600 scale-110"
                  : "text-red-600"
              }`}
            />
          </button>
        ))}
      </div>

      {/* 📌 SIDE INFO PANEL */}
      <div className="w-[360px]">
        {!activeBuilding ? (
          <div className="h-full bg-white rounded-2xl shadow p-6 flex flex-col items-center justify-center text-gray-400">
            <Info className="w-10 h-10 mb-4" />
            <p className="text-sm text-center">
              Klik pin pada peta untuk melihat<br />informasi gedung.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl p-6 space-y-5">
            <div>
              <h2 className="text-xl font-bold">
                {activeBuilding.name}
              </h2>
              <p className="text-sm text-gray-600 mt-2">
                {activeBuilding.desc}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-500 mb-2">
                FASILITAS
              </h3>
              <div className="flex flex-wrap gap-2">
                {activeBuilding.facilities.map((f: string) => (
                  <span
                    key={f}
                    className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-medium"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>

            <button className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 transition text-white py-3 rounded-xl font-semibold">
              <Navigation className="w-5 h-5" />
              Arahkan Saya ke Sini
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CampusMap;
