import { NextResponse } from "next/server";
import { getPool } from "@/lib/db";

function buildTree(categories, parentId = null) {
  return categories
    .filter((item) => item.parent === parentId)
    .map((item) => ({
      ...item,
      children: buildTree(categories, item.id),
    }));
}

export async function GET(req) {
  const pool = getPool();
  try {
    const { searchParams } = new URL(req.url);
    const flat = searchParams.get("flat");
    const [rows] = await pool.query(
      "SELECT id, name, parent FROM categories"
    );

    //lấy mảng phẳng
    if (flat) {
      return NextResponse.json(rows);
    }
    //lấy mảng phân cấp
    const tree = buildTree(rows);

    return NextResponse.json(tree);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching categories", error },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  const pool = getPool();

  try {
    const body = await req.json();
    const { name, parent } = body;

    if (!name || !name.trim()) {
      return NextResponse.json(
        { message: "Tên danh mục không được để trống" },
        { status: 400 }
      );
    }

    await pool.query(
      "INSERT INTO categories (name, parent) VALUES (?, ?)",
      [name.trim(), parent ?? null]
    );

    return NextResponse.json({
      message: "Thêm danh mục thành công",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Lỗi khi thêm danh mục", error },
      { status: 500 }
    );
  }
}
