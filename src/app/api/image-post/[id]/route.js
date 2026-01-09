import { NextResponse } from "next/server";
import { getPool } from "@/lib/db";

export async function GET(req, { params }) {
  try {
    const pool = await getPool();
    const { id } = await params; // ✅ đúng

    const [rows] = await pool.execute(
      `
      SELECT
        *
      FROM image_posts
      WHERE post_id = ?
      ORDER BY createDate DESC
      `,
      [id]
    );

    return NextResponse.json({
      data: rows,
    });
  } catch (error) {
    console.error("GET IMAGE POSTS ERROR:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}