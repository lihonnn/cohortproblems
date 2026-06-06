import db from './db';

export async function sync(): Promise<void> {
    try {
        await db.pool.query(`
            CREATE TABLE IF NOT EXISTS staff (
                id INTEGER PRIMARY KEY,
                name VARCHAR(255)
            )
        `);
        await db.pool.query(`
            CREATE TABLE IF NOT EXISTS dept (
                code CHAR(2) PRIMARY KEY
            )
        `);
        await db.pool.query(`
            CREATE TABLE IF NOT EXISTS work (
                id INTEGER,
                code CHAR(2),
                PRIMARY KEY (id),
                FOREIGN KEY (id) REFERENCES staff(id),
                FOREIGN KEY (code) REFERENCES dept(code)
            )
        `);
        console.log('Tables created successfully');
    } catch (error) {
        console.error('sync failed. ' + error);
        throw error;
    }
}