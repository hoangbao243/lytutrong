import { getPool } from '@/lib/mssql';

export async function GET(req) {
  try {
    const pool = await getPool();
    const result = await pool.request().query('SELECT TOP 10 * FROM Users');
    return new Response(JSON.stringify({ users: result.recordset }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Get users error:', err);
    return new Response(JSON.stringify({ message: 'Lỗi server' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
