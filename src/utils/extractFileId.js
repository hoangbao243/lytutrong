export function extractFileId(url) {
  if (!url) return null;

  // thumbnail?id=FILE_ID
  const match1 = url.match(/id=([^&]+)/);
  if (match1) return match1[1];

  // /d/FILE_ID/
  const match2 = url.match(/\/d\/([^/]+)/);
  if (match2) return match2[1];

  return null;
}