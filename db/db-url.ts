import { appDataDir, join } from "@tauri-apps/api/path";
import { mkdir } from "@tauri-apps/plugin-fs";
import { isTauriRuntime } from "./tauri-env";

let dbUrlPromise: Promise<string> | null = null;

/**
 * Returns a stable, writable SQLite URL for tauri-plugin-sql.
 * Uses the OS app data directory so it works in packaged builds.
 */
export async function getDbUrl(): Promise<string> {
  if (!isTauriRuntime()) {
    throw new Error("Database is only available in Tauri runtime");
  }

  if (!dbUrlPromise) {
    dbUrlPromise = (async () => {
      const base = await appDataDir();
      const dir = await join(base, "PKM-App");
      await mkdir(dir, { recursive: true });
      const filePath = await join(dir, "pkm.db");
      return `sqlite:${filePath}`;
    })();
  }

  return dbUrlPromise;
}
