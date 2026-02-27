export function formatDateTimeVN(date) {
  if (!date) return "";

  const d = new Date(date);
  const vietnamTime = new Date(d.getTime() + 7 * 60 * 60 * 1000);

  const hours = String(vietnamTime.getUTCHours()).padStart(2, "0");
  const minutes = String(vietnamTime.getUTCMinutes()).padStart(2, "0");
  const day = String(vietnamTime.getUTCDate()).padStart(2, "0");
  const month = String(vietnamTime.getUTCMonth() + 1).padStart(2, "0");
  const year = vietnamTime.getUTCFullYear();

  return `${hours}:${minutes} ${day}-${month}-${year}`;
}