"use client";
import { useEffect, useState } from "react";

export default function Adduser({ open, onClose, onSubmit }) {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("user");
  const [password, setPassword] = useState("");

  if (!open) return null;

  const handleSubmit = () => {
    if (!username || !password) return alert("Vui lòng nhập đủ dữ liệu");
    onSubmit({ username, role, password });
    onClose();
  };

  const stopPropagation = (e) => e.stopPropagation();

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-40 flex justify-center items-center z-50" onClick={onClose}>
      <div className="bg-white w-[400px] p-6 rounded-lg shadow-lg animate-fadeIn" onClick={stopPropagation}>
        <h2 className="text-xl font-bold mb-4">Thêm User</h2>

        <div className="flex flex-col gap-3">
          <div>
            <label className="font-semibold">Username</label>
            <input
              type="text"
              className="w-full border border-gray-400 px-3 py-2 rounded-md mt-1"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nhập username..."
            />
          </div>

          <div>
            <label className="font-semibold">Password</label>
            <input
              type="password"
              className="w-full border border-gray-400 px-3 py-2 rounded-md mt-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập password..."
            />
          </div>

          <div>
            <label className="font-semibold">Role</label>
            <select
              className="w-full border border-gray-400 px-3 py-2 rounded-md mt-1"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
          >
            Hủy
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Thêm
          </button>
        </div>
      </div>
    </div>
  );
}
