import { NextResponse } from "next/server";
import { getPool } from "@/lib/db";

export async function GET(req, { params }) {
  try {
    const { slug } = await params;

    if (!slug) {
      return NextResponse.json(
        { ok: false, message: "Thiếu slug" },
        { status: 400 }
      );
    }

    const pool = await getPool();
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page")) || 1;
    const limit = Math.min(Number(searchParams.get("limit")) || 6, 20);
    const offset = (page - 1) * limit;

    let countSql = "";
    let dataSql = "";
    let sqlParams = [];

    // =========================
    // CASE 1: tin-noi-bat (featured)
    // =========================
    if (slug === "tin-noi-bat") {
      countSql = `
        SELECT COUNT(*) AS total
        FROM posts
        WHERE status = 1
          AND featured = 1
          AND publish_date <= NOW()
      `;
      dataSql = `
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
          publish_date
        FROM posts
        WHERE status = 1
          AND featured = 1
          AND publish_date <= NOW()
        ORDER BY publish_date DESC
        LIMIT ? OFFSET ?
      `;

      sqlParams = [limit, offset];
    }

    // =========================
    // CASE 2: tin-tuc-nha-truong / hoat-dong-giang-day
    // =========================
    else if (
      slug === "tin-tuc-nha-truong" ||
      slug === "hoat-dong-giang-day"
    ) {
      countSql = `
        SELECT COUNT(*) AS total
        FROM posts 
        WHERE status = 1
          AND categoryId = 2
          AND p.publish_date <= NOW()
      `;

      dataSql = `
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
          publish_date
        FROM posts
        WHERE status = 1
          AND categoryId = 2
          AND p.publish_date <= NOW()
        ORDER BY publish_date DESC
        LIMIT ? OFFSET ?
      `;

      sqlParams = [limit, offset];
    }

    // =========================
    // SLUG KHÔNG HỢP LỆ
    // =========================
    else {
      return NextResponse.json(
        { ok: false, message: "Slug không hợp lệ" },
        { status: 404 }
      );
    }

    // ===== Execute =====
    const [[{ total }]] = await pool.execute(
      countSql,
      slug === "tin-noi-bat" ? [] : [slug]
    );

    const [rows] = await pool.execute(dataSql, sqlParams);

    return NextResponse.json({
      ok: true,
      data: rows,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get posts by slug error:", error);
    return NextResponse.json(
      { ok: false, message: "Lỗi server" },
      { status: 500 }
    );
  }
}
