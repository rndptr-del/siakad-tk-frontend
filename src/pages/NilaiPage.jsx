import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function NilaiPage() {
  const [nilais, setNilais] = useState([]);
  const [siswas, setSiswas] = useState([]);
  const [mapels, setMapels] = useState([]);
  const [form, setForm] = useState({
    siswa_id: "",
    mapel_id: "",
    nilai: "",
    keterangan: ""
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchNilais();
    fetchSiswas();
    fetchMapels();
  }, []);

  const fetchNilais = async () => {
    const res = await api.get("/nilais");
    setNilais(res.data);
  };

  const fetchSiswas = async () => {
    const res = await api.get("/siswas");
    setSiswas(res.data);
  };

  const fetchMapels = async () => {
    const res = await api.get("/mapels");
    setMapels(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await api.put(`/nilais/${editingId}`, form);
    } else {
      await api.post("/nilais", form);
    }
    setForm({ siswa_id: "", mapel_id: "", nilai: "", keterangan: "" });
    setEditingId(null);
    fetchNilais();
  };

  const handleEdit = (nilai) => {
    setForm({
      siswa_id: nilai.siswa_id,
      mapel_id: nilai.mapel_id,
      nilai: nilai.nilai,
      keterangan: nilai.keterangan || ""
    });
    setEditingId(nilai.id);
  };

  const handleDelete = async (id) => {
    await api.delete(`/nilais/${id}`);
    fetchNilais();
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">📊 Manajemen Nilai</h2>

      {/* Form Input */}
      <form onSubmit={handleSubmit} className="mb-6 space-y-3">
        <select
          value={form.siswa_id}
          onChange={(e) => setForm({ ...form, siswa_id: e.target.value })}
          className="border px-2 py-1 rounded w-full"
          required
        >
          <option value="">-- Pilih Siswa --</option>
          {siswas.map((s) => (
            <option key={s.id} value={s.id}>{s.nama}</option>
          ))}
        </select>

        <select
          value={form.mapel_id}
          onChange={(e) => setForm({ ...form, mapel_id: e.target.value })}
          className="border px-2 py-1 rounded w-full"
          required
        >
          <option value="">-- Pilih Mapel --</option>
          {mapels.map((m) => (
            <option key={m.id} value={m.id}>{m.nama_mapel}</option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Nilai"
          value={form.nilai}
          onChange={(e) => setForm({ ...form, nilai: e.target.value })}
          className="border px-2 py-1 rounded w-full"
          required
        />

        <input
          type="text"
          placeholder="Keterangan (opsional)"
          value={form.keterangan}
          onChange={(e) => setForm({ ...form, keterangan: e.target.value })}
          className="border px-2 py-1 rounded w-full"
        />

        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          {editingId ? "Update" : "Tambah"}
        </button>
      </form>

      {/* Tabel Nilai */}
      <table className="table-auto border-collapse border w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-3 py-2">Siswa</th>
            <th className="border px-3 py-2">Mapel</th>
            <th className="border px-3 py-2">Nilai</th>
            <th className="border px-3 py-2">Keterangan</th>
            <th className="border px-3 py-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {nilais.map((n) => (
            <tr key={n.id}>
              <td className="border px-3 py-2">{n.siswa?.nama}</td>
              <td className="border px-3 py-2">{n.mapel?.nama_mapel}</td>
              <td className="border px-3 py-2">{n.nilai}</td>
              <td className="border px-3 py-2">{n.keterangan}</td>
              <td className="border px-3 py-2 text-center">
                <button
                  onClick={() => handleEdit(n)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(n.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
