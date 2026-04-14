import Database from '@tauri-apps/plugin-sql'
import { isTauriRuntime } from './tauri-env'

let migrationsPromise: Promise<void> | null = null

async function runMigrationsInner(): Promise<void> {
  // Use absolute path for the database
  const sqlite = await Database.load('sqlite:/home/patrick/Documents/note-app-reproject/db/pkm.db')

  await sqlite.execute(`
    CREATE TABLE IF NOT EXISTS note (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      title      TEXT NOT NULL,
      file_path  TEXT NOT NULL UNIQUE,
      folder     TEXT,
      word_count INTEGER DEFAULT 0,
      is_pinned  INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS note_version (
      id              INTEGER PRIMARY KEY AUTOINCREMENT,
      note_id         INTEGER NOT NULL REFERENCES note(id) ON DELETE CASCADE,
      history_content TEXT NOT NULL,
      created_at      INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS note_link (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      source_id  INTEGER NOT NULL REFERENCES note(id) ON DELETE CASCADE,
      target_id  INTEGER NOT NULL REFERENCES note(id) ON DELETE CASCADE,
      name_alias TEXT
    );

    CREATE TABLE IF NOT EXISTS tags (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      name       TEXT NOT NULL UNIQUE,
      color_tag  TEXT,
      created_at INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS note_tags (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      note_id    INTEGER NOT NULL REFERENCES note(id) ON DELETE CASCADE,
      tag_id     INTEGER NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
      created_at INTEGER NOT NULL,
      UNIQUE(note_id, tag_id)
    );

    CREATE INDEX IF NOT EXISTS note_id_idx ON note_tags(note_id);
    CREATE INDEX IF NOT EXISTS tag_id_idx ON note_tags(tag_id);
    CREATE UNIQUE INDEX IF NOT EXISTS unique_note_tag ON note_tags(note_id, tag_id);

    PRAGMA foreign_keys = ON;
    PRAGMA journal_mode = WAL;
  `)

  console.log('Migrasi selesai')
}

/** Runs app schema setup once per session; no-ops in plain browser. */
export function runMigrations(): Promise<void> {
  if (!isTauriRuntime()) {
    return Promise.resolve()
  }
  if (!migrationsPromise) {
    migrationsPromise = runMigrationsInner().catch((err) => {
      migrationsPromise = null
      throw err
    })
  }
  return migrationsPromise
}
