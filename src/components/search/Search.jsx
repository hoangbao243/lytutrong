"use client";
import { useState, useRef, useEffect } from "react";

export default function SearchDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Click bên ngoài để đóng
  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative mt-2.5 hidden md:block" ref={ref}>
      {/* Icon search */}
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-full bg-amber-300 hover:bg-amber-400"
      >
        <img src="/images/icon/search-2.png" className="w-6.5 h-6.5 " alt="" />
      </button>

      {/* Popup search */}
      {open && (
        <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-64 bg-white shadow-xl rounded-xl p-3 animate-drop z-50">
          <div className="flex items-center gap-2">
                    <img src="/images/icon/search.png" className="w-7 h-7" alt="" />

            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="flex-1 outline-none"
            />
          </div>
        </div>
      )}

      {/* Animation */}
      <style>{`
        .animate-drop {
          animation: dropDown 0.25s ease forwards;
        }
        @keyframes dropDown {
          from {
            opacity: 0;
            transform: translate(-50%, -10px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
      `}</style>
    </div>
  );
}
