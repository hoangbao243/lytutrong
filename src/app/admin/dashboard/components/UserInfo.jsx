"use client";
import Loader from "@/components/loader/Loader";
import axios from "axios";
import { useState, useEffect } from "react";

export default function UserInfo() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const res = await axios.get("/api/users");
        setUsers(res.data.users);
        console.log(res);
      } catch (err) {
        console.log("Load users error:", err);
      }finally{
        setLoading(false)
      }
    };
    loadUsers();
  }, []);

  // Format ngày giờ theo Việt Nam
  const formatVNDateUTC = (dateString) => {
    return new Date(dateString).toLocaleString("vi-VN", {
      hour12: false,
      timeZone: "UTC",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <div className="w-full h-fit bg-white rounded-xl">
      {loading ? (
        <Loader></Loader>
      ) : (
        <table className="w-full border border-gray-300 rounded-xl overflow-hidden shadow-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 border border-gray-300 text-left">
                Tên người dùng
              </th>
              <th className="p-3 border border-gray-300 text-left">Quyền</th>
              <th className="p-3 border border-gray-300 text-left">
                Lần đăng nhập cuối
              </th>
            </tr>
          </thead>
          <tbody>
            {users && users.length > 0 ? (
              users.map((u) => (
                <tr key={u.id} className="hover:bg-gray-200 transition">
                  <td className="p-3 border-b border-gray-300">{u.username}</td>
                  <td className="p-3 border-b border-gray-300">{u.role}</td>
                  <td className="p-3 border-b border-gray-300">
                    {formatVNDateUTC(u.lastlogin)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="p-3 border-gray-300 text-center" colSpan={4}>
                  Không có dữ liệu
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
