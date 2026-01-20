"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

export default function SearchingPage() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("q");
  const router = useRouter()

  const [data, setData] = useState([]);
  const q = searchParams.get("q") || "";
  const page = Number(searchParams.get("page") || 1);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleView = (id) =>{
    router.push(`/post/${id}`)
  }

  useEffect(() => {
    if (!q) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/search", {
          params: { q, page },
        });

        setData(res.data.data);
        setPagination(res.data.pagination);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [q, page]);

  const goToPage = (p) => {
    router.push(`/pages/searching?q=${encodeURIComponent(q)}&page=${p}`);
  };

  return (
    <section className=" max-w-7xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">
        Kết quả tìm kiếm cho: <span className="text-blue-600">{keyword}</span>
      </h1>

      {loading && <p>Đang tìm kiếm...</p>}

      {!loading && data.length === 0 && <p>Không tìm thấy kết quả</p>}

      <ul className="grid grid-cols-2 gap-2">
        {data.map((item, index) => (
          <div key={index} className="group flex mb-12 flex-col justify-start items-start gap-2 w-5/6 h-64 duration-500 relative rounded-lg p-4 bg-[#d7ebe9] hover:-translate-y-2 hover:shadow-xl shadow-gray-400">
            <div
              className="absolute duration-700 shadow-md group-hover:-translate-y-4 group-hover:-translate-x-4 -bottom-10 -right-10 w-1/2 h-1/2 rounded-lg bg-[#748886]"
              alt="image here"
            >
              <img src={item.src} alt="" className="h-full w-full rounded-lg" />
            </div>

            <div className="">
              <h2 className="text-lg font-bold mb-2 text-black line-clamp-2">
                {item.caption}
              </h2>
              <p className="text-gray-600 line-clamp-3">{item.description}</p>
            </div>
            <button onClick={()=>handleView(item.id)} className="absolute left-2 bottom-2 hover:bg-[#576b69] bg-[#9bb8b5] text-white rounded p-2 px-6 cursor-pointer">
              Xem
            </button>
          </div>
        ))}
      </ul>
      {/* PAGINATION */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          <button
            disabled={page === 1}
            onClick={() => goToPage(page - 1)}
            className="px-3 py-1 border border-gray-300 rounded disabled:opacity-40 cursor-pointer"
          >
            ←
          </button>

          {Array.from({ length: pagination.totalPages }).map((_, i) => {
            const p = i + 1;
            return (
              <button
                key={p}
                onClick={() => goToPage(p)}
                className={`px-3 py-1 border border-gray-300 rounded cursor-pointer ${
                  p === page ? "bg-blue-600 text-white" : ""
                }`}
              >
                {p}
              </button>
            );
          })}

          <button
            disabled={page === pagination.totalPages}
            onClick={() => goToPage(page + 1)}
            className="px-3 py-1 border border-gray-300 rounded disabled:opacity-40 cursor-pointer"
          >
            →
          </button>
        </div>
      )}
    </section>
  );
}
