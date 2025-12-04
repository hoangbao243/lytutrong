"use client";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";

export default function Dashboard() {
  const [quota, setQuota] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getInfoDrive = async () => {
      try {
        const res = await axios.get(`/api/drive/quota`);
        console.log(res.data.result);
        setQuota(res.data.result);
      } catch (error) {
        console.error("Error loading quota:", error);
      } finally {
        setLoading(false);
      }
    };

    getInfoDrive();
  }, []);
  if (loading) return <div className="p-4">Đang tải...</div>;
  if (!quota) return <div className="p-4">Không tải được dữ liệu Drive.</div>;

  const total = Number(quota.limit);
  const used = Number(quota.usage);
  const percent = ((used / total) * 100).toFixed(1);

  // Format GB
  const toGB = (bytes) => (bytes / 1024 / 1024 / 1024).toFixed(2) + " GB";

  const strokeDash = 100;
  const strokeOffset = strokeDash - (strokeDash * percent) / 100;

  return (
    <div className="flex w-full justify-start bg-red-100/20 ">
      <div className="flex flex-col h-fit gap-2 w-1/3 p-4">
        <div className="h-25 flex items-center justify-between rounded-xl bg-slate-900 p-4">
          {/* Left side */}
          <div className="space-y-1">
            <p className="text-md font-medium text-white">Storage Used</p>

            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-white">
                {toGB(used)}
              </span>
              <span className="text-sm text-slate-400">/ {toGB(total)} GB</span>
            </div>
          </div>

          {/* Circular progress */}
          <div className="relative h-12 w-12">
            <svg className="h-12 w-12 -rotate-90 transform" viewBox="0 0 36 36">
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-slate-800"
              ></circle>

              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray={strokeDash}
                strokeDashoffset={strokeOffset}
                className="text-cyan-500 transition-all duration-500"
              ></circle>
            </svg>

            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-medium text-white">
              {percent}%
            </span>
          </div>
        </div>
        <div className="w-full h-25 p-4 bg-blue-400 rounded-xl">
          Đăng nhập gần đây
        </div>
      </div>
      <div className="flex flex-col gap-2 w-2/3 h-fit p-4 rounded-xl">
        <div className="w-full h-50 bg-green-100 rounded-xl">
          Top 5 bài viết xem nhiều
        </div>
        <div className="w-full h-50 bg-green-100 rounded-xl">
          5 Bài viết mới
        </div>
      </div>
    </div>
  );
}
