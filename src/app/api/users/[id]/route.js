import { getPool } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { message: "Thiếu ID user" },
        { status: 400 }
      );
    }

    const pool = await getPool();

    // 1️⃣ Check user tồn tại
    const [[user]] = await pool.execute(
      `SELECT id, role FROM users WHERE id = ? LIMIT 1`,
      [id]
    );

    if (!user) {
      return NextResponse.json(
        { message: "User không tồn tại" },
        { status: 404 }
      );
    }

    // 2️⃣ (OPTIONAL) Không cho xóa admin gốc
    if (user.username === "admin") {
      return NextResponse.json(
        { message: "Không thể xóa tài khoản admin" },
        { status: 403 }
      );
    }

    // 3️⃣ Xóa user
    await pool.execute(`DELETE FROM users WHERE id = ?`, [id]);

    return NextResponse.json({
      message: "Xóa user thành công",
      deletedId: Number(id),
    });
  } catch (error) {
    console.error("DELETE USER ERROR:", error);
    return NextResponse.json(
      { message: "Lỗi server" },
      { status: 500 }
    );
  }
}

