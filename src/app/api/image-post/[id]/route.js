import { NextResponse } from "next/server";
import { getPool } from "@/lib/db";

export async function GET(req, { params }) {
  try {
    const pool = await getPool();
    const { id } = await params; // ✅ đúng

    const [rows] = await pool.execute(
      `
      SELECT
        *
      FROM image_posts
      WHERE post_id = ?
      ORDER BY createDate DESC
      `,
      [id]
    );
    const title = await pool.execute(
      `
      SELECT
        title
      FROM library_image_posts
      WHERE id = ?
      `,
      [id]
    );

    return NextResponse.json({
      data: rows,
      title: title[0],
    });
  } catch (error) {
    console.error("GET IMAGE POSTS ERROR:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req, context) {
  const { id } = await context.params; // ✅ FIX
  console.log("id........", Number(id));

  const pool = getPool();
  try {
    if (!Number(id)) {
      return NextResponse.json({ message: "ID không hợp lệ" }, { status: 400 });
    }

    //  xóa 
    const [result] = await pool.query("DELETE FROM library_image_posts WHERE id = ?", [
      Number(id),
    ]);

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { message: "Bài viết không tồn tại" },
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
  const { id } = params;

  try {
    if (!Number(id)) {
      return NextResponse.json(
        { message: "ID không hợp lệ" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { images } = body;

    /**
     * images có thể là:
     * [
     *   { src: "/uploads/2026/01/a.jpg", caption: "ảnh 1" },
     *   { src: "/uploads/2026/01/b.jpg", caption: "ảnh 2" }
     * ]
     */

    if (!Array.isArray(images)) {
      return NextResponse.json(
        { message: "Danh sách ảnh không hợp lệ" },
        { status: 400 }
      );
    }

    const pool = getPool();

    const [result] = await pool.query(
      `
      UPDATE image_posts
      SET images = ?, updated_at = NOW()
      WHERE id = ?
      `,
      [JSON.stringify(images), Number(id)]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { message: "Bài viết không tồn tại" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Cập nhật danh sách ảnh thành công",
    });
  } catch (error) {
    console.error("UPDATE IMAGE_POSTS ERROR:", error);
    return NextResponse.json(
      { message: "Lỗi khi cập nhật danh sách ảnh", error },
      { status: 500 }
    );
  }
}