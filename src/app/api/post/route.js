import { NextResponse } from "next/server";
import { getPool } from "@/lib/db";

export async function GET(req) {
  const pool = await getPool();

  const [rows] = await pool.execute(
    `
    SELECT
      id,
      src,
      caption,
      description,
      categoryId,
      createDate,
      updateDate,
      views,
      status,
      featured,
      publish_date
    FROM posts
    WHERE status = 1
    AND publish_date <= NOW()
    ORDER BY publish_date DESC
    `
  );

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "5");

  // Tính toán phân trang
  const start = (page - 1) * limit;
  const end = start + limit;

  const paginatedData = rows.slice(start, end);

  return Response.json({
    page,
    limit,
    total: rows.length,
    totalPages: Math.ceil(rows.length / limit),
    data: paginatedData,
  });
}

export async function POST(req) {
  try {
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

    if (!caption || !fulltext) {
      return NextResponse.json(
        { message: "Thiếu tiêu đề hoặc nội dung" },
        { status: 400 }
      );
    }

    const pool = await getPool();

    const [result] = await pool.execute(
      `
      INSERT INTO posts
      (src, caption, \`fulltext\`,description ,categoryId, userId, \`status\`, featured, notification,  \`views\`, createDate, updateDate, publish_date)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 0, NOW(), NOW(), ?)
      `,
      [
        src ?? null,
        caption,
        fulltext,
        description ?? null,
        categoryId == 0 ? 2 : categoryId,
        userId ?? 1,
        status ?? 1,
        featured ?? 0,
        notification ?? 0,
        publish_date ?? new Date()
      ]
    );

    // Lấy bài vừa tạo
    const [rows] = await pool.execute(
      `SELECT * FROM posts WHERE id = ?`,
      [result.insertId]
    );

    return NextResponse.json({
      message: "Tạo bài viết thành công",
      data: rows[0],
    });
  } catch (error) {
    console.error("CREATE POST ERROR:", error);
    return NextResponse.json(
      { message: "Lỗi server" },
      { status: 500 }
    );
  }
}