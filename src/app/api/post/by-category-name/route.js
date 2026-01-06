import { NextResponse } from "next/server";
import { getPool } from "@/lib/db";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");
  const limit = Number(searchParams.get("limit"))


  if (!name) {
    return NextResponse.json(
      { message: "Thiếu category name" },
      { status: 400 }
    );
  }

  const pool = await getPool();

  const [rows] = await pool.execute(
    `
    SELECT p.*
    FROM posts p
    JOIN categories c ON p.categoryId = c.id
    WHERE c.name = ?
      AND p.status = 1
    ORDER BY p.updateDate DESC
    LIMIT ?
    `,
    [name, limit]
  );

  return NextResponse.json({ ok: true, data: rows });
}
