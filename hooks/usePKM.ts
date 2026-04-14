"use client";

import { useState, useEffect, useCallback } from "react";
import { getAllNotes, getNoteById, updateNote, Note as DbNote } from "@/lib/notes";
import { getTagsByNoteId, Tag as DbTag } from "@/lib/tags";
import { getBacklinks, BacklinkWithNote as DbBacklink } from "@/lib/links";
import { readNoteFile, writeNoteFile } from "@/lib/files";
import { syncNoteLinks } from "@/lib/links";

export type Note = {
  id: number;
  title: string;
  folder: string;
  updated: string;
  pinned: boolean;
  tags: string[];
};

export type Tag = {
  id: number;
  name: string;
  colorTag: string | null;
};

export type Backlink = {
  id: number;
  title: string;
  ctx: string;
};

export function mapDbNoteToNote(dbNote: DbNote, tags: DbTag[]): Note {
  return {
    id: dbNote.id,
    title: dbNote.title,
    folder: dbNote.folder || "",
    updated: "Baru saja",
    pinned: dbNote.isPinned === 1,
    tags: tags.map((t) => t.name),
  };
}

function mapDbBacklinkToBacklink(bl: DbBacklink): Backlink {
  return {
    id: bl.id,
    title: bl.title,
    ctx: bl.nameAlias || `Menuju ${bl.title}`,
  };
}

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchNotes = useCallback(async () => {
    try {
      setIsLoading(true);
      const allNotes = await getAllNotes();
      const notesWithTags = await Promise.all(
        allNotes.map(async (dbNote) => {
          const tags = await getTagsByNoteId(dbNote.id);
          return mapDbNoteToNote(dbNote, tags);
        })
      );
      setNotes(notesWithTags);
      setError(null);
    } catch (err) {
      console.error("Error fetching notes:", err);
      setError(err instanceof Error ? err : new Error("Failed to fetch notes"));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  return { notes, isLoading, error, refetch: fetchNotes };
}

export function useActiveNote(externalNoteId: number = 1) {
  const [currentNote, setCurrentNote] = useState<DbNote | null>(null);
  const [currentContent, setCurrentContent] = useState("");
  const [currentTags, setCurrentTags] = useState<Tag[]>([]);
  const [currentBacklinks, setCurrentBacklinks] = useState<Backlink[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadNote = useCallback(async (id: number) => {
    try {
      setIsLoading(true);
      const note = await getNoteById(id);
      if (note) {
        setCurrentNote(note);
        try {
          const content = await readNoteFile(note.filePath);
          setCurrentContent(content);
        } catch (fileErr) {
          console.error("Error reading file:", fileErr, "Path:", note.filePath);
          setCurrentContent("");
        }
        const tags = await getTagsByNoteId(id);
        setCurrentTags(tags);
        const dbBacklinks = await getBacklinks(id);
        setCurrentBacklinks(dbBacklinks.map(mapDbBacklinkToBacklink));
        setError(null);
      } else {
        setCurrentNote(null);
        setCurrentContent("");
        setCurrentTags([]);
      }
    } catch (err) {
      console.error("Error loading note:", err);
      setError(err instanceof Error ? err : new Error("Failed to load note"));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNote(externalNoteId);
  }, [externalNoteId, loadNote]);

  return {
    currentNote,
    currentContent,
    currentTags,
    currentBacklinks,
    isLoading,
    error,
  };
}

export function useEditor(
  noteId: number,
  initialContent: string,
  onSave?: () => void
) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(initialContent);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setEditContent(initialContent);
  }, [initialContent]);

  const startEdit = useCallback((content: string) => {
    setEditContent(content);
    setIsEditing(true);
  }, []);

  const stopEdit = useCallback(() => {
    setIsEditing(false);
  }, []);

  const saveNote = useCallback(
    async (note: DbNote, content: string) => {
      try {
        setIsSaving(true);
        await writeNoteFile(note.filePath, content);

        const wordCount = content.split(/\s+/).filter(Boolean).length;
        await updateNote(note.id, { wordCount: wordCount });
        await syncNoteLinks(note.id, content);

        if (onSave) {
          onSave();
        }

        setIsEditing(false);
      } catch (err) {
        console.error("Error saving note:", err);
        throw err;
      } finally {
        setIsSaving(false);
      }
    },
    [onSave]
  );

  return {
    isEditing,
    editContent,
    setEditContent,
    isSaving,
    startEdit,
    stopEdit,
    toggleEdit: (content: string) => {
      if (isEditing) stopEdit();
      else startEdit(content);
    },
    saveNote,
  };
}

export function useSidebar() {
  const [activeFolder, setActiveFolder] = useState("semua");
  const [search, setSearch] = useState("");
  const [showBacklinks, setShowBacklinks] = useState(true);

  return {
    activeFolder,
    search,
    showBacklinks,
    setActiveFolder,
    setSearch,
    toggleBacklinks: () => setShowBacklinks((v) => !v),
  };
}
