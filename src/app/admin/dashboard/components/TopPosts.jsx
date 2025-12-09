"use client";
import Loader from "@/components/loader/Loader";
import React, { useEffect, useState } from "react";

export default function TopPosts(data) {
  const [loading, setLoading] = useState(true);
  useEffect(()=>{
    setLoading(false)
  },[data])
  return (
    <div className="w-full h-fit rounded-xl border border-gray-200 font-sans shadow-lg">
      {loading ? (
        <Loader></Loader>
      ) : (
        <>
          <div className="rounded-xl bg-white p-4">
            <p className="text-lg font-medium text-gray-900">{data.title}</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="text-gray-900 border-b border-gray-300">
                    <th className="py-2">Ảnh</th>
                    <th className="py-2">Tiêu đề</th>
                    <th className="py-2">Lượt xem</th>
                    <th className="py-2">Ngày đăng</th>
                  </tr>
                </thead>

                <tbody>
                  {data &&
                    data?.data?.map((post, index) => (
                      <tr
                        key={index}
                        className="border-b py-3 border-gray-300 hover:bg-gray-300 transition"
                      >
                        <td className="py-3">
                          <img
                            src={post.src}
                            alt={post.caption}
                            className="w-14 h-10 object-cover rounded-md"
                          />
                        </td>

                        <td className="py-3 text-gray-900 max-w-xs truncate">
                          {post.caption}
                        </td>

                        <td className="py-3 text-cyan-600 font-medium">
                          {post.views.toLocaleString()}
                        </td>

                        <td className="py-3 text-gray-900">
                          {post.createDate}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
