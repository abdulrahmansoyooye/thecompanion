import pg from 'pg';
import 'dotenv/config';

async function testConnection() {
  const client = new pg.Client({
    connectionString: "postgresql://postgres.jxtkgnwcbwanwgdjxaiv:$i7.*GtyCxGdCaL@db.jxtkgnwcbwanwgdjxaiv.supabase.co:5432/postgres",
    connectionTimeoutMillis: 10000,
  });

  try {
    console.log('Connecting to:', process.env.DIRECT_URL?.split('@')[1]);
    await client.connect();
    console.log('Connected successfully!');
    const res = await client.query('SELECT NOW()');
    console.log('Query result:', res.rows[0]);
    await client.end();
  } catch (err) {
    console.error('Connection error:', err.message);
  }
}

testConnection();
