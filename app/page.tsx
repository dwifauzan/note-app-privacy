"use client";

import Image from "next/image";
import { useEffect } from "react";
import { runMigrations } from "@/db/migrate";
import { isTauriRuntime } from "@/db/tauri-env";
import PKMApp from "@/components/PKMApp";

export default function Home() {
  useEffect(() => {
    if (isTauriRuntime()) {
      runMigrations().catch(console.error);
    }
  }, []);
  return <PKMApp />;
}
