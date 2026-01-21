import { NextResponse } from "next/server";
import { getPool } from "@/lib/db";
import { cookies } from "next/headers";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const pool = await getPool();
    if (!id) {
      return NextResponse.json(
        { message: "Thiếu ID bài viết" },
        { status: 400 }
      );
    }
    const cookieStore = await cookies();
    const viewedKey = `viewed_post_${id}`;
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const hasViewed = cookieStore.get(viewedKey);

     // 🔹 Nếu CHƯA xem → tăng view
    if (!hasViewed) {
      await pool.execute(
        `
        INSERT INTO views (year, month, views)
        VALUES (?, ?, 1)
        ON DUPLICATE KEY UPDATE views = views + 1
        `,
        [year, month]
      );

      await pool.execute(
      `
      UPDATE posts
      SET views = views + 1
      WHERE id = ?
      `,
      [id]
    );
    }
    
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
          notification,
          \`views\`,
          createDate,
          updateDate,
          publish_date
        FROM posts
        WHERE id = ?
          AND status = 1
        LIMIT 1;
      `,
      [id]
    );

    const post = rows[0];

    if (!post) {
      return NextResponse.json({ message: "News not found" }, { status: 404 });
    }

    const res = NextResponse.json({
      ok: true,
      data: post,
    });
    res.cookies.set(viewedKey, "1", {
    maxAge: 60 * 30, // 30 phút
    path: "/",
    });
    return res;
  } catch (error) {
    console.error("Get post error:", error);
    return NextResponse.json({ message: "Lỗi server" }, { status: 500 });
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
    await pool.execute(`DELETE FROM posts WHERE id = ?`, [id]);

    return NextResponse.json({
      message: "Xóa bài viết thành công",
      deletedId: Number(id),
    });
  } catch (error) {
    console.error("Delete post error:", error);
    return NextResponse.json({ message: "Lỗi server" }, { status: 500 });
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
      notification,
      publish_date,
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
    const [exists] = await pool.execute(`SELECT id FROM posts WHERE id = ?`, [
      id,
    ]);

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
        notification = ?,
        updateDate = NOW(),
      WHERE id = ?
      AND publish_date <= NOW()
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
        notification ?? 0,
        publish_date ?? new Date(),
        id,
      ]
    );

    // 3️⃣ Lấy lại bài vừa update
    const [rows] = await pool.execute(`SELECT * FROM posts WHERE id = ?`, [id]);

    return NextResponse.json({
      message: "Cập nhật bài viết thành công",
      data: rows[0],
    });
  } catch (error) {
    console.error("UPDATE POST ERROR:", error);
    return NextResponse.json({ message: "Lỗi server" }, { status: 500 });
  }
}
