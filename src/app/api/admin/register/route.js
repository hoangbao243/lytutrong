import { NextResponse } from "next/server";
import { getPool } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const body = await req.json();
    const { username, password, role } = body;
    console.log(username,password,role);
    

    /* ===============================
       1️⃣ VALIDATE INPUT
    =============================== */
    if (!username || !password) {
      return NextResponse.json(
        { message: "Thiếu username hoặc password" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password phải >= 6 ký tự" },
        { status: 400 }
      );
    }

    const allowedRoles = ["admin", "editor", "user"];
    const userRole = allowedRoles.includes(role) ? role : "user";

    const pool = await getPool();

    /* ===============================
       2️⃣ CHECK USERNAME TỒN TẠI
    =============================== */
    const [[exists]] = await pool.execute(
      `SELECT id FROM users WHERE username = ? LIMIT 1`,
      [username]
    );

    if (exists) {
      return NextResponse.json(
        { message: "Username đã tồn tại" },
        { status: 409 }
      );
    }

    /* ===============================
       3️⃣ HASH PASSWORD
    =============================== */
    const hashedPassword = await bcrypt.hash(password, 10);

    /* ===============================
       4️⃣ INSERT USER
    =============================== */
    const [result] = await pool.execute(
      `
      INSERT INTO users (username, passwordHash, role)
      VALUES (?, ?, ?)
      `,
      [username, hashedPassword, userRole]
    );

    return NextResponse.json(
      {
        message: "Đăng ký thành công",
        user: {
          id: result.insertId,
          username,
          role: userRole,
        },
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return NextResponse.json(
      { message: "Lỗi server" },
      { status: 500 }
    );
  }
}
