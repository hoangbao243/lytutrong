export function formatForDateTimeLocal(date){
  if (!date) return "";

  const d = new Date(date);

  // cộng thêm 7 tiếng cho giờ Việt Nam
  d.setHours(d.getHours() + 7);

  return d.toISOString().slice(0, 16);
};