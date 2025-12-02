import { getPool } from "@/lib/mssql";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return Response.json(
        { message: "Username và mật khẩu là bắt buộc" },
        { status: 400 }
      );
    }

    const pool = await getPool();

    // Lấy user theo username
    const result = await pool
      .request()
      .input("username", username)
      .query(`
        SELECT TOP 1 *
        FROM Users
        WHERE Username = @username AND IsActive = 1
      `);

    const user = result.recordset[0];


    console.log(result);
    
    if (!user) {
      return Response.json(
        { message: "Sai tài khoản hoặc mật khẩu!" },
        { status: 400 }
      );
    }

    // So sánh mật khẩu
    const isMatch = await bcrypt.compare(password, user.PasswordHash);
    
    if (!isMatch) {
      return Response.json(
        { message: "Sai tài khoản hoặc mật khẩu!" },
        { status: 401 }
      );
    }

    // Tạo token
    const token = jwt.sign(
      {
        id: user.Id,
        username: user.Username,
        role: user.Role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const re = NextResponse.json({
      message: "Đăng nhập thành công",
      token,
      user: {
        id: user.Id,
        username: user.Username,
        role: user.Role,
      },
    });

    re.cookies.set("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 ngày
    });

    return re

  } catch (err) {
    console.error("Login error:", err);
    console.error("Login error:awefawef");
    return Response.json({ message: "Lỗi server" }, { status: 500 });
  }
}
