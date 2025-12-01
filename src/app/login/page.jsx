"use client"
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";

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

  const onSubmit = (data) => {
  if (data.username == "admin" && data.password == "admin") {
    navigate.push(`/admin`)
  }
};
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50">
      
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
            <input
              id="outlined-basic"
              label="username"
              variant="outlined"
              className="w-full px-3 py-2 border border-gray-200"
              {...register("username")}
            />
            {errors?.username && (
              <p className="text-red-500 text-xs mt-1">
                {errors?.username?.message}
              </p>
            )}
          </div>

          <div className="mt-5">
            <input
              id="outlined-basic"
              label="password"
              variant="outlined"
              type="password"
              className="w-full px-3 py-2 border border-gray-200"
              {...register("password")}
            />
            {errors?.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password?.message}
              </p>
            )}
          </div>

          <div className="mt-8">
            <button
      class="w-full py-2 px-4 bg-purple-500 hover:bg-purple-700 rounded-md shadow-lg text-white font-semibold transition duration-200"
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
