"use client";
import React, {useState, useEffect} from "react";
import axios from "axios";
import Loader from "@/components/loader/Loader";

export default function DriveStorage() {
  const [quota, setQuota] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getInfoDrive = async () => {
      try {
        const res = await axios.get(`/api/drive/quota`);
        setQuota(res.data.result);
      } catch (error) {
        console.error("Error loading quota:", error);
      } finally {
        setTimeout(()=>{},5000)
        setLoading(false);
      }
    };
    getInfoDrive();
  }, []);

  if (!quota) return (<div className="h-25 flex items-center justify-between"><Loader></Loader></div>);

  const total = Number(quota.limit);
  const used = Number(quota.usage);
  const percent = ((used / total) * 100).toFixed(1);

  // Format GB
  const toGB = (bytes) => (bytes / 1024 / 1024 / 1024).toFixed(2) + " GB";

  //Convert used to circle
  const strokeDash = 100;
  const strokeOffset = strokeDash - (strokeDash * percent) / 100;
  return (
    <div className="h-25 flex items-center justify-between rounded-xl bg-slate-900 p-4 shadow-lg">
      {loading || !quota && (<Loader></Loader>)}
      {/* Left side */}
      <div className="space-y-1">
        <p className="text-md font-medium text-white">Storage Used</p>

        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-white">{toGB(used)}</span>
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
  );
}
