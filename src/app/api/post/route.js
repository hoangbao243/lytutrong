export async function GET() {
  await new Promise((r) => setTimeout(r, 500)) // simulate delay

  const data = [
    { id: 1, title: "Khai giảng năm học mới", image: "/images/slide1.jpg", createDate: "2025-09-01", content: "Năm học mới bắt đầu với nhiều hứng khởi." },
    { id: 2, title: "Thư viện tặng sách", image: "/images/slide2.jpg", createDate: "2025-08-20", content: "Thư viện trường trao tặng hơn 200 đầu sách." },
    { id: 3, title: "Hoạt động ngoại khóa", image: "/images/slide3.jpg", createDate: "2025-07-10", content: "Học sinh tham gia các hoạt động thể thao, nghệ thuật." },
    { id: 4, title: "Giải bóng đá học sinh", image: "/images/slide4.jpg", createDate: "2025-06-15", content: "Giải bóng đá thường niên thu hút nhiều đội tham gia." },
  ]

  return Response.json({ ok: true, data })
}

// async function getNews() {
//   const res = await fetch(`${process.env.BASE_URL ?? ""}/api/news`, {
//     // Next.js will fetch relative to the server; include cache: 'no-store' for demo if you want fresh
//     cache: "no-store",
//   });
//   if (!res.ok) throw new Error("Failed to fetch news");
//   const json = await res.json();
//   console.log("json.data", json.data);

//   return json.data || [];
// }
