"use client";

import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import Editor from "@/components/layout/Editor";
import BacklinksPanel from "@/components/layout/BacklinksPanel";
import { useNotes } from "@/hooks/usePKM";
import { useActiveNote } from "@/hooks/usePKM";
import { useEditor } from "@/hooks/usePKM";
import { useSidebar } from "@/hooks/usePKM";

export default function PKMApp() {
  const { notes } = useNotes();

  const {
    activeNote,
    currentNote,
    currentContent,
    currentBacklinks,
    setActiveNote,
  } = useActiveNote(1);

  const { isEditing, editContent, setEditContent, toggleEdit } =
    useEditor(currentContent);

  const {
    activeFolder,
    search,
    showBacklinks,
    setActiveFolder,
    setSearch,
    toggleBacklinks,
  } = useSidebar();

  const handleNoteClick = (id: number) => {
    setActiveNote(id);
    if (isEditing) toggleEdit(currentContent);
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
        background: "#f5f3ee",
        color: "#1a1a18",
        fontSize: "14px",
      }}
    >
      <Sidebar
        notes={notes}
        activeNote={activeNote}
        activeFolder={activeFolder}
        search={search}
        onNoteClick={handleNoteClick}
        onFolderChange={setActiveFolder}
        onSearchChange={setSearch}
        onNewNote={() => console.log("new note")}
      />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          minWidth: 0,
        }}
      >
        <Topbar
          note={currentNote}
          isEditing={isEditing}
          showBacklinks={showBacklinks}
          backlinkCount={currentBacklinks.length}
          onToggleEdit={() => toggleEdit(currentContent)}
          onToggleBacklinks={toggleBacklinks}
        />

        <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
          <Editor
            note={currentNote}
            content={currentContent}
            isEditing={isEditing}
            editContent={editContent}
            notes={notes}
            onLinkClick={handleNoteClick}
            onEditChange={setEditContent}
          />

          {showBacklinks && (
            <BacklinksPanel
              backlinks={currentBacklinks}
              onNoteClick={handleNoteClick}
            />
          )}
        </div>
      </div>
    </div>
  );
}
