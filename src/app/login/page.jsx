"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import axios from "axios";

const schema = yup.object().shape({
  username: yup.string().required("Please enter username"),
  password: yup
    .string()
    .min(5, "Password must be at least 5 characters")
    .max(20, "Password must not exceed 20 characters")
    .required("Please enter password"),
});

export default function LoginPage() {
  const navigate = useRouter();
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [error,setError] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const login = async (token) => {
    try {
      const res = await axios.post("/api/login", {
        username,
        password,
      });
      console.log(username, password);
      console.log(res);
      

      if (res.status == 200) {
        setError('')
        navigate.push(`/admin`);
      }
    } catch (err) {
      // Bắt lỗi từ server (status != 2xx)
      if (err.status == 400 || err.status == 401) {
        setError(err.response.data.message);
      }
      // Lỗi do network, timeout...
      setError(err.response.data.message)
      console.log(err);
      
    }
  };

  const onSubmit = async (data) => {
    // if (data.username == "admin" && data.password == "admin") {
    //   navigate.push(`/admin`);
    // }
    console.log(error);
    
    await login();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50 font-sans">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md p-8 space-y-4 bg-white shadow-md rounded-2xl"
      >
        <img src="/images/logo2.png" className="w-30 h-30 mx-auto" alt="logo" />
        <div>
          <h2 className="text-2xl font-bold mb-7 text-center mt-3 text-blue-900">
            Sign in
          </h2>
          <div>
            <label htmlFor="username" className="text-md text-gray-500 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Username:</label>
            <input
              id="outlined-basic"
              label="username"
              variant="outlined"
              className="w-full px-3 py-2 border border-gray-200"
              {...register("username", {
                onChange: (e) => setUserName(e.target.value),
              })}
            />
            {errors?.username && (
              <p className="text-red-500 text-xs mt-1">
                {errors?.username?.message}
              </p>
            )}
          </div>

          <div className="mt-5">
            <label htmlFor="password" className="text-md text-gray-500 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Password:</label>
            <input
              id="outlined-basic"
              label="password"
              variant="outlined"
              type="password"
              className="w-full px-3 py-2 border border-gray-200"
              {...register("password", {
                onChange: (e) => setPassword(e.target.value),
              })}
            />
            {errors?.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password?.message}
              </p>
            )}
          </div>
            {
              error && (
                <div className="mt-2 text-red-400 font-semibold">
                  {error}
                </div>
              )
            }
          <div className="mt-8">
            <button
              className="w-full py-2 px-4 bg-purple-500 hover:bg-purple-700 rounded-md shadow-lg text-white font-semibold transition duration-200"
              type="submit"
            >
              Sign In
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
