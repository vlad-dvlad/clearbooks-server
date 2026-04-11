/* eslint-disable n/no-process-exit */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { db } from './index';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const migrate = async () => {
  await db.query(`
    CREATE TABLE IF NOT EXISTS migrations (
      id SERIAL PRIMARY KEY,
      filename VARCHAR(255) UNIQUE NOT NULL,
      applied_at TIMESTAMP DEFAULT NOW()
    )
  `);

  const migrationsDir = path.join(__dirname, 'migrations');
  const files = fs.readdirSync(migrationsDir).sort(); // сортуємо за назвою 001, 002...

  for (const file of files) {
    if (!file.endsWith('.sql')) continue;

    const { rows } = await db.query('SELECT id FROM migrations WHERE filename = $1', [file]);

    if (rows.length > 0) {
      console.log(`⏭️  Skip: ${file}`);
      continue;
    }

    const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf-8');
    await db.query(sql);
    await db.query('INSERT INTO migrations (filename) VALUES ($1)', [file]);
    console.log(`✅ Applied: ${file}`);
  }

  console.log('Migration complete');
  process.exit(0);
};

migrate().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
