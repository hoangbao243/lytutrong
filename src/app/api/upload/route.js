import { writeFile } from "fs/promises";
import path from "path";
import sharp from "sharp";

export async function POST(req) {
  try {
    const form = await req.formData();
    const file = form.get("file");
    console.log(file);

    if (!file) return Response.json({ ok: false }, { status: 400 });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const metadata = await sharp(buffer).metadata();
    const width = metadata.width;
    const height = metadata.height;
    if (width < 1200 || height < 400) {
      return Response.json(
        { ok: false, message: "Ảnh phải >= 1200x400" },
        { status: 400 }
      );
    }
    const uploadPath = path.join(
      process.cwd(),
      "src",
      "app",
      "api",
      "upload",
      "banner",
      "banner.jpg"
    );

    await writeFile(uploadPath, buffer);

    return Response.json({ ok: true, message: "Uploaded" });
  } catch (error) {
    return Response.json({ ok: false, error: error.message }, { status: 500 });
  }
}
