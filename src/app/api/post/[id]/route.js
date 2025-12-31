import { NextResponse } from "next/server";
import { getPool } from "@/lib/db";

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { message: "Thiếu ID bài viết" },
        { status: 400 }
      );
    }

    const pool = getPool();

    const [rows] = await pool.execute(
      `
        SELECT
          id,
          src,
          caption,
          \`fulltext\`,
          description,
          categoryId,
          userId,
          \`status\`,
          featured,
          \`views\`,
          createDate,
          updateDate
        FROM posts
        WHERE id = ?
        LIMIT 1;
      `,
      [id]
    );

    const post = rows[0];

    if (!post) {
      return NextResponse.json(
        { message: "News not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ok: true,
      data: post,
    });
  } catch (error) {
    console.error("Get post error:", error);
    return NextResponse.json(
      { message: "Lỗi server" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/news/[id]
 */
export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { message: "Thiếu ID bài viết!" },
        { status: 400 }
      );
    }

    const pool = getPool();

    // 🔹 Kiểm tra bài viết tồn tại
    const [checkRows] = await pool.execute(
      `SELECT id FROM posts WHERE id = ? LIMIT 1`,
      [id]
    );

    if (checkRows.length === 0) {
      return NextResponse.json(
        { message: "Bài viết không tồn tại" },
        { status: 404 }
      );
    }

    // 🔹 Xóa bài viết
    await pool.execute(
      `DELETE FROM posts WHERE id = ?`,
      [id]
    );

    return NextResponse.json({
      message: "Xóa bài viết thành công",
      deletedId: Number(id),
    });
  } catch (error) {
    console.error("Delete post error:", error);
    return NextResponse.json(
      { message: "Lỗi server" },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const body = await req.json();

    const {
      src,
      caption,
      fulltext,
      description,
      categoryId,
      userId = 1,
      status,
      featured,
    } = body;

    if (!id) {
      return NextResponse.json(
        { message: "Thiếu ID bài viết" },
        { status: 400 }
      );
    }

    if (!caption || !fulltext) {
      return NextResponse.json(
        { message: "Thiếu tiêu đề hoặc nội dung" },
        { status: 400 }
      );
    }

    const pool = await getPool();

    // 1️⃣ Check bài viết tồn tại
    const [exists] = await pool.execute(
      `SELECT id FROM posts WHERE id = ?`,
      [id]
    );

    if (exists.length === 0) {
      return NextResponse.json(
        { message: "Bài viết không tồn tại" },
        { status: 404 }
      );
    }

    // 2️⃣ Update bài viết
    await pool.execute(
      `
      UPDATE posts SET
        src = ?,
        caption = ?,
        \`fulltext\` = ?,
        description = ?,
        categoryId = ?,
        userId = ?,
        \`status\` = ?,
        featured = ?,
        updateDate = NOW()
      WHERE id = ?
      `,
      [
        src,
        caption,
        fulltext,
        description ?? null,
        categoryId == 0 ? 2 : categoryId,
        userId ?? 1,
        status ?? 1,
        featured ?? 0,
        id,
      ]
    );

    // 3️⃣ Lấy lại bài vừa update
    const [rows] = await pool.execute(
      `SELECT * FROM posts WHERE id = ?`,
      [id]
    );

    return NextResponse.json({
      message: "Cập nhật bài viết thành công",
      data: rows[0],
    });
  } catch (error) {
    console.error("UPDATE POST ERROR:", error);
    return NextResponse.json(
      { message: "Lỗi server" },
      { status: 500 }
    );
  }
}