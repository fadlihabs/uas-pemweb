import React, { useState } from "react";
import { User } from "../types";

interface ProfileProps {
  user: User;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email && !password) {
      alert("Isi email atau password terlebih dahulu");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        "http://localhost:8080/smart-campus-api/updateUser.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id_user: user.id,
            email: email || null,
            password: password || null,
          }),
        }
      );

      const data = await res.json();

      if (data.status === "OK") {
        // 🔄 update localStorage agar sinkron
        const updatedUser = {
          ...user,
          email: email || user.email,
        };
        localStorage.setItem("sca_user", JSON.stringify(updatedUser));

        alert("Profil berhasil diperbarui");
        setEmail("");
        setPassword("");
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("Gagal koneksi ke server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl bg-white rounded-2xl p-8 shadow">
      <h1 className="text-2xl font-bold mb-6">Profil Saya</h1>

      <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
        <div>
          <p className="text-gray-500">Nama</p>
          <p className="font-semibold">{user.name}</p>
        </div>
        <div>
          <p className="text-gray-500">NIM</p>
          <p className="font-semibold">{user.nim}</p>
        </div>
        <div>
          <p className="text-gray-500">Program Studi</p>
          <p className="font-semibold">{user.prodi}</p>
        </div>
        <div>
          <p className="text-gray-500">Semester</p>
          <p className="font-semibold">{user.semester}</p>
        </div>
      </div>

      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="text-sm text-gray-600">Email Baru</label>
          <input
            type="email"
            className="w-full mt-1 border rounded-lg px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@contoh.com"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">Password Baru</label>
          <input
            type="password"
            className="w-full mt-1 border rounded-lg px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-60"
        >
          {loading ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
