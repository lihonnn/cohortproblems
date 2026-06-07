import * as mysql from 'mysql2/promise';    // to enable async calls
import db from './db';                      // database connection pool

// declare class with 2 fields : count & dept
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
        `);                             // ^ SQL implementation, [rows] destructure the [rows, fields] to return only [rows]
        const result: DeptCount[] = []; // initialise empty array to be returned later
        for (const row of rows) {       // use cursor to push each object to result array
            result.push(new DeptCount(row.count as number, row.code as string));  // count from total Sid per Code, Code from Dept
        }
        return result; // return result array

    } catch (error) {
        console.error('database query failed. ' + error);
        throw error;
    }
}
