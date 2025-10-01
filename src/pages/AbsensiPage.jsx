import { useEffect, useState } from "react";
import axios from "axios";

export default function AbsensiPage() {
  const [kelas, setKelas] = useState([]);
  const [selectedKelas, setSelectedKelas] = useState("");
  const [siswa, setSiswa] = useState([]);
  const [tanggal, setTanggal] = useState(new Date().toISOString().split("T")[0]);
  const [absensi, setAbsensi] = useState({});
  const [loading, setLoading] = useState(false);

  // Ambil daftar kelas
  useEffect(() => {
    axios.get("http://localhost:8000/api/kelas")
      .then(res => setKelas(res.data))
      .catch(err => console.error(err));
  }, []);

  // Ambil siswa berdasarkan kelas
  const loadSiswa = (kelasId) => {
    if (!kelasId) return;
    axios.get(`http://localhost:8000/api/siswas?kelas_id=${kelasId}`)
      .then(res => {
        setSiswa(res.data);
        // Default semua Hadir
        const defaultAbsensi = {};
        res.data.forEach(s => {
          defaultAbsensi[s.id] = "hadir";
        });
        setAbsensi(defaultAbsensi);
      })
      .catch(err => console.error(err));
  };

  // Ubah status siswa
  const handleChangeStatus = (id, status) => {
    setAbsensi(prev => ({ ...prev, [id]: status }));
  };

  // Simpan absensi ke API
  const handleSubmit = async () => {
    if (!selectedKelas) {
      alert("Pilih kelas terlebih dahulu!");
      return;
    }

    setLoading(true);
    try {
      const payload = Object.keys(absensi).map(id => ({
        siswa_id: id,
        tanggal,
        status: absensi[id],
      }));

      await axios.post("http://localhost:8000/api/absensis", payload);
      alert("Absensi berhasil disimpan!");
    } catch (err) {
      console.error(err);
      alert("Gagal menyimpan absensi");
    }
    setLoading(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Absensi Siswa</h1>

      {/* Pilih Kelas */}
      <div className="mb-4 flex items-center gap-3">
        <label className="font-medium">Kelas:</label>
        <select
          value={selectedKelas}
          onChange={(e) => {
            setSelectedKelas(e.target.value);
            loadSiswa(e.target.value);
          }}
          className="border px-3 py-2 rounded"
        >
          <option value="">-- Pilih Kelas --</option>
          {kelas.map(k => (
            <option key={k.id} value={k.id}>{k.nama_kelas}</option>
          ))}
        </select>
      </div>

      {/* Pilih Tanggal */}
      <div className="mb-4">
        <label className="font-medium">Tanggal:</label>
        <input
          type="date"
          value={tanggal}
          onChange={e => setTanggal(e.target.value)}
          className="ml-2 border px-3 py-1 rounded"
        />
      </div>

      {/* Tabel siswa */}
      {siswa.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-3 py-2">No</th>
                <th className="border px-3 py-2">Nama</th>
                <th className="border px-3 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {siswa.map((s, i) => (
                <tr key={s.id}>
                  <td className="border px-3 py-2 text-center">{i + 1}</td>
                  <td className="border px-3 py-2">{s.nama}</td>
                  <td className="border px-3 py-2 text-center">
                    <select
                      value={absensi[s.id] || "hadir"}
                      onChange={(e) => handleChangeStatus(s.id, e.target.value)}
                      className="border px-2 py-1 rounded"
                    >
                      <option value="hadir">Hadir</option>
                      <option value="izin">Izin</option>
                      <option value="sakit">Sakit</option>
                      <option value="alpa">Alpa</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        selectedKelas && <p className="text-gray-600">Tidak ada siswa di kelas ini</p>
      )}

      {/* Tombol simpan */}
      {siswa.length > 0 && (
        <div className="mt-4">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {loading ? "Menyimpan..." : "Simpan Absensi"}
          </button>
        </div>
      )}
    </div>
  );
}
