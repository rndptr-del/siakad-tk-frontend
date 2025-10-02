import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import api from "../services/api";
import Modal from "../components/Modal";

export default function MapelPage() {
  const [mapels, setMapels] = useState([]);
  const [gurus, setGurus] = useState([]);
  const [kelas, setKelas] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [form, setForm] = useState({
    id: null,
    nama_mapel: "",
    guru_id: "",
    kelas_id: "",
  });

  // Ambil data mapel
  const fetchMapel = async () => {
    const res = await api.get("/mapels");
    setMapels(res.data);
  };

  // Ambil data guru & kelas
  const fetchRelasi = async () => {
    const resGuru = await api.get("/gurus");
    const resKelas = await api.get("/kelas");
    setGurus(resGuru.data);
    setKelas(resKelas.data);
  };

  useEffect(() => {
    fetchMapel();
    fetchRelasi();
  }, []);

  // Handler input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Tambah mapel
  const handleAdd = () => {
    setEditMode(false);
    setForm({ id: null, nama_mapel: "", guru_id: "", kelas_id: "" });
    setIsModalOpen(true);
  };

  // Edit mapel
  const handleEdit = (mapel) => {
    setEditMode(true);
    setForm({
      id: mapel.id,
      nama_mapel: mapel.nama_mapel,
      guru_id: mapel.guru_id,
      kelas_id: mapel.kelas_id,
    });
    setIsModalOpen(true);
  };

  // Simpan (POST / PUT)
  const handleSubmit = async () => {
    try {
      if (editMode) {
        await api.put(`/mapels/${form.id}`, form);
      } else {
        await api.post("/mapels", form);
      }
      setIsModalOpen(false);
      fetchMapel();
    } catch (err) {
      console.error(err);
    }
  };

  // Hapus
  const handleDelete = async (id) => {
    if (confirm("Yakin ingin menghapus data ini?")) {
      await api.delete(`/mapels/${id}`);
      fetchMapel();
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">📖 Data Mapel</h2>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
        >
          <Plus size={18} /> Tambah Mapel
        </button>
      </div>

      {/* Tabel */}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-100 text-gray-700">
              <th className="p-3 border">ID</th>
              <th className="p-3 border">Nama Mapel</th>
              <th className="p-3 border">Guru</th>
              <th className="p-3 border">Kelas</th>
              <th className="p-3 border text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {mapels.map((m, index) => (
              <tr key={m.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="p-3 border">{m.id}</td>
                <td className="p-3 border">{m.nama_mapel}</td>
                <td className="p-3 border">{m.guru?.nama || "-"}</td>
                <td className="p-3 border">{m.kelas?.nama_kelas || "-"}</td>
                <td className="p-3 border text-center flex justify-center gap-2">
                  <button
                    onClick={() => handleEdit(m)}
                    className="flex items-center gap-1 bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    <Pencil size={16} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(m.id)}
                    className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                  >
                    <Trash2 size={16} /> Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Form */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editMode ? "✏️ Edit Mapel" : "➕ Tambah Mapel"}
      >
        <div className="space-y-3">
          <input
            type="text"
            name="nama_mapel"
            placeholder="Nama Mapel"
            value={form.nama_mapel}
            onChange={handleChange}
            className="w-full border p-2 rounded focus:ring focus:ring-blue-300"
          />

          <select
            name="guru_id"
            value={form.guru_id}
            onChange={handleChange}
            className="w-full border p-2 rounded focus:ring focus:ring-blue-300"
          >
            <option value="">-- Pilih Guru --</option>
            {gurus.map((g) => (
              <option key={g.id} value={g.id}>
                {g.nama}
              </option>
            ))}
          </select>

          <select
            name="kelas_id"
            value={form.kelas_id}
            onChange={handleChange}
            className="w-full border p-2 rounded focus:ring focus:ring-blue-300"
          >
            <option value="">-- Pilih Kelas --</option>
            {kelas.map((k) => (
              <option key={k.id} value={k.id}>
                {k.nama_kelas}
              </option>
            ))}
          </select>

          <button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full"
          >
            {editMode ? "Update" : "Simpan"}
          </button>
        </div>
      </Modal>
    </div>
  );
}
