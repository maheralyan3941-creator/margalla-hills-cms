import pg from 'pg';
const { Pool } = pg;

// Lazy and safe PostgreSQL Pool setup
let pool: pg.Pool | null = null;
let isConnected = false;

export function getPostgresPool(): pg.Pool | null {
  if (pool) return pool;

  const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  
  if (!connectionString) {
    // Also check standard PG environment variables
    const user = process.env.PGUSER || process.env.POSTGRES_USER;
    const password = process.env.PGPASSWORD || process.env.POSTGRES_PASSWORD;
    const host = process.env.PGHOST || 'localhost';
    const port = parseInt(process.env.PGPORT || '5432', 10);
    const database = process.env.PGDATABASE || process.env.POSTGRES_DB || 'saffron_db';

    if (user && password) {
      pool = new Pool({
        user,
        password,
        host,
        port,
        database,
        max: 10,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2500,
      });
      return pool;
    }
    return null;
  }

  pool = new Pool({
    connectionString,
    ssl: connectionString.includes('localhost') || connectionString.includes('127.0.0.1') ? false : { rejectUnauthorized: false },
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2500,
  });

  return pool;
}

export async function initPostgresTables() {
  const p = getPostgresPool();
  if (!p) {
    console.log('[PostgreSQL] No DATABASE_URL configured yet. Operating in graceful fallback mode.');
    return false;
  }

  try {
    const client = await p.connect();
    console.log('[PostgreSQL] Connected successfully to database!');
    isConnected = true;

    // Create tables automatically if they do not exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS reservations (
        id VARCHAR(64) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255),
        phone VARCHAR(64) NOT NULL,
        guests INTEGER DEFAULT 2,
        date DATE NOT NULL,
        time VARCHAR(32) NOT NULL,
        experience VARCHAR(128) DEFAULT 'Artisanal Dinner',
        location VARCHAR(128) DEFAULT 'Flagship',
        notes TEXT,
        status VARCHAR(32) DEFAULT 'CONFIRMED',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS catering_inquiries (
        id VARCHAR(64) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(64) NOT NULL,
        city VARCHAR(128) NOT NULL,
        event_type VARCHAR(128) DEFAULT 'Gala Dinner',
        guest_count INTEGER DEFAULT 50,
        event_date DATE,
        budget VARCHAR(64),
        dietary_notes TEXT,
        status VARCHAR(32) DEFAULT 'NEW',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS contacts_and_leads (
        id VARCHAR(64) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255),
        phone VARCHAR(64),
        subject VARCHAR(255),
        message TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS newsletter_subscribers (
        id VARCHAR(64) PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        source VARCHAR(64) DEFAULT 'website_footer',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    client.release();
    console.log('[PostgreSQL] Schema verified and tables ready.');
    return true;
  } catch (err: any) {
    console.warn('[PostgreSQL Connection Note]:', err.message);
    return false;
  }
}

export async function saveReservationToDB(resData: {
  id: string;
  name: string;
  email?: string;
  phone: string;
  guests: number;
  date: string;
  time: string;
  experience?: string;
  location?: string;
  notes?: string;
}) {
  const p = getPostgresPool();
  if (!p) return null;

  try {
    const result = await p.query(
      `INSERT INTO reservations (id, name, email, phone, guests, date, time, experience, location, notes)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING *;`,
      [
        resData.id,
        resData.name,
        resData.email || '',
        resData.phone,
        resData.guests || 2,
        resData.date,
        resData.time,
        resData.experience || 'Artisanal Dinner',
        resData.location || 'Flagship',
        resData.notes || '',
      ]
    );
    return result.rows[0];
  } catch (err) {
    console.error('[PostgreSQL] Error inserting reservation:', err);
    return null;
  }
}

export async function getReservationsFromDB() {
  const p = getPostgresPool();
  if (!p) return [];

  try {
    const result = await p.query(`SELECT * FROM reservations ORDER BY created_at DESC LIMIT 100;`);
    return result.rows;
  } catch (err) {
    console.error('[PostgreSQL] Error querying reservations:', err);
    return [];
  }
}
