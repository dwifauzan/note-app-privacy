import Database from '@tauri-apps/plugin-sql'
import { drizzle } from 'drizzle-orm/sqlite-proxy'
import * as schema from './schema'

const DB_PATH = '/home/patrick/Documents/note-app-reproject/db/pkm.db'

let sqlitePromise: ReturnType<typeof Database.load> | null = null

async function getSqlite() {
  if (!sqlitePromise) {
    console.log('Loading database from:', DB_PATH)
    sqlitePromise = Database.load(`sqlite:${DB_PATH}`)
  }
  return sqlitePromise
}

export const db = drizzle(
  async (sql, params, method) => {
    const sqlite = await getSqlite()
    try {
      if (method === 'run') {
        await sqlite.execute(sql, params)
        return { rows: [] }
      }

      const rows = await sqlite.select<Record<string, unknown>[]>(sql, params)
      const result = rows.map(row => Object.values(row))
      return { rows: result }

    } catch (err) {
      console.log('DB error:', err)
      throw err
    }
  },
  { schema }
)