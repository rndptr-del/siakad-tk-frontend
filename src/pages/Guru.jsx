import { useState, useEffect } from "react";
import api from "../services/api"; // axios instance
import Modal from "../components/Modal";

export default function GurusPage() {
  const [gurus, setGurus] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    nama: "",
    email: "",
    no_hp: "",
    mata_pelajaran: "",
  });

  // Ambil data guru dari API
  useEffect(() => {
    fetchGurus();
  }, []);

  const fetchGurus = async () => {
    try {
      const res = await api.get("/gurus");
      setGurus(res.data);
    } catch (err) {
      console.error("Gagal ambil guru:", err);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      await api.post("/gurus", form);
      setIsModalOpen(false);
      setForm({ nama: "", email: "", no_hp: "", mata_pelajaran: "" });
      fetchGurus();
    } catch (err) {
      console.error("Gagal simpan guru:", err);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Daftar Guru</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
        >
          + Tambah Guru
        </button>
      </div>

      {/* Tabel Guru */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg shadow">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2 border">Nama</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">No HP</th>
              <th className="px-4 py-2 border">Mata Pelajaran</th>
            </tr>
          </thead>
          <tbody>
            {gurus.length > 0 ? (
              gurus.map((guru) => (
                <tr key={guru.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{guru.nama}</td>
                  <td className="px-4 py-2 border">{guru.email}</td>
                  <td className="px-4 py-2 border">{guru.no_hp || "-"}</td>
                  <td className="px-4 py-2 border">{guru.mata_pelajaran || "-"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-4">
                  Belum ada data guru
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Tambah Guru */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Tambah Guru"
      >
        <div className="space-y-3">
          <input
            type="text"
            name="nama"
            placeholder="Nama"
            value={form.nama}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="text"
            name="no_hp"
            placeholder="No HP"
            value={form.no_hp}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="text"
            name="mata_pelajaran"
            placeholder="Mata Pelajaran"
            value={form.mata_pelajaran}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />

          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              Simpan
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
