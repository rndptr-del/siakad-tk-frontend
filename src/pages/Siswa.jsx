import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react"; // ikon
import api from "../services/api";
import Modal from "../components/Modal";

export default function Siswa() {
  const [siswas, setSiswas] = useState([]);
  const [kelas, setKelas] = useState([]); // ambil data kelas
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    id: null,
    nama: "",
    tanggal_lahir: "",
    nama_orang_tua: "",
    kelas_id: "",
  });

  // Ambil data siswa dari API
  const fetchSiswa = async () => {
    const res = await api.get("/siswas");
    setSiswas(res.data);
  };

  // Ambil data kelas (untuk dropdown)
  const fetchKelas = async () => {
    const res = await api.get("/kelas");
    setKelas(res.data);
  };

  useEffect(() => {
    fetchSiswa();
    fetchKelas();
  }, []);

  // Handler input form
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Tambah siswa
  const handleAdd = () => {
    setEditMode(false);
    setForm({ id: null, nama: "", tanggal_lahir: "", nama_orang_tua: "", kelas_id: "" });
    setIsModalOpen(true);
  };

  // Edit siswa
  const handleEdit = (siswa) => {
    setEditMode(true);
    setForm({
      id: siswa.id,
      nama: siswa.nama,
      tanggal_lahir: siswa.tanggal_lahir,
      nama_orang_tua: siswa.nama_orang_tua,
      kelas_id: siswa.kelas_id,
    });
    setIsModalOpen(true);
  };

  // Simpan data (POST/PUT)
  const handleSubmit = async () => {
    try {
      if (editMode) {
        await api.put(`/siswas/${form.id}`, form);
      } else {
        await api.post("/siswas", form);
      }
      setIsModalOpen(false);
      fetchSiswa();
    } catch (err) {
      console.error(err);
    }
  };

  // Hapus siswa
  const handleDelete = async (id) => {
    if (confirm("Yakin ingin menghapus data ini?")) {
      await api.delete(`/siswas/${id}`);
      fetchSiswa();
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">📚 Data Siswa</h2>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
        >
          <Plus size={18} /> Tambah Siswa
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-100 text-gray-700">
              <th className="p-3 border">ID</th>
              <th className="p-3 border">Nama</th>
              <th className="p-3 border">Tanggal Lahir</th>
              <th className="p-3 border">Nama Orang Tua</th>
              <th className="p-3 border">Kelas</th>
              <th className="p-3 border text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {siswas.map((siswa, index) => (
              <tr
                key={siswa.id}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="p-3 border">{siswa.id}</td>
                <td className="p-3 border">{siswa.nama}</td>
                <td className="p-3 border">{siswa.tanggal_lahir}</td>
                <td className="p-3 border">{siswa.nama_orang_tua}</td>
                <td className="p-3 border">{siswa.kelas?.nama_kelas || "-"}</td>
                <td className="p-3 border text-center flex justify-center gap-2">
                  <button
                    onClick={() => handleEdit(siswa)}
                    className="flex items-center gap-1 bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    <Pencil size={16} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(siswa.id)}
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
        title={editMode ? "✏️ Edit Siswa" : "➕ Tambah Siswa"}
      >
        <div className="space-y-3">
          <input
            type="text"
            name="nama"
            placeholder="Nama Siswa"
            value={form.nama}
            onChange={handleChange}
            className="w-full border p-2 rounded focus:ring focus:ring-blue-300"
          />
          <input
            type="date"
            name="tanggal_lahir"
            value={form.tanggal_lahir}
            onChange={handleChange}
            className="w-full border p-2 rounded focus:ring focus:ring-blue-300"
          />
          <input
            type="text"
            name="nama_orang_tua"
            placeholder="Nama Orang Tua"
            value={form.nama_orang_tua}
            onChange={handleChange}
            className="w-full border p-2 rounded focus:ring focus:ring-blue-300"
          />
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
