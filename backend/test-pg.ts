import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

async function testPg() {
    console.log('Testing PG connection...');
    console.log('URL:', process.env.DATABASE_URL?.replace(/:[^:@]+@/, ':****@')); // Hide password

    const pool = new pg.Pool({
        connectionString: process.env.DATABASE_URL,
        connectionTimeoutMillis: 5000,
    });

    try {
        const res = await pool.query('SELECT NOW()');
        console.log('Success:', res.rows[0]);
    } catch (err) {
        console.error('Failed:', err);
    } finally {
        await pool.end();
    }
}

testPg();
