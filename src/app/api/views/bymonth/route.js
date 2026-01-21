import { NextResponse } from "next/server";
import { getPool } from "@/lib/db";

export async function GET() {
  const pool = await getPool();

  const [rows] = await pool.execute(
    `
    SELECT year, month, views
    FROM views
    WHERE year = YEAR(NOW())
    ORDER BY month ASC
    LIMIT 12;
    `,
  );

  return NextResponse.json(rows);
}
