import { NextResponse } from "next/server";
import { getPool } from "@/lib/db";

export async function DELETE(req, { params }) {
  const { id } = await params;
  const pool = getPool();
  try {
    if (!Number(id)) {
      return NextResponse.json({ message: "ID không hợp lệ" }, { status: 400 });
    }

    //  xóa
    const [result] = await pool.query("DELETE FROM image_posts WHERE id = ?", [
      Number(id),
    ]);

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { message: "Bài viết không tồn tại" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      message: "Xóa ảnh thành công",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Lỗi khi xóa category", error },
      { status: 500 },
    );
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = await params; // post_id
    const pool = await getPool();

    const { title, description, images } = await req.json();

    // =========================
    // 1. Update library_image_posts
    // =========================
    const fields = [];
    const values = [];
    if (title !== undefined) {
      fields.push("title = ?");
      values.push(title);
    }
    if (description !== undefined) {
      fields.push("description = ?");
      values.push(description);
    }

    if (fields.length > 0) {
      values.push(id);

      await pool.execute(
        `
        UPDATE library_image_posts
        SET ${fields.join(", ")}
        WHERE id = ?
        `,
        values,
      );
    }

    // =========================
    // 2. Update sort_order từng ảnh
    // =========================
    if (Array.isArray(images) && images.length > 0) {
      const updatePromises = images.map((img, index) =>
        pool.execute(
          `
          UPDATE image_posts
          SET sort_order = ?
          WHERE id = ? AND post_id = ?
          `,
          [index + 1, img.id, id], // ✅ sort_order = index + 1
        ),
      );

      await Promise.all(updatePromises);
    }

    return Response.json({
      message: "Update library image post success",
    });
  } catch (error) {
    console.error("UPDATE IMAGE_POSTS ERROR:", error);

    return Response.json(
      { message: "Update failed", error: error.message },
      { status: 500 },
    );
  }
}
