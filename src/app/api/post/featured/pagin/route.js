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
    AND featured = 1
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

  return NextResponse.json({
    page,
    limit,
    total: rows.length,
    totalPages: Math.ceil(rows.length / limit),
    data: paginatedData,
  });
}