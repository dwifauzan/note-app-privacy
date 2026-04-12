"use client";

import { useEffect } from "react";
import { runMigrations } from "@/db/migrate";

export function MigrationRunner() {
  useEffect(() => {
    runMigrations().catch(console.error);
  }, []);
  return null;
}
