import Database from '@tauri-apps/plugin-sql'
import { drizzle } from 'drizzle-orm/sqlite-proxy'
import * as schema from './schema'

let sqlitePromise: ReturnType<typeof Database.load> | null = null

async function getSqlite() {
  if (!sqlitePromise) sqlitePromise = Database.load('sqlite:pkm.db')
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
      fetch('http://127.0.0.1:7426/ingest/31425f3c-77ee-42b5-a01e-af9b21f430fd',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'99a75c'},body:JSON.stringify({sessionId:'99a75c',location:'db/driver.ts:catch',message:'sqlite proxy error',data:{err:String(err),sqlPreview:String(sql).slice(0,240),method},timestamp:Date.now(),hypothesisId:'H3'})}).catch(()=>{});
      console.log('DB error:', err)
      throw err
    }
  },
  { schema }
)