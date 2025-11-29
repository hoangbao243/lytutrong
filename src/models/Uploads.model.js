
const {google} = require('googleapis')
const fs = require('fs');
const path = require('path');

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URL = process.env.REDIRECT_URL;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const FOLDER_ID = `1nDJ6jaHvXDwWvEZG3pzbaY4x3w3i2EPR`
const TEMP_FOLDER_ID = `1P9Z5HnX8fT3UPQ8ezYaxZJGqUrijOVoz`

const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
oauth2Client.setCredentials({refresh_token: REFRESH_TOKEN});

const drive = google.drive({
    version: 'v3',
    auth: oauth2Client
})


var that = module.exports = {
    log: async()=>{
        console.log(process.env.CLIENT_ID);
        
    },
    setFilePublic: async(fileId) =>{
        try {
            await drive.permissions.create({
                fileId,
                requestBody: {
                    role: 'reader',
                    type: 'anyone'
                }
            })
            return `https://drive.google.com/file/d/${fileId}/preview`;
        } catch (error) {
            console.error(error);
        }
    },
    uploadFile: async ({localPath}) => {
        try {
            const fileName = path.basename(localPath);
            const createFile = await drive.files.create({
                requestBody: {
                    name: fileName,
                    mimeType: 'application/pdf',
                    parents: [FOLDER_ID]   
                },
                media: {
                    mimeType: 'application/pdf',
                    body: fs.createReadStream(localPath)
                }
            })
            const fileId = createFile.data.id;
            const previewLink = await that.setFilePublic(fileId);
            return {
            fileId,
            previewLink
            };
        } catch (error) {
            console.error(error);
        }
    },
    deleteFile: async (fileId) => {
        try {
            console.log('Delete File:::', fileId);
            const deleteFile = await drive.files.delete({
                fileId: fileId
            })
            console.log(deleteFile.data, deleteFile.status)
            if (deleteFile.status) {
                console.log("Delete file successfull!!")
            }
        } catch (error) {
            console.error(error);
        }
    },
    moveFile: async()=>{
        try {
    //Liệt kê tất cả file trong thư mục tạm
    // const res = await drive.files.list({
    //   q: `'${TEMP_FOLDER_ID}' in parents and trashed=false`,
    //   fields: "files(id, name)",
    // });
    // const files = res.data.files;
    // if (!files || files.length === 0) {
    //   console.log("Không có file nào trong thư mục tạm.");
    //   return;
    // }
    // console.log(files);
    //Xóa từng file
    // for (const file of files) {
    //   try {
    //     await drive.files.delete({ fileId: file.id });
    //     console.log(`Đã xóa file: ${file.name} (${file.id})`);
    //   } catch (err) {
    //     console.error(`Xóa file ${file.name} lỗi:`, err.message);
    //   }
    // }

    console.log("Đã xóa tất cả file trong thư mục tạm.");
  } catch (err) {
    console.error("Lỗi khi liệt kê file:", err.message);
  }
    }
}