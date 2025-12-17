import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({
    message: "Đăng xuất thành công",
  });

  // Xóa cookie token
  response.cookies.set("token", "", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
    maxAge: 0, // Hết hạn ngay lập tức
  });

  return response;
}