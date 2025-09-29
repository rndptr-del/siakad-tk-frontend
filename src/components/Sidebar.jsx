import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Users,
  BookOpen,
  ClipboardList,
  Layers,
  CalendarCheck,
  Award,
  CreditCard,
} from "lucide-react";

export default function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/", icon: <Home size={18} /> },
    { name: "Data Siswa", path: "/siswa", icon: <Users size={18} /> },
    { name: "Data Guru", path: "/Guru", icon: <BookOpen size={18} /> },
    { name: "Data Kelas", path: "/kelas", icon: <Layers size={18} /> },
    { name: "Data Mapel", path: "/mapel", icon: <ClipboardList size={18} /> },
    { name: "Absensi", path: "/absensi", icon: <CalendarCheck size={18} /> },
    { name: "Nilai", path: "/nilai", icon: <Award size={18} /> },
    { name: "Pembayaran", path: "/payment", icon: <CreditCard size={18} /> },
  ];

  return (
    <div className="w-64 bg-white h-screen p-4 shadow-lg flex flex-col">
      {/* Logo / Title */}
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-blue-600">SIAKAD TK</h1>
        <p className="text-xs text-gray-400">Manajemen Sekolah</p>
      </div>

      {/* Menu */}
      <ul className="space-y-2 flex-1">
        {menuItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                location.pathname === item.path
                  ? "bg-blue-500 text-white shadow-md"
                  : "text-gray-600 hover:bg-blue-100 hover:text-blue-600"
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Footer */}
      <div className="text-center text-xs text-gray-400 mt-4">
        © 2025 SIAKAD
      </div>
    </div>
  );
}
