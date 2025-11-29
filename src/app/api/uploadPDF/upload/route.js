// app/api/uploadPDF/route.js
import { NextResponse } from "next/server";
import { uploadFile } from "@/models/Uploads.model";
import fs from "fs";
import path from "path";
import os from "os";

export async function POST(req) {
  try {
    const form = await req.formData();
    const file = form.get("file");

    if (!file) {
      return NextResponse.json(
        { error: "Không có file được upload" },
        { status: 400 }
      );
    }

    // Chuyển file Blob → Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Tạo đường dẫn tạm
    const tempDir = os.tmpdir();
    const tempPath = path.join(tempDir, `${Date.now()}-${file.name}`);

    // Ghi file vào thư mục tạm
    await fs.promises.writeFile(tempPath, buffer);

    // Gọi hàm upload Google Drive của bạn
    const result = await uploadFile({ localPath: tempPath });

    // Xóa file tạm sau khi upload xong
    await fs.promises.unlink(tempPath);

    return NextResponse.json({
      success: true,
      ...result,
    });

  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json(
      { error: "Lỗi upload PDF" },
      { status: 500 }
    );
  }
}
