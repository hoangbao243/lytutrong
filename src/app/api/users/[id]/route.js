import { getPool } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ message: "Thiếu ID user" }, { status: 400 });
    }

    const pool = await getPool();

    // 1️⃣ Check user tồn tại
    const [[user]] = await pool.execute(
      `SELECT id, role FROM users WHERE id = ? LIMIT 1`,
      [id],
    );

    if (!user) {
      return NextResponse.json(
        { message: "User không tồn tại" },
        { status: 404 },
      );
    }

    // 2️⃣ (OPTIONAL) Không cho xóa admin gốc
    if (user.username === "admin") {
      return NextResponse.json(
        { message: "Không thể xóa tài khoản admin" },
        { status: 403 },
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
    return NextResponse.json({ message: "Lỗi server" }, { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { isActive } = body;
    const { role } = body;
    const pool = await getPool();
    console.log(`role...........`, role);
    console.log(`id...........`, id);
    console.log(`isActive...........`, isActive);
    const [users] = await pool.query(
      "SELECT username FROM users WHERE id = ?",
      [id],
    );
    //check user
    if (users.length === 0) {
      return Response.json({ message: "Không tìm thấy user" }, { status: 404 });
    }
    //check admin
    if (users[0].username === "admin") {
      return Response.json(
        { message: "Không thể thay đổi admin" },
        { status: 403 },
      );
    }
    if (isActive === false || isActive === true) {
      const activeValue = Number(Boolean(isActive));
      if (typeof isActive !== "boolean") {
        return Response.json(
          { message: "Trạng thái không hợp lệ" },
          { status: 400 },
        );
      }
      await pool.query("UPDATE users SET isActive = ? WHERE id = ?", [
        activeValue,
        id,
      ]);
    }

    if (role) {
      await pool.query("UPDATE users SET role = ? WHERE id = ?", [role, id]);
    }

    return Response.json({ message: "Cập nhật thành công" }, { status: 200 });
  } catch (error) {
    console.error("PATCH ERROR:", error);
    return Response.json({ message: "Lỗi server" }, { status: 500 });
  }
}
