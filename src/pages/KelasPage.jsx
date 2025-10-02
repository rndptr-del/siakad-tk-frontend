import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import api from "../services/api";
import Modal from "../components/Modal";

export default function KelasPage() {
  const [kelas, setKelas] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    id: null,
    nama_kelas: "",
    tingkat: "",
  });

  // Ambil data kelas
  const fetchKelas = async () => {
    const res = await api.get("/kelas");
    setKelas(res.data);
  };

  useEffect(() => {
    fetchKelas();
  }, []);

  // Handler input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Tambah kelas
  const handleAdd = () => {
    setEditMode(false);
    setForm({ id: null, nama_kelas: "", tingkat: "" });
    setIsModalOpen(true);
  };

  // Edit kelas
  const handleEdit = (kelas) => {
    setEditMode(true);
    setForm({ id: kelas.id, nama_kelas: kelas.nama_kelas, tingkat: kelas.tingkat });
    setIsModalOpen(true);
  };

  // Simpan kelas
  const handleSubmit = async () => {
    try {
      if (editMode) {
        await api.put(`/kelas/${form.id}`, form);
      } else {
        await api.post("/kelas", form);
      }
      setIsModalOpen(false);
      fetchKelas();
    } catch (err) {
      console.error(err);
    }
  };

  // Hapus kelas
  const handleDelete = async (id) => {
    if (confirm("Yakin ingin menghapus data ini?")) {
      await api.delete(`/kelas/${id}`);
      fetchKelas();
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">🏫 Data Kelas</h2>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
        >
          <Plus size={18} /> Tambah Kelas
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-100 text-gray-700">
              <th className="p-3 border">ID</th>
              <th className="p-3 border">Nama Kelas</th>
              <th className="p-3 border">Tingkat</th>
              <th className="p-3 border text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {kelas.map((k, index) => (
              <tr key={k.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="p-3 border">{k.id}</td>
                <td className="p-3 border">{k.nama_kelas}</td>
                <td className="p-3 border">{k.tingkat}</td>
                <td className="p-3 border text-center flex justify-center gap-2">
                  <button
                    onClick={() => handleEdit(k)}
                    className="flex items-center gap-1 bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    <Pencil size={16} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(k.id)}
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
        title={editMode ? "✏️ Edit Kelas" : "➕ Tambah Kelas"}
      >
        <div className="space-y-3">
          <input
            type="text"
            name="nama_kelas"
            placeholder="Nama Kelas"
            value={form.nama_kelas}
            onChange={handleChange}
            className="w-full border p-2 rounded focus:ring focus:ring-blue-300"
          />
          <input
            type="text"
            name="tingkat"
            placeholder="Tingkat"
            value={form.tingkat}
            onChange={handleChange}
            className="w-full border p-2 rounded focus:ring focus:ring-blue-300"
          />
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
