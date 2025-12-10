"use client";
import Loader from "@/components/loader/Loader";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Adduser from "./components/Adduser";

export default function page() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [newUsers, setNewUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get(`/api/users`);
        if (res.status == 200) {
          console.log(res);
          setUsers(res.data.users);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, []);

  const handleAddUser = (newUser) => {
    setNewUsers((prev) => [...prev, newUser]);
    console.log(newUser);
    // Gọi API add user
  };

  return (
    <div className="text-gray-900 bg-gray-200">
      {loading ? (
        <Loader></Loader>
      ) : (
        <>
          <div className="p-4 flex items-center">
            <h1 className="text-3xl">Users</h1>
            <button
              className="group cursor-pointer outline-none hover:rotate-90 duration-300 ml-4 mt-1"
              title="Add New"
              onClick={() => setOpenModal(true)}
            >
              <svg
                className="stroke-gray-400 fill-none group-hover:fill-gray-500 group-active:stroke-gray-200 group-active:fill-gray-600 group-active:duration-0 duration-300"
                viewBox="0 0 24 24"
                height="30px"
                width="30px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeWidth="1.5"
                  d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                ></path>
                <path strokeWidth="1.5" d="M8 12H16"></path>
                <path strokeWidth="1.5" d="M12 16V8"></path>
              </svg>
            </button>
          </div>
          <Adduser
            open={openModal}
            onClose={() => setOpenModal(false)}
            onSubmit={handleAddUser}
          ></Adduser>
          <div className="px-3 py-4 flex justify-center">
            <table className="w-full text-md bg-white shadow-md rounded mb-4">
              <tbody>
                <tr className="border-b border-gray-300">
                  <th className="text-left p-3 px-5">Tên</th>
                  <th className="text-left p-3 px-5">Kích hoạt</th>
                  <th className="text-left p-3 px-5">Quyền</th>
                  <th>Hành động</th>
                </tr>
                {users &&
                  users.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-300 hover:bg-orange-100 bg-gray-100"
                    >
                      <td className="p-3 px-5">
                        <input
                          type="text"
                          defaultValue={item.Username}
                          className="bg-transparent py-2"
                          disabled
                        ></input>
                      </td>
                      <td className="p-3 px-5">
                        {item.Username == "admin" ? (
                          ""
                        ) : (
                          <input
                            type="checkbox"
                            defaultChecked={`${item?.isActive}`}
                            className="w-5 h-5 bg-transparent border-b-2 border-gray-300 py-2 accent-blue-600"
                          ></input>
                        )}
                      </td>
                      <td className="p-3 px-5">
                        <input
                          type="text"
                          defaultValue={item?.Role}
                          className="bg-transparent py-2"
                          disabled
                        ></input>
                      </td>
                      <td className="p-3 px-5 flex justify-center">
                        {item.Username == "admin" ? (
                          " "
                        ) : (
                          <>
                            <button
                              type="button"
                              className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                            >
                              Save
                            </button>
                            <button
                              type="button"
                              className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
