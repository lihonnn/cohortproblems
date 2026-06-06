import * as mysql from 'mysql2/promise';
import db from './db';

export class DeptCount {
    count: number;
    dept: string;
    constructor(count: number, dept: string) {
        this.count = count;
        this.dept = dept;
    }
}

export async function count(): Promise<DeptCount[]> {
    try {
        const [rows] = await db.pool.query<mysql.RowDataPacket[]>(`
            SELECT code, count(id) as count FROM work GROUP BY code
        `);
        const result: DeptCount[] = [];
        for (const row of rows) {
            result.push(new DeptCount(row.count as number, row.code as string));
        }
        return result;
    } catch (error) {
        console.error('database query failed. ' + error);
        throw error;
    }
}
