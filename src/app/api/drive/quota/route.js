import { infoDrive } from '@/models/Uploads.model';

export async function GET() {
  try {
    const result = await infoDrive();
    
    return Response.json(
      { result },
      { status: 200 }
    );
  } catch (err) {
    console.error("Get Drive Quota Error:", err);
    return new Response("Error", { status: 500 });
  }
}
