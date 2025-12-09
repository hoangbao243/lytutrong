import mssql from 'mssql';

const SQL_DRIVER = 'SQL Server';
const SQL_SERVER = 'DESKTOP-L8U2PHD\\SQLEXPRESS01';
// const SQL_SERVER = '116.98.49.70';
const SQL_DATABASE = 'lytutrong';
const SQL_UID = 'sa';
const SQL_PWD = '1234$';

const config = {
  driver: SQL_DRIVER,
  server: SQL_SERVER,
  database: SQL_DATABASE,
  user: SQL_UID,
  password: SQL_PWD,
  port: 1888,
  options: {
    encrypt: false,               // local dev
    trustServerCertificate: true, // tránh lỗi SSL self-signed
  },
  pool: {
    max: 100,
    idleTimeoutMillis: 300000,
  },
  connectionTimeout: 300000,
  requestTimeout: 300000,
};

let pool;

export async function getPool() {
  if (pool && pool.connected) return pool;

  try {
    pool = new mssql.ConnectionPool(config);
    await pool.connect();
    console.log('✅ MSSQL connected!');
    return pool;
  } catch (err) {
    console.error('SQL connection error:', err);
    throw err;
  }
}
