import { db } from "@/db/driver";
import { tags, noteTags } from "@/db/schema";
import { eq } from "drizzle-orm";

export type Tag = typeof tags.$inferSelect;

export async function getAllTags(): Promise<Tag[]> {
  return await db.select().from(tags);
}

export async function createTag(data: {
  name: string;
  colorTag?: string;
}): Promise<Tag> {
  await db.insert(tags).values({
    name: data.name,
    colorTag: data.colorTag || null,
    createdAt: new Date(),
  });
  
  const newTag = await db.select().from(tags).where(eq(tags.name, data.name)).limit(1);
  return newTag[0]!;
}

export async function deleteTag(id: number): Promise<void> {
  await db.delete(tags).where(eq(tags.id, id));
}

export async function getTagsByNoteId(noteId: number): Promise<Tag[]> {
  const result = await db
    .select({
      id: tags.id,
      name: tags.name,
      colorTag: tags.colorTag,
      createdAt: tags.createdAt,
    })
    .from(tags)
    .innerJoin(noteTags, eq(tags.id, noteTags.tagId))
    .where(eq(noteTags.noteId, noteId));
  return result;
}

export async function addTagToNote(noteId: number, tagId: number): Promise<void> {
  await db.insert(noteTags).values({
    noteId,
    tagId,
    createdAt: new Date(),
  });
}

export async function removeTagFromNote(
  noteId: number,
  tagId: number
): Promise<void> {
  await db
    .delete(noteTags)
    .where(eq(noteTags.noteId, noteId) && eq(noteTags.tagId, tagId));
}
