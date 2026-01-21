import { NextResponse } from "next/server";
import { getPool } from "@/lib/db";
import { cookies } from "next/headers";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const pool = await getPool();
    const isCategory = id >= 1 && id <= 23;
    if (!id) {
      return NextResponse.json(
        { message: "Thiếu ID bài viết" },
        { status: 400 },
      );
    }
    if (isCategory) {
      const cookieStore = await cookies();
      const viewedKey = `viewed_post_${id}`;
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1;
      const hasViewed = cookieStore?.get(viewedKey);

      if (!hasViewed) {
        await pool.execute(
          `
          INSERT INTO views (year, month, views)
          VALUES (?, ?, 1)
          ON DUPLICATE KEY UPDATE views = views + 1
          `,
          [year, month],
        );

        await pool.execute(
          `
        UPDATE posts
        SET views = views + 1
        WHERE id = ?
        `,
          [id],
        );
      }

      const [rows] = await pool.execute(
        `
      SELECT *
      FROM posts
      WHERE categoryId = ?
        AND status = 1
      ORDER BY updateDate DESC
      LIMIT 1
      `,
        [id],
      );
      const post = rows[0];
      if (!post) {
        return NextResponse.json(
          { message: "News not found" },
          { status: 404 },
        );
      }
      const res = NextResponse.json({
        ok: true,
        data: post,
      });
      if (isCategory && !hasViewed) {
        res.cookies.set(viewedKey, "1", {
          maxAge: 60 * 30, // 30 phút
          path: "/",
        });
      }
      return res;
    }
  } catch (error) {
    console.error("Get post error:", error);
    return NextResponse.json({ message: "Lỗi server" }, { status: 500 });
  }
}
