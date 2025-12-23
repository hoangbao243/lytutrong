import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

export async function POST(req) {
  try {
    const form = await req.formData();
    const file = form.get("file");

    if (!file)
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });

    // File → Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Thư mục upload tạm
    const uploadDir = path.join(process.cwd(), "public/uploads/temp");
    await fs.mkdir(uploadDir, { recursive: true });

    // Tên file mới
    const fileName = Date.now() + "-" + file.name.replaceAll(" ", "_");
    const filePath = path.join(uploadDir, fileName);

    // NÉN + RESIZE + CONVERT WEBP
    await sharp(buffer)
      .resize({
        width: 1600,              // giới hạn chiều rộng
        withoutEnlargement: true, // không phóng to ảnh nhỏ
      })
      .webp({
        quality: 75,              // 70–80 là tối ưu web
      })
      .toFile(filePath);
    // await fs.writeFile(filePath, buffer);

    return NextResponse.json({
      url: "/uploads/temp/" + fileName,
    });
  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    return NextResponse.json(
      { error: "Upload failed", detail: err.toString() },
      { status: 500 }
    );
  }
}
