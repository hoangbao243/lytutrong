export function monthToText(month){
  if (!month || month < 1 || month > 12) return "";

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  return months[month - 1];
};