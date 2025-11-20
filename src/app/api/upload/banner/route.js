import { readFile } from "fs/promises";
import path from "path";

export async function GET() {
  const filePath = path.join(
    process.cwd(),
    "src",
    "app",
    "api",
    "upload",
    "banner",
    "banner.jpg"
  );

  const img = await readFile(filePath);

  return new Response(img, {
    headers: {
      "Content-Type": "image/jpeg",
      "Cache-Control": "no-cache, no-store, must-revalidate",
    },
  });
}