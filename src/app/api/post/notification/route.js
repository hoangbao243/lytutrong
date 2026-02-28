import { NextResponse } from "next/server";
import { getPool } from "@/lib/db";

export async function GET() {

  const pool = await getPool();

  const [rows] = await pool.execute(
    `
    SELECT *
      FROM posts
      WHERE notification = 1
        AND status = 1
        AND publish_date <= NOW()
      ORDER BY publish_date DESC
      LIMIT 4
    `
  );

  return NextResponse.json({ ok: true, data: rows });
}
