import { readTextFile, writeTextFile, remove, mkdir, exists } from "@tauri-apps/plugin-fs";
import { documentDir, join } from "@tauri-apps/api/path";

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export async function readNoteFile(filePath: string): Promise<string> {
  return await readTextFile(filePath);
}

export async function writeNoteFile(
  filePath: string,
  content: string
): Promise<void> {
  const lastSlash = filePath.lastIndexOf("/");
  if (lastSlash > 0) {
    const dirPath = filePath.substring(0, lastSlash);
    const dirExists = await exists(dirPath);
    if (!dirExists) {
      await mkdir(dirPath, { recursive: true });
    }
  }
  await writeTextFile(filePath, content);
}

export async function deleteNoteFile(filePath: string): Promise<void> {
  await remove(filePath);
}

export async function generateFilePath(
  title: string,
  folder?: string
): Promise<string> {
  const docDir = await documentDir();
  const slug = slugify(title);

  let fullPath: string;
  if (folder) {
    fullPath = await join(docDir, "PKM-Notes", folder, `${slug}.md`);
  } else {
    fullPath = await join(docDir, "PKM-Notes", `${slug}.md`);
  }

  return fullPath;
}

export async function noteFileExists(filePath: string): Promise<boolean> {
  return await exists(filePath);
}
