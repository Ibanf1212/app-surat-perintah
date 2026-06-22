import pool from '../config/database';

const migrations = [
  {
    name: '001_create_users_table',
    up: `
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        full_name VARCHAR(255) NOT NULL,
        nip VARCHAR(50),
        position VARCHAR(255),
        department VARCHAR(255),
        role VARCHAR(50) DEFAULT 'creator',
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      CREATE INDEX idx_users_email ON users(email);
      CREATE INDEX idx_users_username ON users(username);
    `,
    down: 'DROP TABLE IF EXISTS users;'
  },
  {
    name: '002_create_surat_perintah_table',
    up: `
      CREATE TABLE IF NOT EXISTS surat_perintah (
        id UUID PRIMARY KEY,
        nomor_surat VARCHAR(255) UNIQUE NOT NULL,
        tanggal TIMESTAMP NOT NULL,
        menimbang TEXT NOT NULL,
        dasar JSONB NOT NULL,
        kepada_nama JSONB NOT NULL,
        untuk JSONB NOT NULL,
        ttd_nama VARCHAR(255) NOT NULL,
        ttd_nip VARCHAR(50),
        ttd_jabatan VARCHAR(255),
        tempat VARCHAR(255),
        status VARCHAR(50) DEFAULT 'draft',
        created_by UUID REFERENCES users(id),
        approved_by UUID REFERENCES users(id),
        rejected_reason TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      CREATE INDEX idx_surat_status ON surat_perintah(status);
      CREATE INDEX idx_surat_created_by ON surat_perintah(created_by);
      CREATE INDEX idx_surat_created_at ON surat_perintah(created_at);
    `,
    down: 'DROP TABLE IF EXISTS surat_perintah;'
  }
];

export const runMigrations = async () => {
  try {
    for (const migration of migrations) {
      console.log(`Running migration: ${migration.name}`);
      await pool.query(migration.up);
      console.log(`Migration ${migration.name} completed`);
    }
    console.log('All migrations completed successfully');
  } catch (error) {
    console.error('Migration error:', error);
    throw error;
  }
};

if (require.main === module) {
  runMigrations().then(() => process.exit(0)).catch(err => {
    console.error(err);
    process.exit(1);
  });
}
