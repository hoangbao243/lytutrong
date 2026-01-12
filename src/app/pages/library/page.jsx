"use client";
import Loader from "@/components/loader/Loader";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function GalleryPage() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState();
  const [loading, setLoading] = useState(true);
  const limit = 8;

  const getDataGallery = async () => {
    
    const res = await axios.get(`/api/image-post?page=${page}&limit=${limit}`);
    if (res.status == 200) {
      console.log(res?.data?.data);
      setData(res?.data?.data);
      setPagination(res?.data?.totalPages || 1);
    }
  };

  useEffect(() => {
    try {
      getDataGallery();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(()=>{
    console.log(loading);
    
  },[loading])

  useEffect(() => {
    try {
      setLoading(true);
      getDataGallery();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [page]);

  const nextPage = () => {
    if (page < pagination) setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <>
      {loading == true ? (
        <Loader></Loader>
      ) : (
        <div className="max-w-7xl mx-auto px-4 py-10">
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold tracking-tight">
                Thư viện ảnh
              </h1>
              <p className="text-gray-500 mt-2">
                Tổng hợp các hoạt động và sự kiện nổi bật
              </p>
            </div>

            {/* Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {data &&
                data.map((post) => (
                  <Link
                    key={post.id}
                    href={`/pages/library/${post.id}`}
                    className="group block w-50 wrap rounded-xl overflow-hidden border border-gray-200 bg-white hover:shadow-lg transition"
                  >
                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                      <Image
                        src={post.src}
                        alt={post.title}
                        fill
                        sizes="true"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition" />
                    </div>

                    {/* Content */}
                    <div className="p-4 space-y-2">
                      <h3 className="font-semibold text-base line-clamp-2">
                        {post.title}
                      </h3>

                      <p className="text-sm text-gray-600 line-clamp-2">
                        {post.description || " "}
                      </p>

                      <div className="flex items-center justify-between text-xs text-gray-500 pt-2">
                        <span>
                          {new Date(post.createDate).toLocaleDateString(
                            "vi-VN"
                          )}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>

            {/* PAGINATION */}
            <div className="flex items-center gap-3 mt-4">
              <button
                onClick={prevPage}
                disabled={page === 1}
                className="flex px-3 py-1 border rounded disabled:opacity-50 cursor-pointer"
              >
                <img
                  src="/images/icon/right-arrow2.png"
                  alt="right-arrow"
                  className="w-6 h-6 -scale-x-100"
                />
                Prev
              </button>

              <span>
                Trang {page} / {pagination}
              </span>

              <button
                onClick={nextPage}
                disabled={page == pagination}
                className="flex px-3 py-1 border rounded disabled:opacity-50 cursor-pointer"
              >
                Next
                <img
                  src="/images/icon/right-arrow2.png"
                  alt="right-arrow"
                  className="w-6 h-6"
                />
              </button>
            </div>
          </>
        </div>
      )}
    </>
  );
}
