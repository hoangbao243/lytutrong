import { useEffect, useRef, useState } from "react";
import Link from "next/link";

function PostCard({ item }) {
  const titleRef = useRef(null);
  const [showDesc, setShowDesc] = useState(false);

  useEffect(() => {
    if (!titleRef.current) return;

    const el = titleRef.current;
    const lineHeight = parseFloat(getComputedStyle(el).lineHeight);
    const lines = Math.round(el.scrollHeight / lineHeight);

    setShowDesc(lines <= 2);
  }, [item?.caption]);

  return (
    <div className="flex w-full h-[15rem] cursor-pointer transition-all duration-500 hover:translate-y-2 bg-neutral-50 rounded-lg shadow-xl">
      <Link
        href={`/post/${item?.id}`}
        className="flex flex-col bg-white rounded-xl shadow-md p-2 overflow-hidden"
      >
        <img
          src={item?.src}
          alt="Thumbnail"
          className="w-full h-28 object-cover rounded-lg mb-2 shadow-lg shadow-amber-200/40"
        />

        {/* Caption */}
        <h3
          ref={titleRef}
          className="font-medium text-black hover:text-blue-500 line-clamp-3 text-sm md:text-base"
        >
          {item?.caption?.charAt(0)?.toUpperCase() +
            item?.caption?.slice(1)?.toLowerCase()}
        </h3>

        {/* Description */}
        {showDesc && (
          <p className="mt-1 text-xs text-gray-600 line-clamp-2">
            {item?.description}
          </p>
        )}
      </Link>
    </div>
  );
}

export default PostCard;
