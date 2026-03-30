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
    LIMIT 4 OFFSET 5
    `
  );

  return NextResponse.json({
    ok: true,
    data: rows,
  });
}
