import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST() {
  try {
    const tempDir = path.join(process.cwd(), "public/uploads/temp");

    // Tạo thư mục nếu chưa tồn tại
    await fs.mkdir(tempDir, { recursive: true });

    // Đọc tất cả file trong thư mục
    const files = await fs.readdir(tempDir);

    // Xóa từng file
    await Promise.all(
      files.map(file => fs.unlink(path.join(tempDir, file)))
    );

    return NextResponse.json({
      success: true,
      message: "Đã xóa toàn bộ file trong thư mục temp",
      deleted: files,
    });
  } catch (err) {
    console.error("CLEANUP ERROR:", err);
    return NextResponse.json(
      { error: "Failed to clean temp folder", detail: err.toString() },
      { status: 500 }
    );
  }
}
