export async function GET() {
  await new Promise((r) => setTimeout(r, 500)); // simulate delay

  const data = [
    { id: 2, name: "Nhà trường", parent: null },
    { id: 3, name: "Lịch sử hình thành", parent: 2 },
    { id: 4, name: "Cơ cấu tổ chức", parent: 2 },
    { id: 5, name: "Thành tích", parent: 2 },
    { id: 6, name: "Các hoạt động", parent: 2 },
    { id: 7, name: "Hoạt động giảng dạy", parent: null },
    { id: 8, name: "Giảng dạy", parent: 7 },
    { id: 9, name: "Tài nguyên dạy học", parent: 7 },
    { id: 10, name: "Chuyên môn", parent: 7 },
    { id: 11, name: "Văn bản chỉ đạo", parent: 7 },
    { id: 12, name: "Đoàn thể", parent: null },
    { id: 13, name: "Chi bộ", parent: 12 },
    { id: 14, name: "Chi Đoàn", parent: 12 },
    { id: 15, name: "Công Đoàn", parent: 12 },
    { id: 17, name: "Liên đội", parent: 12 },
    { id: 18, name: "Các văn bản", parent: null },
    { id: 19, name: "Tin tức khác", parent: null },
    { id: 20, name: "Thư viện", parent: null },
    { id: 21, name: "Danh mục sách", parent: 20 },
    { id: 22, name: "Sách thiếu nhi", parent: 21 },
    { id: 23, name: "Sách tham khảo", parent: 21 },
    { id: 24, name: "Sách giáo viên", parent: 21 },
    { id: 25, name: "Sách dùng chung", parent: 21 },
    { id: 26, name: "Giới thiệu sách", parent: 20 },
    { id: 27, name: "Hoạt động thư viện", parent: 20 },
    { id: 28, name: "Công khai", parent: null },
    { id: 29, name: "Thực đơn", parent: null },
    { id: 30, name: "Thư viện ảnh", parent: 20 },
  ];

  return Response.json({ ok: true, data: data });
}
