"use client";

import { useState } from "react";
import { NOTES, NOTE_CONTENTS, BACKLINKS_DATA, Note } from "@/data/mockData";

export function useNotes() {
  const [notes] = useState<Note[]>(NOTES);
  return { notes };
}

export function useActiveNote(initialId = 1) {
  const [activeNote, setActiveNote] = useState(initialId);

  const currentNote = NOTES.find((n) => n.id === activeNote);
  const currentContent = NOTE_CONTENTS[activeNote] || "";
  const currentBacklinks = BACKLINKS_DATA[activeNote] || [];

  return {
    activeNote,
    currentNote,
    currentContent,
    currentBacklinks,
    setActiveNote,
  };
}

export function useEditor(initialContent = "") {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(initialContent);

  const startEdit = (content: string) => {
    setEditContent(content);
    setIsEditing(true);
  };

  const stopEdit = () => {
    setIsEditing(false);
  };

  return {
    isEditing,
    editContent,
    setEditContent,
    startEdit,
    stopEdit,
    toggleEdit: (content: string) => {
      if (isEditing) stopEdit();
      else startEdit(content);
    },
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
