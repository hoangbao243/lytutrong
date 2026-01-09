import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import os from "os";
import sharp from "sharp";
import { uploadImage } from "@/models/Uploads.model";
import { getPool } from "@/lib/db";

export async function POST(req) {
  const pool = await getPool();
  const conn = await pool.getConnection();

  try {
    const formData = await req.formData();

    const title = formData.get("title");
    const description = formData.get("description");
    const images = formData.getAll("images");

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    await conn.beginTransaction();

    const imageUrls = [];
    // =========================
    // INSERT POST
    // =========================
    const [postResult] = await conn.execute(
      `INSERT INTO library_image_posts (title, description) VALUES (?, ?)`,
      [title, description]
    );
    const postId = postResult.insertId;

    // =========================
    // 2️⃣ UPLOAD + INSERT IMAGES
    // =========================
    let order = 1;

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
      await conn.execute(
        `
        INSERT INTO image_posts (post_id, src, sort_order)
        VALUES (?, ?, ?)
        `,
        [postId, imageUrl, order]
      );
      order++;
    }

    await conn.commit();

    return NextResponse.json({
      success: true,
      postId,
      title,
      description,
      images: imageUrls,
    });
  } catch (error) {
    await conn.rollback();
    console.error("API UPLOAD ERROR:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    conn.release();
  }
}

export async function GET(req) {
  const pool = await getPool();

  const [rows] = await pool.execute(
    `
    SELECT
      *
    FROM library_image_posts
    ORDER BY createDate DESC
    `
  );

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "5");

  // Tính toán phân trang
  const start = (page - 1) * limit;
  const end = start + limit;

  const paginatedData = rows.slice(start, end);

  return Response.json({
    page,
    limit,
    total: rows.length,
    totalPages: Math.ceil(rows.length / limit),
    data: paginatedData,
  });
}
