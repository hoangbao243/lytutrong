import { NextResponse } from "next/server";
import { getPool } from "@/lib/db";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const categoryId = Number(id);

    if (!categoryId) {
      return NextResponse.json(
        { message: "Thiếu categoryId" },
        { status: 400 },
      );
    }

    const { searchParams } = new URL(request.url);
    const limit = Number(searchParams.get("limit"));
    const admin = searchParams.get("admin");
    const page = parseInt(searchParams.get("page") || "1");
    const pool = await getPool();

    // Tính toán phân trang
    const start = (page - 1) * limit;
    const end = start + limit;

    if (limit && !admin) {
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

    if (admin && limit) {
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
        views,
        status,
        featured,
        notification,
        userId,
        publish_date
      FROM posts
      WHERE categoryId = ?
        AND status = 1
        AND publish_date <= NOW()
      ORDER BY publish_date DESC
      `,
        [categoryId],
      );
      
      const paginatedData = rows.slice(start, end);

      return NextResponse.json({
        page,
        limit,
        total: rows.length,
        totalPages: Math.ceil(rows.length / limit),
        data: paginatedData,
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
      [categoryId],
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
