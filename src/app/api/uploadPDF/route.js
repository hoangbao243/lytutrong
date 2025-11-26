import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const form = await req.formData();
    const file = form.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file" }, { status: 400 });
    }

    const byteArray = await file.arrayBuffer();
    const buffer = Buffer.from(byteArray);

    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT),
      scopes: ["https://www.googleapis.com/auth/drive"],
    });

    const drive = google.drive({ version: "v3", auth });

    // ID folder bạn đã tạo
    const FOLDER_ID = process.env.GDRIVE_FOLDER_ID;

    // Upload file
    const response = await drive.files.create({
      requestBody: {
        name: file.name,
        parents: [FOLDER_ID],
        mimeType: "application/pdf",
      },
      media: {
        mimeType: "application/pdf",
        body: buffer,
      },
    });

    const fileId = response.data.id;

    // Set quyền chia sẻ công khai
    await drive.permissions.create({
      fileId,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });

    // Lấy link xem
    const result = await drive.files.get({
      fileId,
      fields: "webViewLink, webContentLink",
    });

    return NextResponse.json({
      id: fileId,
      viewUrl: result.data.webViewLink,
      downloadUrl: result.data.webContentLink,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
