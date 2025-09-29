import { Users, BookOpen, Layers } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card Siswa */}
        <div className="flex items-center gap-4 bg-blue-50 p-6 rounded-xl shadow hover:shadow-lg transition-all cursor-pointer">
          <div className="bg-blue-500 text-white p-4 rounded-full">
            <Users size={28} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Total Siswa</h3>
            <p className="text-2xl font-bold text-gray-900">120</p>
          </div>
        </div>

        {/* Card Guru */}
        <div className="flex items-center gap-4 bg-green-50 p-6 rounded-xl shadow hover:shadow-lg transition-all cursor-pointer">
          <div className="bg-green-500 text-white p-4 rounded-full">
            <BookOpen size={28} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Total Guru</h3>
            <p className="text-2xl font-bold text-gray-900">10</p>
          </div>
        </div>

        {/* Card Kelas */}
        <div className="flex items-center gap-4 bg-yellow-50 p-6 rounded-xl shadow hover:shadow-lg transition-all cursor-pointer">
          <div className="bg-yellow-500 text-white p-4 rounded-full">
            <Layers size={28} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Kelas Aktif</h3>
            <p className="text-2xl font-bold text-gray-900">6</p>
          </div>
        </div>
      </div>
    </div>
  );
}
