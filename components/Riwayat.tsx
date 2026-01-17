import React, { useEffect, useState } from "react";

interface RiwayatItem {
  id_tugas: number;
  judul: string;
  deskripsi: string;
  nama_matkul: string;
  prioritas: string;
  deadline: string;
  selesai_pada: string;
}

const Riwayat: React.FC = () => {
  const [data, setData] = useState<RiwayatItem[]>([]);
  const [loading, setLoading] = useState(true);

  const userRaw = localStorage.getItem("sca_user");
  const user = userRaw ? JSON.parse(userRaw) : null;

  useEffect(() => {
    if (!user?.id) return;

    fetch(
      `http://localhost:8080/smart-campus-api/getRiwayat.php?id_user=${user.id}`
    )
      .then((res) => res.json())
      .then((json) => {
        if (json.status === "OK") {
          setData(json.data);
        }
      })
      .finally(() => setLoading(false));
  }, [user?.id]);

  if (loading) return <p>Loading riwayat...</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">🕘 Riwayat Penyelesaian Tugas</h1>

      {data.length === 0 ? (
        <p className="text-gray-500">
          Belum ada tugas yang diselesaikan.
        </p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="w-full text-sm">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="p-3 text-left">Mata Kuliah</th>
                <th className="p-3 text-left">Judul</th>
                <th className="p-3 text-left">Deskripsi</th>
                <th className="p-3 text-center">Prioritas</th>
                <th className="p-3 text-center">Selesai Pada</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr
                  key={item.id_tugas}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-3 font-semibold">
                    {item.nama_matkul}
                  </td>
                  <td className="p-3">{item.judul}</td>
                  <td className="p-3 text-gray-600">
                    {item.deskripsi}
                  </td>
                  <td className="p-3 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold
                        ${
                          item.prioritas === "tinggi"
                            ? "bg-red-100 text-red-700"
                            : item.prioritas === "sedang"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                        }
                      `}
                    >
                      {item.prioritas}
                    </span>
                  </td>
                  <td className="p-3 text-center text-gray-600">
                    {new Date(item.selesai_pada).toLocaleDateString(
                      "id-ID",
                      {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      }
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Riwayat;
