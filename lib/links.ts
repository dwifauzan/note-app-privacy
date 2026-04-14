import { db } from "@/db/driver";
import { noteLink, note } from "@/db/schema";
import { eq } from "drizzle-orm";

export type BacklinkWithNote = {
  id: number;
  title: string;
  filePath: string;
  nameAlias: string | null;
  ctx?: string;
};

export type NoteLinkWithNote = {
  id: number;
  title: string;
  filePath: string;
  nameAlias: string | null;
};

export function extractLinks(content: string): { title: string; context: string }[] {
  const regex = /\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g;
  const links: { title: string; context: string }[] = [];
  const lines = content.split("\n");

  let match;
  while ((match = regex.exec(content)) !== null) {
    const linkTitle = match[1].trim();
    
    // Find the line containing this link for context
    const lineIndex = content.substring(0, match.index).split("\n").length - 1;
    const context = lines[lineIndex]?.trim() || "";

    // Avoid duplicates
    if (!links.some(l => l.title === linkTitle)) {
      links.push({ title: linkTitle, context });
    }
  }

  return links;
}

export async function syncNoteLinks(
  sourceId: number,
  content: string
): Promise<void> {
  await db.delete(noteLink).where(eq(noteLink.sourceId, sourceId));

  const linkedData = extractLinks(content);

  for (const { title, context } of linkedData) {
    const targetNotes = await db
      .select()
      .from(note)
      .where(eq(note.title, title))
      .limit(1);

    if (targetNotes[0]) {
      await db.insert(noteLink).values({
        sourceId,
        targetId: targetNotes[0].id,
        nameAlias: context.slice(0, 100), // Store first 100 chars as context
      });
    }
  }
}

export async function getBacklinks(targetId: number): Promise<BacklinkWithNote[]> {
  const results = await db
    .select({
      id: note.id,
      title: note.title,
      filePath: note.filePath,
      nameAlias: noteLink.nameAlias,
    })
    .from(noteLink)
    .innerJoin(note, eq(noteLink.sourceId, note.id))
    .where(eq(noteLink.targetId, targetId));

  return results.map(r => ({
    ...r,
    ctx: r.nameAlias || undefined,
  }));
}

export async function getOutlinks(sourceId: number): Promise<NoteLinkWithNote[]> {
  const results = await db
    .select({
      id: note.id,
      title: note.title,
      filePath: note.filePath,
      nameAlias: noteLink.nameAlias,
    })
    .from(noteLink)
    .innerJoin(note, eq(noteLink.targetId, note.id))
    .where(eq(noteLink.sourceId, sourceId));

  return results;
}
