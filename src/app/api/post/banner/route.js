import { NextResponse } from "next/server";
import { getPool } from "@/lib/db";

export async function GET() {
  const pool = await getPool();
  const LIMIT = 6;

  const [rows] = await pool.execute(
    `
    SELECT
      id,
      src,
      caption,
      views,
      publish_date
    FROM posts
    WHERE notification = 1 
        AND status = 1
        AND publish_date <= NOW()
    ORDER BY publish_date DESC
    LIMIT ?
    `,[LIMIT]
  );

  return NextResponse.json(rows);
}