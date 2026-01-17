import { useEffect, useState } from "react";
import { Tugas } from "../types";

interface Props {
  userId: number;
}

interface MataKuliah {
  id_matkul: number;
  kode_matkul: string;
  nama_matkul: string;
}

const ITEMS_PER_PAGE = 5;

const TugasPage: React.FC<Props> = ({ userId }) => {
  const [data, setData] = useState<Tugas[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const [mataKuliah, setMataKuliah] = useState<MataKuliah[]>([]);

  const [form, setForm] = useState({
    id_matkul: "",
    judul: "",
    deskripsi: "",
    tanggal_penugasan: "",
    deadline: "",
    prioritas: "sedang",
  });

  // ===== FETCH TUGAS =====
  const fetchTugas = () => {
    setLoading(true);
    fetch(`http://localhost:8080/smart-campus-api/getTugas.php?id_user=${userId}`)
      .then(res => res.json())
      .then(json => {
        if (json.status === "OK") {
          const urut = [...json.data].sort((a: Tugas, b: Tugas) => {
            const order: any = { belum: 0, proses: 1, selesai: 2 };
            return order[a.status] - order[b.status];
          });

          setData(urut);
          setCurrentPage(1);
        }
      })
      .finally(() => setLoading(false));
  };

  // ===== FETCH MATA KULIAH =====
  const fetchMataKuliah = () => {
    fetch(`http://localhost:8080/smart-campus-api/getmatkul.php?id_user=${userId}`)
      .then(res => res.json())
      .then(json => {
        if (json.status === "OK") {
          setMataKuliah(json.data);
        }
      });
  };

  useEffect(() => {
    fetchTugas();
    fetchMataKuliah();
  }, [userId]);

  // ===== SUBMIT TAMBAH TUGAS =====
  const submitTugas = () => {
    if (!form.id_matkul) {
      alert("Pilih mata kuliah terlebih dahulu");
      return;
    }

    fetch("http://localhost:8080/smart-campus-api/addTugas.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_user: userId,
        id_matkul: form.id_matkul,
        judul: form.judul,
        deskripsi: form.deskripsi,
        tanggal_penugasan: form.tanggal_penugasan,
        deadline: form.deadline,
        prioritas: form.prioritas,
      }),
    }).then(() => {
      setForm({
        id_matkul: "",
        judul: "",
        deskripsi: "",
        tanggal_penugasan: "",
        deadline: "",
        prioritas: "sedang",
      });
      fetchTugas();
    });
  };

  // ===== TANDAI SELESAI =====
  const tandaiSelesai = (id_tugas: number) => {
    fetch("http://localhost:8080/smart-campus-api/updateStatusTugas.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_tugas }),
    }).then(() => fetchTugas());
  };

  if (loading) return <p>Loading tugas...</p>;

  // ===== PAGINATION LOGIC =====
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = data.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">📝 Tugas</h1>

      {/* ===== FORM TAMBAH TUGAS ===== */}
      <div className="bg-white p-5 rounded-xl shadow mb-6">
        <h2 className="font-bold mb-4">Tambah Tugas</h2>

        <div className="grid gap-3">
          <select
            className="border p-2 rounded"
            value={form.id_matkul}
            onChange={(e) =>
              setForm({ ...form, id_matkul: e.target.value })
            }
          >
            <option value="">-- Pilih Mata Kuliah --</option>
            {mataKuliah.map((m) => (
              <option key={m.id_matkul} value={m.id_matkul}>
                {m.kode_matkul} - {m.nama_matkul}
              </option>
            ))}
          </select>

          <input
            className="border p-2 rounded"
            placeholder="Judul Tugas"
            value={form.judul}
            onChange={(e) =>
              setForm({ ...form, judul: e.target.value })
            }
          />

          <textarea
            className="border p-2 rounded"
            placeholder="Deskripsi"
            value={form.deskripsi}
            onChange={(e) =>
              setForm({ ...form, deskripsi: e.target.value })
            }
          />

          <input
            type="datetime-local"
            className="border p-2 rounded"
            value={form.deadline}
            onChange={(e) =>
              setForm({ ...form, deadline: e.target.value })
            }
          />

          <button
            onClick={submitTugas}
            className="bg-indigo-600 text-white py-2 rounded font-semibold"
          >
            Tambah Tugas
          </button>
        </div>
      </div>

      {/* ===== LIST TUGAS ===== */}
      {currentData.length === 0 ? (
        <p className="text-gray-500">Belum ada tugas</p>
      ) : (
        <div className="grid gap-4">
          {currentData.map((t) => (
            <div key={t.id_tugas} className="bg-white p-5 rounded-xl shadow">
              <div className="flex justify-between">
                <h2 className="font-bold">{t.judul}</h2>
                <span className="text-indigo-600 text-sm font-semibold">
                  {t.mata_kuliah || t.id_matkul}
                </span>
              </div>

              <div className="mt-2 text-sm text-gray-700">
                ⏰ Deadline:{" "}
                {new Date(t.deadline).toLocaleString("id-ID", {
                  hour12: false,
                })}
                <br />
                📌 Status: {t.status}
                <br />
                🔥 Prioritas: {t.prioritas}
              </div>

              {t.status !== "selesai" && (
                <button
                  onClick={() => tandaiSelesai(t.id_tugas)}
                  className="mt-3 text-green-600 text-sm font-semibold"
                >
                  Tandai Selesai
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ===== PAGINATION ===== */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-indigo-600 text-white"
                  : "border"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => p + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default TugasPage;
