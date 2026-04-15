const { google } = require("googleapis");
const fs = require("fs");
const path = require("path");

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URL = process.env.REDIRECT_URL;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const FOLDER_ID = process.env.GG_FOLDER_ID;
const FOLDER_IMAGES = process.env.FOLDER_IMAGES;
// const TEMP_FOLDER_ID = `1P9Z5HnX8fT3UPQ8ezYaxZJGqUrijOVoz`

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL,
);
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
  version: "v3",
  auth: oauth2Client,
});

export async function deleteDriveFile(fileId) {
  try {
    const deleteFile = await drive.files.delete({
      fileId,
    });
    if (deleteFile.status) {
      console.log("Delete file successfull!!");
    }
  } catch (error) {
    console.log("Delete Drive Error:", error);
  }
}

export async function uploadImage({ localPath }) {
  try {
    const fileName = path.basename(localPath);

    // Xác định mime type theo đuôi file
    const ext = path.extname(fileName).toLowerCase();
    const mimeTypes = {
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".png": "image/png",
      ".webp": "image/webp",
      ".gif": "image/gif",
    };

    const mimeType = mimeTypes[ext] || "image/jpeg";

    const createFile = await drive.files.create({
      requestBody: {
        name: fileName,
        mimeType,
        parents: [FOLDER_IMAGES],
      },
      media: {
        mimeType,
        body: fs.createReadStream(localPath),
      },
    });

    const fileId = createFile.data.id;

    // public file
    const previewLink = await setFilePublic(fileId);

    return {
      fileId,
      previewLink,
    };
  } catch (error) {
    console.error("UPLOAD IMAGE ERROR:", error);
    return error;
  }
}

export async function uploadFile({ localPath }) {
  try {
    const fileName = path.basename(localPath);
    const createFile = await drive.files.create({
      requestBody: {
        name: fileName,
        mimeType: "application/pdf",
        parents: [FOLDER_ID],
      },
      media: {
        mimeType: "application/pdf",
        body: fs.createReadStream(localPath),
      },
    });
    const fileId = createFile.data.id;
    const previewLink = await setFilePublic(fileId);
    return {
      fileId,
      previewLink,
    };
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function setFilePublic(fileId) {
  try {
    await drive.permissions.create({
      fileId,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });
    return `https://drive.google.com/file/d/${fileId}/preview`;
  } catch (error) {
    console.error(error);
  }
}
