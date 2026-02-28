import { NextResponse } from "next/server";
import { getPool } from "@/lib/db";

const LIMIT = 8;

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const q = searchParams.get("q") || "";
  const keyword = searchParams.get("keyword") || "";
  const page = Number(searchParams.get("page") || 1);
  const offset = (page - 1) * LIMIT;
  console.log("qqqqqqqqqqqqqq",q);
  console.log("keyword...........",keyword);
  const pool = await getPool();
  const search = q ? q : keyword;
  const searchValue = `%${search || ""}%`;

  // Tổng số bản ghi
  const [[{ total }]] = await pool.query(
    `
    SELECT COUNT(*) as total
    FROM posts
    WHERE caption LIKE ?
    `,
    [searchValue]
  );

  // Data phân trang
  const [rows] = await pool.query(
    `
    SELECT *
    FROM posts
    WHERE caption LIKE ?
    ORDER BY createDate DESC
    LIMIT ? OFFSET ?
    `,
    [searchValue, LIMIT, offset]
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
