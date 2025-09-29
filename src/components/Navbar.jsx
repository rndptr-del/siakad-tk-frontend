import { Bell, User } from "lucide-react";

export default function Navbar() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-4 shadow-md flex items-center justify-between">
      {/* Left: Brand */}
      <h1 className="text-xl font-bold tracking-wide">SIAKAD TK</h1>

      {/* Right: Actions */}
      <div className="flex items-center gap-6">
        {/* Notifikasi */}
        <button className="relative hover:text-gray-200 transition">
          <Bell size={22} />
          <span className="absolute -top-2 -right-2 bg-red-500 text-xs text-white px-1.5 py-0.5 rounded-full">
            3
          </span>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-2 cursor-pointer hover:text-gray-200 transition">
          <User size={22} />
          <span className="hidden sm:inline font-medium">Admin</span>
        </div>
      </div>
    </div>
  );
}
