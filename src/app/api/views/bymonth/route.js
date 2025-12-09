export async function GET() {
  const viewsbyMonth = [
    { month: "Jan", views: 123 },
    { month: "Feb", views: 555 },
    { month: "Mar", views: 177 },
    { month: "Apr", views: 163 },
    { month: "May", views: 59 },
    { month: "Jun", views: 122 },
    { month: "Jul", views: 199 },
    { month: "Aug", views: 166 },
    { month: "Sep", views: 823 },
    { month: "Oct", views: 275 },
    { month: "Nov", views: 168 },
    { month: "Dec", views: 522 },
  ];

  return Response.json({
    success: true,
    data: viewsbyMonth,
  });
}