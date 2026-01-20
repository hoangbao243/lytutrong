"use client";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";

export default function SearchDropdown() {
  const [open, setOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const ref = useRef(null);
  const router = useRouter()

  const handleSearch = () => {
    if (!keyword.trim()) return;
    router.push(`/pages/searching?q=${encodeURIComponent(keyword.trim())}&page=1`);
  };


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

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="relative mt-1.5" ref={ref}>
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
            
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Tìm kiếm..."
              className="flex-1 outline-none"
            />
            <img src="/images/icon/search.png" className="w-7 h-7 cursor-pointer" alt="" onClick={handleSearch}/>
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
