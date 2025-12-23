import { NextResponse } from "next/server";
import { getPool } from "@/lib/db";

export async function DELETE(req, context) {
  const { id } = await context.params; // ✅ FIX
  const categoryId = Number(id);
  console.log("categoryId........", categoryId);

  const pool = getPool();
  try {
    // 1️⃣ kiểm tra có category con không
    const [[child]] = await pool.query(
      "SELECT COUNT(*) AS total FROM categories WHERE parent = ?",
      [categoryId]
    );
    console.log("child........", child);

    if (!categoryId) {
      return NextResponse.json({ message: "ID không hợp lệ" }, { status: 400 });
    }

    if (child.total > 0) {
      return NextResponse.json(
        { message: "Không thể xóa: danh mục còn danh mục con" },
        { status: 400 }
      );
    }

    // 2️⃣ xóa category
    const [result] = await pool.query("DELETE FROM categories WHERE id = ?", [
      categoryId,
    ]);

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { message: "Category không tồn tại" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Xóa category thành công",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Lỗi khi xóa category", error },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  const pool = getPool();
  const { id } = await params;
  try {
    const body = await req.json();
    const { name, parent } = body;

    if (!name || !name.trim()) {
      return NextResponse.json(
        { message: "Tên danh mục không được để trống" },
        { status: 400 }
      );
    }

    // 1️⃣ kiểm tra category tồn tại
    const [[exist]] = await pool.query(
      "SELECT id FROM categories WHERE id = ?",
      [id]
    );
    console.log("id........",id);
    
    if (!exist) {
      return NextResponse.json(
        { message: "Category không tồn tại" },
        { status: 404 }
      );
    }

    // 2️⃣ không cho parent = chính nó
    if (Number(parent) === Number(id)) {
      return NextResponse.json(
        { message: "Danh mục cha không hợp lệ" },
        { status: 400 }
      );
    }

    // 3️⃣ update
    await pool.query(
      "UPDATE categories SET name = ?, parent = ? WHERE id = ?",
      [name.trim(), parent ?? null, id]
    );

    return NextResponse.json({
      message: "Cập nhật danh mục thành công",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Lỗi khi cập nhật danh mục", error },
      { status: 500 }
    );
  }
}
