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

            CREATE TABLE IF NOT EXISTS seo_settings (
        id VARCHAR(32) PRIMARY KEY DEFAULT 'default',
        site_name VARCHAR(255),
        site_url VARCHAR(512),
        tagline VARCHAR(512),
        meta_description TEXT,
        default_og_image VARCHAR(1024),
        google_analytics_id VARCHAR(128),
        google_search_console_verification VARCHAR(512),
        robots_txt_content TEXT,
        data_json JSONB,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
      CREATE TABLE IF NOT EXISTS newsletter_subscribers (
        id VARCHAR(64) PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        source VARCHAR(64) DEFAULT 'website_footer',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS posts (
        id VARCHAR(64) PRIMARY KEY,
        title VARCHAR(512) NOT NULL,
        h1_title VARCHAR(512),
        seo_title VARCHAR(512),
        meta_desc TEXT,
        slug VARCHAR(255) UNIQUE NOT NULL,
        excerpt TEXT,
        content TEXT NOT NULL,
        category VARCHAR(128) DEFAULT 'General',
        featured_image VARCHAR(512),
        image_alt_text VARCHAR(255),
        status VARCHAR(32) DEFAULT 'published',
        author_name VARCHAR(128) DEFAULT 'Admin',
        data_json JSONB,
        published_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      ALTER TABLE posts ADD COLUMN IF NOT EXISTS h1_title VARCHAR(512);
      ALTER TABLE posts ADD COLUMN IF NOT EXISTS seo_title VARCHAR(512);
      ALTER TABLE posts ADD COLUMN IF NOT EXISTS meta_desc TEXT;
      ALTER TABLE posts ADD COLUMN IF NOT EXISTS data_json JSONB;
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

export async function saveSEOSettingsToDB(settings: any) {
  const p = getPostgresPool();
  if (!p) return null;
  try {
    const res = await p.query(
      `INSERT INTO seo_settings (id, site_name, site_url, tagline, meta_description, default_og_image, google_analytics_id, google_search_console_verification, robots_txt_content, data_json, updated_at)
       VALUES ('default', $1, $2, $3, $4, $5, $6, $7, $8, $9, CURRENT_TIMESTAMP)
       ON CONFLICT (id) DO UPDATE SET
         site_name = EXCLUDED.site_name,
         site_url = EXCLUDED.site_url,
         tagline = EXCLUDED.tagline,
         meta_description = EXCLUDED.meta_description,
         default_og_image = EXCLUDED.default_og_image,
         google_analytics_id = EXCLUDED.google_analytics_id,
         google_search_console_verification = EXCLUDED.google_search_console_verification,
         robots_txt_content = EXCLUDED.robots_txt_content,
         data_json = EXCLUDED.data_json,
         updated_at = CURRENT_TIMESTAMP
       RETURNING *;`,
      [
        settings.siteName || "",
        settings.siteUrl || "",
        settings.tagline || "",
        settings.defaultMetaDescription || "",
        settings.defaultOgImage || "",
        settings.googleAnalyticsId || settings.ga4TrackingId || "",
        settings.googleSearchConsoleVerification || settings.gscVerificationCode || "",
        settings.robotsTxtContent || "",
        JSON.stringify(settings)
      ]
    );
    return res.rows[0];
  } catch (err) {
    console.error("[PostgreSQL] Error saving seo_settings:", err);
    return null;
  }
}

export async function getSEOSettingsFromDB() {
  const p = getPostgresPool();
  if (!p) return null;
  try {
    const res = await p.query(`SELECT * FROM seo_settings WHERE id = 'default' LIMIT 1;`);
    if (res.rows.length > 0) {
      const row = res.rows[0];
      return row.data_json ? { ...row.data_json, googleSearchConsoleVerification: row.google_search_console_verification, googleAnalyticsId: row.google_analytics_id } : null;
    }
    return null;
  } catch (err) {
    console.error("[PostgreSQL] Error loading seo_settings:", err);
    return null;
  }
}

export async function saveBlogPostToDB(post: any) {
  const p = getPostgresPool();
  if (!p) return null;
  try {
    const res = await p.query(
      `INSERT INTO posts (id, title, h1_title, seo_title, meta_desc, slug, excerpt, content, category, featured_image, image_alt_text, status, author_name, data_json, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, CURRENT_TIMESTAMP)
       ON CONFLICT (id) DO UPDATE SET
         title = EXCLUDED.title,
         h1_title = EXCLUDED.h1_title,
         seo_title = EXCLUDED.seo_title,
         meta_desc = EXCLUDED.meta_desc,
         slug = EXCLUDED.slug,
         excerpt = EXCLUDED.excerpt,
         content = EXCLUDED.content,
         category = EXCLUDED.category,
         featured_image = EXCLUDED.featured_image,
         image_alt_text = EXCLUDED.image_alt_text,
         status = EXCLUDED.status,
         author_name = EXCLUDED.author_name,
         data_json = EXCLUDED.data_json,
         updated_at = CURRENT_TIMESTAMP
       RETURNING *;`,
      [
        post.id,
        post.title || '',
        post.h1_title || post.title || '',
        post.seo_title || post.title || '',
        post.meta_desc || post.metaDescription || post.excerpt || '',
        post.slug,
        post.excerpt || '',
        post.content || '',
        post.category || 'General',
        post.featuredImage || post.coverImage || '',
        post.imageAltText || '',
        post.status || 'published',
        post.author?.name || 'Admin',
        JSON.stringify(post)
      ]
    );
    return res.rows[0];
  } catch (err) {
    console.error('[PostgreSQL] Error saving blog post:', err);
    return null;
  }
}

export async function getBlogPostsFromDB(): Promise<any[]> {
  const p = getPostgresPool();
  if (!p) return [];
  try {
    const res = await p.query(`SELECT * FROM posts ORDER BY created_at DESC;`);
    return res.rows.map(row => {
      if (row.data_json && typeof row.data_json === 'object') {
        return {
          ...row.data_json,
          id: row.id,
          title: row.title,
          h1_title: row.h1_title || row.title,
          seo_title: row.seo_title || row.title,
          meta_desc: row.meta_desc || row.data_json.meta_desc || '',
          slug: row.slug,
          excerpt: row.excerpt,
          content: row.content,
          category: row.category,
          featuredImage: row.featured_image,
          status: row.status,
          updatedAt: row.updated_at
        };
      }
      return {
        id: row.id,
        title: row.title,
        h1_title: row.h1_title || row.title,
        seo_title: row.seo_title || row.title,
        meta_desc: row.meta_desc || '',
        slug: row.slug,
        excerpt: row.excerpt,
        content: row.content,
        category: row.category,
        featuredImage: row.featured_image,
        imageAltText: row.image_alt_text,
        status: row.status,
        author: { name: row.author_name || 'Admin', role: 'Author', avatar: '' },
        publishedAt: row.published_at,
        updatedAt: row.updated_at
      };
    });
  } catch (err) {
    console.error('[PostgreSQL] Error loading blog posts:', err);
    return [];
  }
}

export async function deleteBlogPostFromDB(id: string): Promise<boolean> {
  const p = getPostgresPool();
  if (!p) return false;
  try {
    await p.query(`DELETE FROM posts WHERE id = $1;`, [id]);
    return true;
  } catch (err) {
    console.error('[PostgreSQL] Error deleting blog post:', err);
    return false;
  }
}

