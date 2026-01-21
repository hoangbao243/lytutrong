import { NextResponse } from "next/server";
import { getPool } from "@/lib/db";

export async function GET() {
  const pool = await getPool();

  const [rows] = await pool.execute(
    `
    SELECT SUM(views) AS total
    FROM views
    WHERE year = YEAR(NOW());
    `,
  );

  return NextResponse.json(rows);
}
