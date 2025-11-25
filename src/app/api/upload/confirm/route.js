import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST() {
  try {
    const tempDir = path.join(process.cwd(), "public/uploads/temp");
    const imagesDir = path.join(process.cwd(), "public/uploads/images");

    // Tạo thư mục nếu chưa tồn tại
    await fs.mkdir(tempDir, { recursive: true });
    await fs.mkdir(imagesDir, { recursive: true });

    // Lấy danh sách file trong temp
    const files = await fs.readdir(tempDir);

    // Di chuyển từng file
    await Promise.all(
      files.map(async (file) => {
        const oldPath = path.join(tempDir, file);
        const newPath = path.join(imagesDir, file);

        await fs.rename(oldPath, newPath); // MOVE
      })
    );

    return NextResponse.json({
      success: true,
      message: "Đã chuyển toàn bộ file từ temp sang images",
      moved: files,
      files: files.map((name) => ({
        old: "/uploads/temp/" + name,
        new: "/uploads/images/" + name,
      })),
    });
  } catch (err) {
    console.error("MOVE ERROR:", err);
    return NextResponse.json(
      { error: "Move failed", detail: err.toString() },
      { status: 500 }
    );
  }
}
