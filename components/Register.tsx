import React, { useState } from "react";

interface RegisterProps {
  onBack: () => void;
}

const Register: React.FC<RegisterProps> = ({ onBack }) => {
  const [nim, setNim] = useState("");
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [prodi, setProdi] = useState("");
  const [semester, setSemester] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "http://localhost:8080/smart-campus-api/register.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nim,
            nama,
            email,
            password,
            prodi,
            semester,
          }),
        }
      );

      const data = await res.json();

      if (data.status === "OK") {
        alert("Registrasi berhasil, silakan login.");
        onBack();
      } else {
        alert(data.message);
      }
    } catch {
      alert("Gagal koneksi ke server");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-950 via-indigo-900 to-purple-900 overflow-hidden">

      {/* DOT GRID */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* GLOW */}
      <div className="absolute -top-40 -left-40 w-[400px] h-[400px] bg-indigo-500/30 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/30 rounded-full blur-[120px]" />

      {/* CARD */}
      <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-10 text-white">
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg">
            🎓
          </div>
          <h1 className="text-2xl font-bold">Registrasi Mahasiswa</h1>
          <p className="text-indigo-200 text-sm">
            Smart Campus Assistant
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          {[
            {
              placeholder: "NIM",
              value: nim,
              setter: setNim,
            },
            {
              placeholder: "Nama Lengkap",
              value: nama,
              setter: setNama,
            },
            {
              placeholder: "Email",
              value: email,
              setter: setEmail,
              type: "email",
            },
            {
              placeholder: "Password",
              value: password,
              setter: setPassword,
              type: "password",
            },
            {
              placeholder: "Program Studi",
              value: prodi,
              setter: setProdi,
            },
            {
              placeholder: "Semester",
              value: semester,
              setter: setSemester,
            },
          ].map((f, i) => (
            <div
              key={i}
              className="bg-white/10 border border-white/20 rounded-xl px-4 py-3"
            >
              <input
                type={f.type || "text"}
                placeholder={f.placeholder}
                value={f.value}
                onChange={(e) => f.setter(e.target.value)}
                className="bg-transparent outline-none w-full text-white placeholder-indigo-300"
                required
              />
            </div>
          ))}

          <button className="w-full bg-indigo-600 hover:bg-indigo-700 transition py-3 rounded-xl font-bold shadow-lg mt-4">
            Daftar
          </button>
        </form>

        <p
          onClick={onBack}
          className="mt-6 text-center text-indigo-300 cursor-pointer hover:underline text-sm"
        >
          ← Kembali ke Login
        </p>
      </div>
    </div>
  );
};

export default Register;
