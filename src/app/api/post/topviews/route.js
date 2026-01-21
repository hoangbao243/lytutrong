import { NextResponse } from "next/server";
import { getPool } from "@/lib/db";

export async function GET() {
  const pool = await getPool();
  const LIMIT = 5;

  const [rows] = await pool.execute(
    `
    SELECT
      id,
      src,
      caption,
      views,
      publish_date
    FROM posts
    WHERE status = 1
    AND publish_date <= NOW()
    ORDER BY views DESC
    LIMIT ?
    `,[LIMIT]
  );

  return NextResponse.json(rows);
}