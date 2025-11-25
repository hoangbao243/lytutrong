import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(req) {
  const { content, tempImages } = await req.json();

  const used = tempImages.filter(url => content.includes(url));

  for (const url of used) {
    const fileName = url.split("/").pop();

    const oldPath = path.join(process.cwd(), "public/uploads/temp", fileName);
    const newPath = path.join(process.cwd(), "public/uploads/images", fileName);

    await fs.mkdir(path.dirname(newPath), { recursive: true });

    try {
      await fs.rename(oldPath, newPath);
    } catch (err) {
      console.error("MOVE FILE ERROR", err);
    }
  }

  return NextResponse.json({ success: true });
}
