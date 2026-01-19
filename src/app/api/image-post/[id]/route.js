import { NextResponse } from "next/server";
import { getPool } from "@/lib/db";
import { uploadImage } from "@/models/Uploads.model";
import fs from "fs/promises";
import path from "path";
import os from "os";
import sharp from "sharp";

export async function GET(req, { params }) {
  try {
    const pool = await getPool();
    const { id } = await params; // ✅ đúng

    const [rows] = await pool.execute(
      `
      SELECT
        *
      FROM image_posts
      WHERE post_id = ?
      ORDER BY sort_order ASC
      `,
      [id]
    );
    const title = await pool.execute(
      `
      SELECT
        title
      FROM library_image_posts
      WHERE id = ?
      `,
      [id]
    );

    return NextResponse.json({
      data: rows,
      title: title[0],
    });
  } catch (error) {
    console.error("GET IMAGE POSTS ERROR:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req, context) {
  const { id } = await context.params; // ✅ FIX
  console.log("id........", Number(id));

  const pool = getPool();
  try {
    if (!Number(id)) {
      return NextResponse.json({ message: "ID không hợp lệ" }, { status: 400 });
    }

    //  xóa
    const [result] = await pool.query(
      "DELETE FROM library_image_posts WHERE id = ?",
      [Number(id)]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { message: "Bài viết không tồn tại" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Xóa category thành công",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Lỗi khi xóa category", error },
      { status: 500 }
    );
  }
}

export async function POST(req, { params }) {
  const { id } = await params;
  const formData = await req.formData();
  const pool = getPool();

  try {
    if (!Number(id)) {
      return NextResponse.json({ message: "ID không hợp lệ" }, { status: 400 });
    }

    const images = formData.getAll("images");
    
    const imageUrls = [];

    if (!Array.isArray(images)) {
      return NextResponse.json(
        { message: "Danh sách ảnh không hợp lệ" },
        { status: 400 }
      );
    }

    let lenImages = Number(formData.getAll("lenImages")[0]);
    
    

    for (const file of images) {
      const buffer = Buffer.from(await file.arrayBuffer());

      // file tạm gốc
      const tempInput = path.join(os.tmpdir(), `${Date.now()}-${file.name}`);

      // file tạm sau khi sharp
      const tempOutput = tempInput.replace(/\.\w+$/, ".webp");

      // ghi file gốc
      await fs.writeFile(tempInput, buffer);

      // =========================
      // 3️⃣ SHARP RESIZE + WEBP
      // =========================
      await sharp(buffer)
        .resize({
          width: 1600,
          withoutEnlargement: true,
        })
        .webp({
          quality: 75,
        })
        .toFile(tempOutput);

      // =========================
      // 4️⃣ UPLOAD GOOGLE DRIVE
      // =========================
      const { fileId } = await uploadImage({
        localPath: tempOutput,
      });

      // =========================
      // 5️⃣ CLEAN FILE TẠM
      // =========================
      try {
        await fs.unlink(tempInput);
        await fs.unlink(tempOutput);
      } catch (err) {
        console.warn("Không xoá được file temp:", err.message);
      }

      const imageUrl = `https://drive.google.com/thumbnail?id=${fileId}&sz=w800`;
      imageUrls.push(imageUrl);
      // =========================
      // 6️⃣ INSERT post_images
      // =========================
      await pool.execute(
            `
            INSERT INTO image_posts (post_id, src, sort_order)
            VALUES (?, ?, ?)
            `,
        [id, imageUrl, lenImages]
      )
      lenImages++
    }

    return NextResponse.json({
      message: "Cập nhật danh sách ảnh thành công",
    });
  } catch (error) {
    console.error("UPDATE IMAGE_POSTS ERROR:", error);
    return NextResponse.json(
      { message: "Lỗi khi cập nhật danh sách ảnh", error },
      { status: 500 }
    );
  }
}
