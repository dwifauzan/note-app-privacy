import Database from '@tauri-apps/plugin-sql'
import { drizzle } from 'drizzle-orm/sqlite-proxy'
import * as schema from './schema'
import { isTauriRuntime } from './tauri-env'

const DB_PATH = isTauriRuntime() 
  ? 'sqlite:pkm.db' 
  : '/home/patrick/Documents/note-app-reproject/db/pkm.db'

let sqlitePromise: ReturnType<typeof Database.load> | null = null
let initPromise: Promise<void> | null = null

async function getSqlite() {
  if (!sqlitePromise) {
    console.log('Loading database from:', DB_PATH)
    sqlitePromise = Database.load(DB_PATH)
  }
  return sqlitePromise
}

async function initDatabase() {
  const sqlite = await getSqlite()
  
  await sqlite.execute(`
    CREATE TABLE IF NOT EXISTS note (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      title      TEXT NOT NULL,
      file_path  TEXT NOT NULL UNIQUE,
      folder     TEXT,
      word_count INTEGER DEFAULT 0,
      is_pinned  INTEGER DEFAULT 0,
      created_at INTEGER NOT NULL
    )
  `)

  await sqlite.execute(`
    CREATE TABLE IF NOT EXISTS note_version (
      id              INTEGER PRIMARY KEY AUTOINCREMENT,
      note_id         INTEGER NOT NULL REFERENCES note(id) ON DELETE CASCADE,
      history_content TEXT NOT NULL,
      created_at      INTEGER NOT NULL
    )
  `)

  await sqlite.execute(`
    CREATE TABLE IF NOT EXISTS note_link (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      source_id  INTEGER NOT NULL REFERENCES note(id) ON DELETE CASCADE,
      target_id  INTEGER NOT NULL REFERENCES note(id) ON DELETE CASCADE,
      name_alias TEXT
    )
  `)

  await sqlite.execute(`
    CREATE TABLE IF NOT EXISTS tags (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      name       TEXT NOT NULL UNIQUE,
      color_tag  TEXT,
      created_at INTEGER NOT NULL
    )
  `)

  await sqlite.execute(`
    CREATE TABLE IF NOT EXISTS note_tags (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      note_id    INTEGER NOT NULL REFERENCES note(id) ON DELETE CASCADE,
      tag_id     INTEGER NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
      created_at INTEGER NOT NULL,
      UNIQUE(note_id, tag_id)
    )
  `)

  try {
    await sqlite.execute(`ALTER TABLE note ADD COLUMN created_at INTEGER`)
    await sqlite.execute(`UPDATE note SET created_at = ${Date.now()} WHERE created_at IS NULL`)
  } catch (e) {
    // Column may already exist
  }

  await sqlite.execute(`PRAGMA foreign_keys = ON`)
  await sqlite.execute(`PRAGMA journal_mode = WAL`)
  
  console.log('Database initialized')
}

async function ensureDbReady() {
  if (!initPromise) {
    initPromise = initDatabase()
  }
  await initPromise
}

function stripReturning(sql: string): string {
  const returningMatch = sql.match(/RETURNING\s+[\w",\s*]+/i)
  if (returningMatch) {
    return sql.replace(returningMatch[0], '')
  }
  return sql
}

export const db = drizzle(
  async (sql, params, method) => {
    await ensureDbReady()
    const sqlite = await getSqlite()
    
    const sqlWithoutReturning = stripReturning(sql)
    
    try {
      if (method === 'run') {
        await sqlite.execute(sqlWithoutReturning, params)
        return { rows: [] }
      }

      const rows = await sqlite.select<Record<string, unknown>[]>(sqlWithoutReturning, params)
      const result = rows.map(row => Object.values(row))
      return { rows: result }

    } catch (err) {
      console.log('DB error:', err)
      throw err
    }
  },
  { schema }
)