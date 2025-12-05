import { NextResponse } from "next/server";
import { getPool } from "@/lib/mssql";

export async function GET() {
  try {
    const pool = await getPool();

    const result = await pool.request().query(`
      SELECT 
        Id,
        Username,
        Role,
        LastLogin
      FROM Users
      ORDER BY Id DESC
    `);

    return NextResponse.json({
      users: result.recordset,
    });
  } catch (error) {
    console.error("Get all users error:", error);
    return NextResponse.json(
      { message: "Lỗi server", error: error.message },
      { status: 500 }
    );
  }
}
