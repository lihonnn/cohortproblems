import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'pichu',
    database: 'staffdir',
    password: 'pikaP!',
    connectionLimit: 10,
});

async function cleanup(): Promise<void> {
    await pool.end();
}

export default { pool, cleanup };