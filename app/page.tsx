"use client";

import Image from "next/image";
import { useEffect } from "react";
import { db } from "@/db";
import { note } from "@/db/schema";
import { runMigrations } from "@/db/migrate";
import { isTauriRuntime } from "@/db/tauri-env";
import { eq } from "drizzle-orm";
import PKMApp from "@/components/PKMApp";

let agentTestInvocation = 0;

export default function Home() {
  useEffect(() => {
    async function test() {
      agentTestInvocation += 1;
      // #region agent log
      fetch(
        "http://127.0.0.1:7426/ingest/31425f3c-77ee-42b5-a01e-af9b21f430fd",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Debug-Session-Id": "99a75c",
          },
          body: JSON.stringify({
            sessionId: "99a75c",
            location: "app/page.tsx:test",
            message: "test() invoked",
            data: {
              invocation: agentTestInvocation,
              isTauri: isTauriRuntime(),
            },
            timestamp: Date.now(),
            hypothesisId: "H1",
          }),
        },
      ).catch(() => {});
      // #endregion
      await runMigrations();
      if (!isTauriRuntime()) return;

      const seedPath = "/PKM/catatan-pertama.md";
      const existing = await db
        .select()
        .from(note)
        .where(eq(note.filePath, seedPath));
      // #region agent log
      fetch(
        "http://127.0.0.1:7426/ingest/31425f3c-77ee-42b5-a01e-af9b21f430fd",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Debug-Session-Id": "99a75c",
          },
          body: JSON.stringify({
            sessionId: "99a75c",
            location: "app/page.tsx:preInsert",
            message: "rows before insert",
            data: {
              invocation: agentTestInvocation,
              existingCount: existing.length,
            },
            timestamp: Date.now(),
            hypothesisId: "H2",
          }),
        },
      ).catch(() => {});
      // #endregion

      await db.insert(note).values({
        title: "Catatan Pertama",
        filePath: seedPath,
        folder: "inbox",
      });

      const semua = await db.select().from(note);
      console.log("Isi tabel note:", semua);
    }
    test().catch(console.error);
  }, []);
  return <PKMApp />;
}
