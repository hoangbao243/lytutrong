import { getPool } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const pool = getPool();

    const [rows] = await pool.query(
      "SELECT id, username, isActive, lastlogin, role FROM users ORDER BY id DESC"
    );
    console.error("Get users :", rows);
    return new NextResponse(
      JSON.stringify({ users: rows }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("Get users error:", err);
    return new NextResponse(
      JSON.stringify({ message: "Lỗi servers" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

