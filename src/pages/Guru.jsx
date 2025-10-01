import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

export default function GuruPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [gurus, setGurus] = useState([]);
  const [form, setForm] = useState({
    nama: "",
    email: "",
    no_hp: "",
    mata_pelajaran: "",
    foto: null,
  });

  const API_URL = "http://localhost:8000/api/gurus"; // sesuaikan

  const fetchGurus = async () => {
    try {
      const res = await axios.get(API_URL);
      setGurus(res.data);
    } catch (err) {
      console.error("Gagal fetch guru:", err);
    }
  };

  useEffect(() => {
    fetchGurus();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("nama", form.nama);
      formData.append("email", form.email);
      formData.append("no_hp", form.no_hp);
      formData.append("mata_pelajaran", form.mata_pelajaran);
      if (form.foto) formData.append("foto", form.foto);

      await axios.post(API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setIsOpen(false);
      fetchGurus();
      setForm({
        nama: "",
        email: "",
        no_hp: "",
        mata_pelajaran: "",
        foto: null,
      });
    } catch (err) {
      console.error("Gagal simpan guru:", err.response?.data || err.message);
    }
  };

  return (
    <div className="p-6">
      {/* Tombol buka modal tambah guru */}
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
      >
        + Tambah Guru
      </button>

      {/* Tabel Guru */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Daftar Guru</h2>
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-2">Foto</th>
              <th className="border px-3 py-2">Nama</th>
              <th className="border px-3 py-2">Email</th>
              <th className="border px-3 py-2">No HP</th>
              <th className="border px-3 py-2">Mata Pelajaran</th>
            </tr>
          </thead>
          <tbody>
            {gurus.map((g) => (
              <tr key={g.id}>
                <td className="border px-3 py-2 text-center">
                  {g.foto ? (
                    <img
                      src={`http://localhost:8000/storage/${g.foto}`}
                      alt={g.nama}
                      className="w-16 h-16 object-cover rounded cursor-pointer"
                      onClick={() => {
                        setSelectedImage(
                          `http://localhost:8000/storage/${g.foto}`
                        );
                        setIsImageOpen(true);
                      }}
                    />
                  ) : (
                    "-"
                  )}
                </td>
                <td className="border px-3 py-2">{g.nama}</td>
                <td className="border px-3 py-2">{g.email}</td>
                <td className="border px-3 py-2">{g.no_hp}</td>
                <td className="border px-3 py-2">{g.mata_pelajaran}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Tambah Guru */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -50 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-2xl w-[420px] p-6"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Tambah Guru
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-lg"
              >
                ✖
              </button>
            </div>

            {/* Body - Form */}
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
              <input
                type="file"
                name="foto"
                accept="image/*"
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>

            {/* Footer */}
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700"
              >
                Batal
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium shadow"
              >
                Simpan
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Modal Foto Besar */}
      {isImageOpen && selectedImage && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/70 z-50"
          onClick={() => setIsImageOpen(false)}
        >
          <motion.img
            src={selectedImage}
            alt="Preview"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.3 }}
            className="max-w-3xl max-h-[90vh] rounded-xl shadow-2xl"
          />
        </div>
      )}
    </div>
  );
}
