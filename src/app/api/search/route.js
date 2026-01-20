import { NextResponse } from "next/server";
import { getPool } from "@/lib/db";

const LIMIT = 6;

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const q = searchParams.get("q") || "";
  const page = Number(searchParams.get("page") || 1);
  const offset = (page - 1) * LIMIT;

  const pool = await getPool();

  // Tổng số bản ghi
  const [[{ total }]] = await pool.query(
    `
    SELECT COUNT(*) as total
    FROM posts
    WHERE caption LIKE ? OR description LIKE ?
    `,
    [`%${q}%`, `%${q}%`]
  );

  // Data phân trang
  const [rows] = await pool.query(
    `
    SELECT *
    FROM posts
    WHERE caption LIKE ? OR description LIKE ?
    ORDER BY createDate DESC
    LIMIT ? OFFSET ?
    `,
    [`%${q}%`, `%${q}%`, LIMIT, offset]
  );

  return NextResponse.json({
    data: rows,
    pagination: {
      total,
      page,
      limit: LIMIT,
      totalPages: Math.ceil(total / LIMIT),
    },
  });
}
