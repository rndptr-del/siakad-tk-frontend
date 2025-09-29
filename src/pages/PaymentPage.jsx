import { useEffect, useState } from "react";
import api from "../services/api";

export default function PaymentPage() {
  const [siswas, setSiswas] = useState([]);
  const [form, setForm] = useState({
    siswa_id: "",
    amount: "",
  });

  useEffect(() => {
    // Load script Midtrans Snap
    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js"; // pakai sandbox dulu
    script.setAttribute("data-client-key", "YOUR_MIDTRANS_CLIENT_KEY");
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePayment = async () => {
    try {
      // minta snapToken ke backend
      const res = await api.post("/payment", form);
      const snapToken = res.data.snap_token;

      // panggil Midtrans Snap popup
      window.snap.pay(snapToken, {
        onSuccess: function (result) {
          alert("Pembayaran berhasil!");
          console.log(result);
        },
        onPending: function (result) {
          alert("Menunggu pembayaran!");
          console.log(result);
        },
        onError: function (result) {
          alert("Pembayaran gagal!");
          console.log(result);
        },
        onClose: function () {
          alert("Popup ditutup tanpa menyelesaikan pembayaran");
        },
      });
    } catch (err) {
      console.error("Payment Error:", err);
      alert("Gagal membuat pembayaran");
    }
  };

  // fetch siswa dari API
  useEffect(() => {
    api.get("/siswas").then((res) => setSiswas(res.data));
  }, []);

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Pembayaran SPP</h2>
      <div className="space-y-3">
        <select
          name="siswa_id"
          value={form.siswa_id}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="">-- Pilih Siswa --</option>
          {siswas.map((s) => (
            <option key={s.id} value={s.id}>
              {s.nama}
            </option>
          ))}
        </select>
        <input
          type="number"
          name="amount"
          placeholder="Jumlah (Rp)"
          value={form.amount}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <button
          onClick={handlePayment}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full"
        >
          Bayar Sekarang
        </button>
      </div>
    </div>
  );
}
