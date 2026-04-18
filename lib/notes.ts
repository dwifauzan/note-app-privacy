import { db } from "@/db/driver";
import { note } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export type Note = typeof note.$inferSelect;

export async function getAllNotes(): Promise<Note[]> {
  const notes = await db
    .select()
    .from(note)
    .orderBy(desc(note.isPinned), desc(note.id));
  return notes;
}

export async function getNoteById(id: number): Promise<Note | null> {
  const notes = await db.select().from(note).where(eq(note.id, id)).limit(1);
  return notes[0] || null;
}

export async function createNote(data: {
  title: string;
  filePath: string;
  folder?: string;
}): Promise<Note> {
  await db.insert(note).values({
    title: data.title,
    filePath: data.filePath,
    folder: data.folder || null,
    wordCount: 0,
    isPinned: 0,
    createdAt: new Date(),
  });
  
  const newNote = await db.select().from(note).where(eq(note.filePath, data.filePath)).limit(1);
  return newNote[0]!;
}

export async function updateNote(
  id: number,
  data: Partial<{
    title: string;
    filePath: string;
    folder: string | null;
    wordCount: number;
    isPinned: number;
  }>
): Promise<Note> {
  await db.update(note).set(data).where(eq(note.id, id));
  
  const updatedNote = await db.select().from(note).where(eq(note.id, id)).limit(1);
  return updatedNote[0]!;
}

export async function deleteNote(id: number): Promise<Note | null> {
  const notes = await db.select().from(note).where(eq(note.id, id)).limit(1);
  if (notes[0]) {
    await db.delete(note).where(eq(note.id, id));
    return notes[0];
  }
  return null;
}

export async function getNoteByFilePath(filePath: string): Promise<Note | null> {
  const notes = await db
    .select()
    .from(note)
    .where(eq(note.filePath, filePath))
    .limit(1);
  return notes[0] || null;
}
