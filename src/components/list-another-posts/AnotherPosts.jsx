import Link from "next/link";
import { useState, useMemo } from "react";

const PAGE_SIZE = 6;

export default function AnotherPosts(data) {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil((data?.data?.length || 0) / PAGE_SIZE);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    return data?.data?.slice(start, end);
  }, [page, data]);

  return (
    <div>
      {/* LIST */}
      {paginatedData?.map((item) => (
        <div
          key={item.id}
          className="text-[16px] ml-2 text-red-400 border-b border-gray-200 last:border-b-0 py-1"
        >
          <Link href={`/post/${item.id}`}>
            {/* {item.caption
              ?.split(" ")
              .map(
                (w) =>
                  w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
              )
              .join(" ")} */}
            {item?.caption}
          </Link>
        </div>
      ))}

      {/* PAGINATION */}
      {
        data.data[0] && <div className="flex mt-4 justify-center">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-3 py-1 mr-4 border rounded disabled:opacity-40"
          >
            <img src="/images/icon/right-arrow2.png" className="w-5 h-5 rotate-180" alt="" />
          </button>

          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`border border-gray-300 w-10 h-10 ${page === i + 1 ? "bg-red-400 text-white" : ""
                }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-3 py-1 ml-4 border rounded disabled:opacity-40"
          >
            <img src="/images/icon/right-arrow2.png" className="w-5 h-5" alt="" />
          </button>
        </div>
      }
    </div>
  );
}
