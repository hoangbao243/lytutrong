import { NextResponse } from "next/server";
import { getPool } from "@/lib/db";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const categoryId = Number(id);

    if (!categoryId) {
      return NextResponse.json(
        { message: "Thiếu categoryId" },
        { status: 400 }
      );
    }

    const { searchParams } = new URL(request.url);
    const limit = Number(searchParams.get("limit"));
    const pool = await getPool();

    if (limit) {
      const [rows] = await pool.execute(
        `
      SELECT
        id,
        src,
        caption,
        description,
        categoryId,
        createDate,
        updateDate,
        views
      FROM posts
      WHERE categoryId = ?
        AND status = 1
      ORDER BY updateDate DESC
      LIMIT ?
      `,
        [categoryId, limit]
      );
      return NextResponse.json({
        ok: true,
        data: rows,
      });
    }

    const [rows] = await pool.execute(
      `
      SELECT
        id,
        src,
        caption,
        description,
        categoryId,
        createDate,
        updateDate,
        views
      FROM posts
      WHERE categoryId = ?
        AND status = 1
      ORDER BY updateDate DESC
      LIMIT 18446744073709551615 OFFSET 1
      `,
      [categoryId]
    );

    return NextResponse.json({
      ok: true,
      data: rows,
    });
  } catch (error) {
    console.error("Get posts by category error:", error);
    return NextResponse.json({ message: "Lỗi server" }, { status: 500 });
  }
}
