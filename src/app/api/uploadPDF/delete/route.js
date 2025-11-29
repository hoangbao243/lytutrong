import { NextResponse } from "next/server";
import { deleteFile } from "@/models/Uploads.model";

export async function POST(req) {
  try {
    const { fileId } = await req.json();

    const result = await deleteFile(fileId);

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: "Delete failed" },
      { status: 500 }
    );
  }
}