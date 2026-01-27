"use client";
import { formatDateTime } from "@/utils";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function page() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const { slug } = useParams();
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState();
  const [loading, setLoading] = useState(false);
  const limit = 9;

  const getPost = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `/api/post/pages/${slug}`, {
        params: { page: page, limit: limit },
      });
      if (res.status == 200) {
        setPosts(res?.data?.data);
        console.log(res?.data);
        setPagination(res?.data?.pagination?.totalPages || 1);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (slug == "tin-noi-bat") {
      getPost();
    }
  }, [slug]);

  useEffect(() => {
    getPost();
  }, [page]);

  const nextPage = () => {
    if (page < pagination) setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <>
      <section className="py-8 ">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-manrope text-4xl font-bold text-gray-900 text-center mb-16">
            {title}
          </h2>
          <div
            className=" justify-center grid
              grid-cols-1
              md:grid-cols-2
              lg:grid-cols-3
              gap-4"
          >
            {posts &&
              posts?.map((post, index) => (
                <div
                  key={index}
                  className="h-full flex flex-col border border-gray-300 rounded-2xl"
                >
                  <div className="flex items-center">
                    <img
                      src={post.src}
                      alt=""
                      className="rounded-t-2xl w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col flex-1 justify-between p-4 lg:p-6 transition-all duration-300 rounded-b-2xl group-hover:bg-gray-50">
                    <div>
                      <span className="text-indigo-600 font-medium mb-3 block">
                        {formatDateTime(post.publish_date)}
                      </span>
                      <h4 className="text-xl text-gray-900 font-medium leading-8 mb-5 line-clamp-3">
                        {post.caption}
                      </h4>
                      <p className="text-gray-500 leading-6 mb-10 line-clamp-3">
                        {post.description}
                      </p>
                    </div>
                    <Link
                      href={`/post/${post.id}`}
                      className="mt-auto inline-flex justify-center cursor-pointer text-lg text-indigo-600 bg-gray-200 hover:bg-gray-300 p-3 rounded-xl font-semibold"
                    >
                      Xem bài viết
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
      {/* PAGINATION */}
      <div className="flex items-center justify-center gap-3 mt-4">
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
  );
}
