import { NextResponse } from "next/server";
import { getPool } from "@/lib/db";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const pool = await getPool();
    const isCategory = id >= 1 && id <= 23;
    if (!id) {
      return NextResponse.json(
        { message: "Thiếu ID bài viết" },
        { status: 400 }
      );
    }
    if (isCategory) {
      const [rows] = await pool.execute(
        `
      SELECT *
      FROM posts
      WHERE categoryId = ?
        AND status = 1
      ORDER BY updateDate DESC
      LIMIT 1
      `,
        [id]
      );
      const post = rows[0];
      if (!post) {
        return NextResponse.json(
          { message: "News not found" },
          { status: 404 }
        );
      }

      return NextResponse.json({
        ok: true,
        data: post,
      });
    }
  } catch (error) {
    console.error("Get post error:", error);
    return NextResponse.json({ message: "Lỗi server" }, { status: 500 });
  }
}