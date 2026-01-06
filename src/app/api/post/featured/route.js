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
      DATE_FORMAT(updateDate, '%d/%m/%Y %H:%i:%s') AS updateDate,
      views,
      status,
      featured
    FROM posts
    WHERE status = 1
    ORDER BY featured DESC
    LIMIT 4
    `
  );

  return NextResponse.json({
    ok: true,
    data: rows,
  });
}
