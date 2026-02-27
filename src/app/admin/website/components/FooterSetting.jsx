import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function FooterSetting() {
  const [footer, setFooter] = useState({});

  const updateFooter = async (data) => {
    try {
      const res = await axios.put(`/api/footer`, data);
      if (res.status == 200) {
        toast.success(res?.data?.message);
        setFooter(res.data.data[0])
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const handleForm = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    updateFooter(data)
  };

  useEffect(() => {
    const getFooter = async () => {
      try {
        const res = await axios.get(`/api/footer`);
        if (res.status == 200) {
          setFooter(res?.data?.rows[0]);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };
    getFooter();
  }, []);

  return (
    <div>
      <p className="p-2 font-bold text-2xl">Cài đặt Footer</p>
      <form onSubmit={(e) => handleForm(e)}>
        {footer &&
          Object.entries(footer)
            .filter(([key]) => key !== "id" && key !== "createAt")
            .map(([key, value]) => (
              <div key={key}>
                <p>
                  {key == "principal"
                    ? "Hiệu Trưởng"
                    : key == "year"
                      ? "Năm"
                      : key == "address"
                        ? "Địa Chỉ"
                        : key == "phone"
                          ? "Số Điện Thoại"
                          : ""}
                  : {value}
                </p>
                <div className="flex items-center">
                  <img
                    src="/images/icon/right-arrow.png"
                    className="w-4 h-4"
                    alt=""
                  />
                  <input
                    type="text"
                    name={key}
                    id={key}
                    placeholder={key}
                    className="border border-gray-200 m-2 rounded-sm w-50 p-2"
                  />
                </div>
              </div>
            ))}
        <button
          type="submit"
          className="cursor-pointer mt-2 transition-all bg-blue-500 text-white px-6 py-2 rounded-lg
        border-blue-600
        border-b-2 hover:brightness-110 hover:-translate-y-px hover:border-b-[6px]
        active:border-b active:brightness-90 active:translate-y-0.5"
        >
          Lưu
        </button>
      </form>
      <Toaster position="top-right" reverseOrder={false}></Toaster>
    </div>
  );
}
