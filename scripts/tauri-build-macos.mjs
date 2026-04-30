import process from "node:process";
import { spawnSync } from "node:child_process";

if (process.platform !== "darwin") {
  console.error(
    "This command builds a macOS installer (.dmg/.app) and must be run on macOS (or a macOS CI runner)."
  );
  console.error("Tip: use GitHub Actions tag builds for macOS artifacts.");
  process.exit(1);
}

const result = spawnSync("tauri", ["build", "--bundles", "dmg,app"], {
  stdio: "inherit",
  shell: true,
});

process.exit(result.status ?? 1);
