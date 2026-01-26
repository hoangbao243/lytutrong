import { NextResponse } from "next/server";
import { getPool } from "@/lib/db";

export async function GET(req) {
  const pool = await getPool();

  const [rows] = await pool.execute(
    `
    SELECT
      *
    FROM footer
    `,
  );

  return NextResponse.json({
    rows,
  });
}

export async function PUT(req) {
  try {
    const body = await req.json();

    const {
      principal,
      year,
      address,
      phone
    } = body;

    if (!principal || !year || !address || !phone) {
      return NextResponse.json(
        { message:"Vui lòng điền đủ thông tin "},
        { status: 400 }
      );
    }

    const pool = await getPool();

    // 1️⃣ Check footer tồn tại
    const [exists] = await pool.execute(`SELECT id FROM footer WHERE id = ?`, [
      1,
    ]);

    if (exists.length === 0) {
      return NextResponse.json(
        { message: "Footer không tồn tại" },
        { status: 404 }
      );
    }

    // 2️⃣ Update bài viết
    await pool.execute(
      `
      UPDATE footer SET
        principal = ?,
        year = ?,
        address = ?,
        phone = ?
      WHERE id = 1
      `,
      [
        principal,
        year,
        address,
        phone
      ]
    );

    // 3️⃣ Lấy lại bài vừa update
    const [rows] = await pool.execute(`SELECT * FROM footer WHERE id = ?`, [1]);

    return NextResponse.json({
      message: "Cập nhật bài viết thành công",
      data: rows,
    });
  } catch (error) {
    console.error("UPDATE POST ERROR:", error);
    return NextResponse.json({ message: "Lỗi server" }, { status: 500 });
  }
}
