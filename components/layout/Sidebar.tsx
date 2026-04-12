"use client";

import NoteItem from "@/components/notes/NoteItem";
import SearchInput from "@/components/ui/SearchInput";
import { FOLDERS, Note } from "@/data/mockData";

type SidebarProps = {
  notes: Note[];
  activeNote: number;
  activeFolder: string;
  search: string;
  onNoteClick: (id: number) => void;
  onFolderChange: (folder: string) => void;
  onSearchChange: (value: string) => void;
  onNewNote: () => void;
};

export default function Sidebar({
  notes,
  activeNote,
  activeFolder,
  search,
  onNoteClick,
  onFolderChange,
  onSearchChange,
  onNewNote,
}: SidebarProps) {
  const filtered = notes.filter((n) => {
    const matchFolder = activeFolder === "semua" || n.folder === activeFolder;
    const matchSearch = n.title.toLowerCase().includes(search.toLowerCase());
    return matchFolder && matchSearch;
  });

  const pinned = filtered.filter((n) => n.pinned);
  const unpinned = filtered.filter((n) => !n.pinned);

  return (
    <div
      style={{
        width: "240px",
        flexShrink: 0,
        background: "#efede8",
        borderRight: "1px solid #dddbd4",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* App title */}
      <div
        style={{ padding: "20px 16px 12px", borderBottom: "1px solid #dddbd4" }}
      >
        <div
          style={{
            fontSize: "13px",
            fontWeight: 600,
            letterSpacing: "0.08em",
            color: "#1a1a18",
            textTransform: "uppercase",
          }}
        >
          PKM
        </div>
        <div style={{ fontSize: "11px", color: "#8a8a80", marginTop: "2px" }}>
          Personal Knowledge
        </div>
      </div>

      {/* Search */}
      <div style={{ padding: "10px 12px", borderBottom: "1px solid #dddbd4" }}>
        <SearchInput value={search} onChange={onSearchChange} />
      </div>

      {/* Folders */}
      <div style={{ padding: "10px 8px 6px" }}>
        <div
          style={{
            fontSize: "10px",
            fontWeight: 600,
            color: "#a0a098",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            padding: "0 8px",
            marginBottom: "4px",
          }}
        >
          Folder
        </div>
        {FOLDERS.map((f) => (
          <div
            key={f}
            onClick={() => onFolderChange(f)}
            style={{
              padding: "6px 10px",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: activeFolder === f ? 500 : 400,
              background: activeFolder === f ? "#e0ddd6" : "transparent",
              color: activeFolder === f ? "#1a1a18" : "#5a5a52",
              marginBottom: "1px",
              textTransform: "capitalize",
            }}
          >
            {f}
          </div>
        ))}
      </div>

      <div
        style={{ height: "1px", background: "#dddbd4", margin: "6px 12px" }}
      />

      {/* Note list */}
      <div style={{ flex: 1, overflowY: "auto", padding: "4px 8px 12px" }}>
        {pinned.length > 0 && (
          <>
            <div
              style={{
                fontSize: "10px",
                fontWeight: 600,
                color: "#a0a098",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                padding: "6px 10px 4px",
              }}
            >
              Pinned
            </div>
            {pinned.map((n) => (
              <NoteItem
                key={n.id}
                note={n}
                active={activeNote === n.id}
                onClick={() => onNoteClick(n.id)}
              />
            ))}
          </>
        )}

        {unpinned.length > 0 && (
          <>
            {pinned.length > 0 && (
              <div
                style={{
                  fontSize: "10px",
                  fontWeight: 600,
                  color: "#a0a098",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  padding: "8px 10px 4px",
                }}
              >
                Catatan
              </div>
            )}
            {unpinned.map((n) => (
              <NoteItem
                key={n.id}
                note={n}
                active={activeNote === n.id}
                onClick={() => onNoteClick(n.id)}
              />
            ))}
          </>
        )}

        {filtered.length === 0 && (
          <div
            style={{
              padding: "20px 10px",
              fontSize: "12px",
              color: "#a0a098",
              textAlign: "center",
            }}
          >
            Tidak ada catatan ditemukan
          </div>
        )}
      </div>

      {/* New note button */}
      <div style={{ padding: "10px 12px", borderTop: "1px solid #dddbd4" }}>
        <button
          onClick={onNewNote}
          style={{
            width: "100%",
            padding: "8px",
            background: "#1a1a18",
            color: "#f5f3ee",
            border: "none",
            borderRadius: "7px",
            fontSize: "12px",
            fontWeight: 500,
            cursor: "pointer",
            letterSpacing: "0.02em",
          }}
        >
          + Catatan baru
        </button>
      </div>
    </div>
  );
}
