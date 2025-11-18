export async function GET() {
  await new Promise((r) => setTimeout(r, 500)) // simulate delay

  const data = [
  { id: 1, name: "Thư viện", parent: null },
  { id: 2, name: "Danh mục sách", parent: 1 },
  { id: 3, name: "Sách thiếu nhi", parent: 2 },
  { id: 4, name: "Tin tức", parent: null }
]

  return Response.json({ ok: true, data: data })
}