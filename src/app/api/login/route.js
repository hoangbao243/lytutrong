import { getPool } from "@/lib/db"; // mysql2/promise
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { message: "Username và mật khẩu là bắt buộc" },
        { status: 400 }
      );
    }

    const pool = getPool();

    // 🔹 Lấy user theo username
    const [rows] = await pool.execute(
      `
      SELECT 
        id,
        username,
        passwordHash,
        role
      FROM users
      WHERE username = ? AND isActive = 1
      LIMIT 1
      `,
      [username]
    );
    
    const user = rows[0];

    if (!user) {
      return NextResponse.json(
        { message: "Sai tài khoản hoặc mật khẩu!" },
        { status: 400 }
      );
    }

    // 🔹 So sánh mật khẩu
    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch) {
      return NextResponse.json(
        { message: "Sai tài khoản hoặc mật khẩu!" },
        { status: 401 }
      );
    }

    // 🔹 Update LastLogin
    await pool.execute(
      `
      UPDATE users
      SET lastlogin = NOW()
      WHERE id = ?
      `,
      [user.id]
    );

    // 🔹 Tạo JWT
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 🔹 Trả response + set cookie
    const res = NextResponse.json({
      message: "Đăng nhập thành công",
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    });

    res.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 ngày
    });

    return res;
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json(
      { message: "Lỗi server" },
      { status: 500 }
    );
  }
}
