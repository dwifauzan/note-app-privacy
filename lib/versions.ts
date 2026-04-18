import { db } from "@/db/driver";
import { noteVersion } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export type NoteVersion = {
  id: number;
  noteId: number;
  historyContent: string;
  createdAt: Date;
};

export async function getVersionsByNoteId(noteId: number): Promise<NoteVersion[]> {
  const versions = await db
    .select()
    .from(noteVersion)
    .where(eq(noteVersion.noteId, noteId))
    .orderBy(desc(noteVersion.createdAt));
  return versions as unknown as NoteVersion[];
}

export async function createVersion(noteId: number, content: string): Promise<NoteVersion> {
  await db.insert(noteVersion).values({
    noteId,
    historyContent: content,
    createdAt: new Date(),
  });
  
  const versions = await db
    .select()
    .from(noteVersion)
    .where(eq(noteVersion.noteId, noteId))
    .orderBy(desc(noteVersion.id))
    .limit(1);
  return versions[0] as unknown as NoteVersion;
}

export async function deleteVersion(id: number): Promise<void> {
  await db.delete(noteVersion).where(eq(noteVersion.id, id));
}

export async function getVersionById(id: number): Promise<NoteVersion | null> {
  const versions = await db
    .select()
    .from(noteVersion)
    .where(eq(noteVersion.id, id))
    .limit(1);
  return (versions[0] as unknown as NoteVersion) || null;
}
