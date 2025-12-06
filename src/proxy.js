import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function proxy(req) {
  const token = req.cookies.get("token")?.value;

  // Không có token → chuyển về login
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    // Verify token
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(token, secret);

    // Cho phép request đi tiếp
    return NextResponse.next();
  } catch (err) {
    console.error("JWT verify error:", err);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
