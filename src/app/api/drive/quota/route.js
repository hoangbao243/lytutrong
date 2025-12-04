import { infoDrive } from '@/models/Uploads.model';

export async function GET() {
  try {
    const result = await infoDrive();
    console.log("result", result);
    
    return Response.json(
      { result },
      { status: 200 }
    );
  } catch (err) {
    console.error("Get Drive Quota Error:", err);
    return new Response("Error", { status: 500 });
  }
}
