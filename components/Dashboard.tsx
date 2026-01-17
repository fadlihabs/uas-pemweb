import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import AnimatedCard from "./AnimatedCard";
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  TrendingUp,
} from "lucide-react";

const COLORS = ["#6366f1", "#f59e0b", "#10b981"];

/* =========================
   TYPE
========================= */
interface DashboardData {
  tugas_selesai: number;
  tugas_mendesak: number;
  kepatuhan: number;
  total_sks: number;
}

interface TaskSummary {
  selesai: number;
  proses: number;
  belum: number;
}

interface GrafikItem {
  day: string;
  total: number;
}

/* =========================
   AMBIL USER (FIXED)
========================= */
const getLoggedUserId = (): number | null => {
  try {
    const raw = localStorage.getItem("sca_user"); // ✅ FIX
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed?.id ?? null; // ✅ FIX
  } catch {
    return null;
  }
};

const DAYS = [
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
  "Minggu",
];

const Dashboard: React.FC = () => {
  const idUser = getLoggedUserId();

  const [dashboard, setDashboard] = useState<DashboardData>({
    tugas_selesai: 0,
    tugas_mendesak: 0,
    kepatuhan: 0,
    total_sks: 0,
  });

  const [taskSummary, setTaskSummary] = useState<TaskSummary>({
    selesai: 0,
    proses: 0,
    belum: 0,
  });

  const [grafikData, setGrafikData] = useState<GrafikItem[]>([]);

  const loadDashboard = useCallback(async () => {
    if (!idUser) return;

    try {
      const dashRes = await axios.get(
        "http://localhost:8080/smart-campus-api/getDashboard.php",
        { params: { id_user: idUser } }
      );

      if (dashRes.data.status === "OK") {
        setDashboard(dashRes.data.data);
      }

      const tugasRes = await axios.get(
        "http://localhost:8080/smart-campus-api/getTugas.php",
        { params: { id_user: idUser } }
      );

      if (tugasRes.data.status === "OK") {
        const tasks = tugasRes.data.data;

        setTaskSummary({
          selesai: tasks.filter((t: any) => t.status === "selesai").length,
          proses: tasks.filter((t: any) => t.status === "proses").length,
          belum: tasks.filter((t: any) => t.status === "belum").length,
        });

        const countPerDay: Record<string, number> = {
          Senin: 0,
          Selasa: 0,
          Rabu: 0,
          Kamis: 0,
          Jumat: 0,
          Sabtu: 0,
          Minggu: 0,
        };

        tasks
          .filter((t: any) => t.status === "belum")
          .forEach((t: any) => {
            const date = new Date(t.deadline);
            const dayIndex = date.getDay();
            const dayName = DAYS[(dayIndex + 6) % 7];
            countPerDay[dayName]++;
          });

        setGrafikData(
          DAYS.map((day) => ({
            day,
            total: countPerDay[day],
          }))
        );
      }
    } catch (err) {
      console.error(err);
    }
  }, [idUser]);

  useEffect(() => {
    if (!idUser) return;
    loadDashboard();
  }, [idUser, loadDashboard]);

  if (!idUser) {
    return <div className="p-10 text-red-500">User belum login</div>;
  }

  const totalTask =
    taskSummary.selesai + taskSummary.proses + taskSummary.belum;

  const selesaiPercent =
    totalTask > 0 ? Math.round((taskSummary.selesai / totalTask) * 100) : 0;

  const taskData = [
    { name: "Selesai", value: taskSummary.selesai },
    { name: "Proses", value: taskSummary.proses },
    { name: "Belum", value: taskSummary.belum },
  ];

  return (
    <div className="space-y-8">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-800">
          Ringkasan Produktivitas
       </h1>
       <p className="text-gray-500 mt-1">
          Pantau progres akademik kamu secara real-time
       </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">

        <Stat icon={<CheckCircle2 />} label="Tugas Selesai" value={dashboard.tugas_selesai} />
        <Stat icon={<TrendingUp />} label="Kepatuhan" value={`${dashboard.kepatuhan}%`} />
        <Stat icon={<Clock />} label="Total SKS" value={`${dashboard.total_sks} SKS`} />
        <Stat icon={<AlertCircle />} label="Tugas Mendesak" value={dashboard.tugas_mendesak} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl h-80 shadow-lg">
          <p className="font-semibold mb-4">Jumlah Tugas Belum per Hari</p>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={grafikData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="total" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl h-96 flex flex-col items-center shadow-lg">

          <div className="relative w-full flex justify-center">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={taskData} dataKey="value" innerRadius={60} outerRadius={90}>
                  {taskData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <p className="text-3xl font-bold text-indigo-600">
                {selesaiPercent}%
              </p>
              <p className="text-gray-500 text-sm">Tugas Selesai</p>
            </div>
          </div>

          <div className="flex gap-6 mt-10 text-sm">
            <Legend color={COLORS[0]} label="Selesai" />
            <Legend color={COLORS[1]} label="Proses" />
            <Legend color={COLORS[2]} label="Belum" />
          </div>
        </div>
      </div>
    </div>
  );
};

const Stat = ({ icon, label, value }: any) => (
  <AnimatedCard>
    <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl flex gap-4 items-center shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="text-indigo-600">{icon}</div>
      <div>
        <p className="text-gray-500">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  </AnimatedCard>
);

const Legend = ({ color, label }: any) => (
  <div className="flex items-center gap-2">
    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
    <span>{label}</span>
  </div>
);

export default Dashboard;
