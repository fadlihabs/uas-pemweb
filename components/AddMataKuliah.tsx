import { useEffect, useState } from "react";
import { Matkul } from "../types";

interface Props {
  userId: number;
  onSuccess: () => void;
  editData?: Matkul | null;
}

const HARI_OPTIONS = [
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
  "Minggu",
];

const AddMatkul: React.FC<Props> = ({ userId, onSuccess, editData }) => {
  const [kode, setKode] = useState("");
  const [nama, setNama] = useState("");
  const [dosen, setDosen] = useState("");
  const [sks, setSks] = useState(3);
  const [hari, setHari] = useState("Senin");
  const [jamMulai, setJamMulai] = useState("");
  const [jamSelesai, setJamSelesai] = useState("");
  const [ruangan, setRuangan] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔁 isi form saat edit
  useEffect(() => {
    if (editData) {
      setKode(editData.kode_matkul);
      setNama(editData.nama_matkul);
      setDosen(editData.dosen);
      setSks(editData.sks);
      setHari(editData.hari);
      setJamMulai(editData.jam_mulai);
      setJamSelesai(editData.jam_selesai);
      setRuangan(editData.ruangan);
    }
  }, [editData]);

  const resetForm = () => {
    setKode("");
    setNama("");
    setDosen("");
    setSks(3);
    setHari("Senin");
    setJamMulai("");
    setJamSelesai("");
    setRuangan("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!kode || !nama || !dosen || !jamMulai || !jamSelesai || !ruangan) {
      alert("Lengkapi semua field");
      return;
    }

    setLoading(true);

    const url = editData
      ? "http://localhost:8080/smart-campus-api/updateMatkul.php"
      : "http://localhost:8080/smart-campus-api/addMatkul.php";

    const payload = editData
      ? {
          id_matkul: editData.id_matkul,
          kode_matkul: kode,
          nama_matkul: nama,
          dosen,
          sks,
          hari,
          jam_mulai: jamMulai,
          jam_selesai: jamSelesai,
          ruangan,
        }
      : {
          id_user: userId,
          kode_matkul: kode,
          nama_matkul: nama,
          dosen,
          sks,
          hari,
          jam_mulai: jamMulai,
          jam_selesai: jamSelesai,
          ruangan,
        };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (json.status === "OK") {
        alert(editData ? "Mata kuliah diupdate" : "Mata kuliah ditambahkan");
        resetForm();
        onSuccess();
      } else {
        alert(json.message || "Gagal menyimpan");
      }
    } catch {
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow mb-6">
      <h2 className="font-bold text-lg mb-4">
        {editData ? "✏️ Edit Mata Kuliah" : "➕ Tambah Mata Kuliah"}
      </h2>

      <input
        className="input"
        placeholder="Kode Matkul"
        value={kode}
        onChange={(e) => setKode(e.target.value)}
      />

      <input
        className="input mt-2"
        placeholder="Nama Matkul"
        value={nama}
        onChange={(e) => setNama(e.target.value)}
      />

      <input
        className="input mt-2"
        placeholder="Dosen"
        value={dosen}
        onChange={(e) => setDosen(e.target.value)}
      />

      <input
        type="number"
        className="input mt-2"
        value={sks}
        min={1}
        onChange={(e) => setSks(Number(e.target.value))}
      />

      {/* ✅ DROPDOWN HARI (FULL SENIN–MINGGU) */}
      <select
        className="input mt-2"
        value={hari}
        onChange={(e) => setHari(e.target.value)}
      >
        {HARI_OPTIONS.map((h) => (
          <option key={h} value={h}>
            {h}
          </option>
        ))}
      </select>

      <input
        type="time"
        className="input mt-2"
        value={jamMulai}
        onChange={(e) => setJamMulai(e.target.value)}
      />

      <input
        type="time"
        className="input mt-2"
        value={jamSelesai}
        onChange={(e) => setJamSelesai(e.target.value)}
      />

      <input
        className="input mt-2"
        placeholder="Ruangan"
        value={ruangan}
        onChange={(e) => setRuangan(e.target.value)}
      />

      <button
        type="submit"
        disabled={loading}
        className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg disabled:opacity-50"
      >
        {loading ? "Menyimpan..." : editData ? "Update" : "Simpan"}
      </button>
    </form>
  );
};

export default AddMatkul;
