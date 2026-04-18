import { sqliteTable, text, integer, uniqueIndex, index } from 'drizzle-orm/sqlite-core'

export const note = sqliteTable('note', {
  id:        integer('id').primaryKey({ autoIncrement: true }),
  title:     text('title').notNull(),
  filePath:  text('file_path').notNull().unique(),
  folder:    text('folder'),
  wordCount: integer('word_count').default(0),
  isPinned:  integer('is_pinned').default(0),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
})

export const noteVersion = sqliteTable('note_version', {
  id:             integer('id').primaryKey({ autoIncrement: true }),
  noteId:         integer('note_id').notNull().references(() => note.id, { onDelete: 'cascade' }),
  historyContent: text('history_content').notNull(),
  createdAt:      integer('created_at', { mode: 'timestamp' }).notNull(),
})

export const noteLink = sqliteTable('note_link', {
  id:        integer('id').primaryKey({ autoIncrement: true }),
  sourceId:  integer('source_id').notNull().references(() => note.id, { onDelete: 'cascade' }),
  targetId:  integer('target_id').notNull().references(() => note.id, { onDelete: 'cascade' }),
  nameAlias: text('name_alias'),
})

export const tags = sqliteTable('tags', {
  id:        integer('id').primaryKey({ autoIncrement: true }),
  name:      text('name').notNull().unique(),
  colorTag:  text('color_tag'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
})

export const noteTags = sqliteTable('note_tags', {
  id:        integer('id').primaryKey({ autoIncrement: true }),
  noteId:    integer('note_id').notNull().references(() => note.id, { onDelete: 'cascade' }),
  tagId:     integer('tag_id').notNull().references(() => tags.id, { onDelete: 'cascade' }),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
}, (table) => ({
  uniqueNoteTag: uniqueIndex('unique_note_tag').on(table.noteId, table.tagId),
  noteIdIdx:     index('note_id_idx').on(table.noteId),
  tagIdIdx:      index('tag_id_idx').on(table.tagId),
}))