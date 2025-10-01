import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Siswa from "./pages/Siswa";
import PaymentPage from "./pages/PaymentPage";
import GurusPage from "./pages/Guru";
import AbsensiPage from "./pages/AbsensiPage";

function App() {
  return (
    <BrowserRouter>
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/siswa" element={<Siswa />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/Guru" element={<GurusPage />} />
            <Route path="/Absensi" element={<AbsensiPage />} />            
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
