import { getPool } from './mssql.js';
import 'dotenv/config';

(async () => {
  try {
    const pool = await getPool();
    const result = await pool.request().query('SELECT TOP 1 * FROM Users');
    console.log(result.recordset);
  } catch (err) {
    console.error('Kết nối DB lỗi:', err);
  }
})();
