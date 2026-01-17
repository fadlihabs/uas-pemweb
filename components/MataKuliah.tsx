import { useEffect, useState } from "react";
import { Matkul } from "../types";
import AddMatkul from "./AddMataKuliah";

interface Props {
  userId: number;
}

const MataKuliah: React.FC<Props> = ({ userId }) => {
  const [data, setData] = useState<Matkul[]>([]);
  const [loading, setLoading] = useState(false);
  const [editData, setEditData] = useState<Matkul | null>(null);

  const loadData = async () => {
    setLoading(true);
    const res = await fetch(
      `http://localhost:8080/smart-campus-api/getMatkul.php?id_user=${userId}`
    );
    const json = await res.json();
    if (json.status === "OK") {
      setData(json.data);
    }
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Hapus mata kuliah ini?")) return;

    await fetch(
      "http://localhost:8080/smart-campus-api/deleteMatkul.php",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_matkul: id }),
      }
    );

    loadData();
  };

  useEffect(() => {
    loadData();
  }, [userId]);

  return (
    <div>
      {/* FORM TAMBAH / EDIT */}
      <AddMatkul
        userId={userId}
        editData={editData}
        onSuccess={() => {
          setEditData(null);
          loadData();
        }}
      />

      <h1 className="text-2xl font-bold mb-6">📚 Mata Kuliah</h1>

      {loading && <p>Loading...</p>}

      {data.length === 0 ? (
        <p className="text-gray-500">Belum ada mata kuliah</p>
      ) : (
        <div className="grid gap-4">
          {data.map((m) => (
            <div key={m.id_matkul} className="bg-white p-5 rounded-xl shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="font-bold text-lg">
                    {m.kode_matkul} - {m.nama_matkul}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {m.dosen} • {m.sks} SKS
                  </p>
                </div>

                <div className="flex gap-3 items-center">
                  <span className="text-sm font-semibold text-indigo-600">
                    {m.hari}
                  </span>

                  <button
                    onClick={() => setEditData(m)}
                    className="text-blue-600 text-sm hover:underline"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(m.id_matkul)}
                    className="text-red-500 text-sm hover:underline"
                  >
                    Hapus
                  </button>
                </div>
              </div>

              <div className="mt-2 text-sm text-gray-700">
                ⏰ {m.jam_mulai} - {m.jam_selesai}
                <br />
                🏫 {m.ruangan}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MataKuliah;
