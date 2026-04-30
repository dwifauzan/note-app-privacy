import { isTauriRuntime } from './tauri-env'
import { ensureDbReady } from './driver'

let migrationsPromise: Promise<void> | null = null

async function runMigrationsInner(): Promise<void> {
  await ensureDbReady()
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
