"use client";

import NoteItem from "@/components/notes/NoteItem";
import SearchInput from "@/components/ui/SearchInput";
import { FOLDERS, Note } from "@/data/mockData";

const FOLDER_COLORS: Record<string, { bg: string; text: string }> = {
  semua: { bg: "#e2e8f0", text: "#475569" },
  inbox: { bg: "#f3e8ff", text: "#7c3aed" },
  learning: { bg: "#e0f2fe", text: "#0284c7" },
  projects: { bg: "#dcfce7", text: "#16a34a" },
  daily: { bg: "#fef3c7", text: "#d97706" },
  ideas: { bg: "#fce7f3", text: "#db2777" },
};

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
        width: "260px",
        flexShrink: 0,
        background: "#ffffff",
        borderRight: "1px solid #e2e8f0",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <div style={{ padding: "20px 20px 16px" }}>
        <div
          style={{
            fontSize: "20px",
            fontWeight: 700,
            color: "#7c3aed",
            letterSpacing: "-0.02em",
          }}
        >
          PKM
        </div>
        <div style={{ fontSize: "12px", color: "#94a3b8", marginTop: "2px" }}>
          Personal Knowledge
        </div>
      </div>

      <div style={{ padding: "0 16px 16px" }}>
        <SearchInput value={search} onChange={onSearchChange} />
      </div>

      <div style={{ padding: "0 8px 8px" }}>
        {FOLDERS.map((f) => {
          const colors = FOLDER_COLORS[f] || FOLDER_COLORS.inbox;
          const isActive = activeFolder === f;
          return (
            <div
              key={f}
              onClick={() => onFolderChange(f)}
              style={{
                padding: "8px 12px",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: isActive ? 600 : 500,
                background: isActive ? colors.bg : "transparent",
                color: isActive ? colors.text : "#475569",
                marginBottom: "2px",
                textTransform: "capitalize",
                transition: "all 0.15s ease",
              }}
            >
              {f}
            </div>
          );
        })}
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "8px 8px 16px" }}>
        {pinned.length > 0 && (
          <>
            <div
              style={{
                fontSize: "11px",
                fontWeight: 600,
                color: "#94a3b8",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                padding: "8px 12px 6px",
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
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "#94a3b8",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  padding: "12px 12px 6px",
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
              fontSize: "13px",
              color: "#94a3b8",
              textAlign: "center",
            }}
          >
            Tidak ada catatan ditemukan
          </div>
        )}
      </div>

      <div style={{ padding: "12px 16px", borderTop: "1px solid #e2e8f0" }}>
        <button
          onClick={onNewNote}
          style={{
            width: "100%",
            padding: "12px",
            background: "#7c3aed",
            color: "#ffffff",
            border: "none",
            borderRadius: "10px",
            fontSize: "14px",
            fontWeight: 600,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            boxShadow: "0 2px 8px rgba(124, 58, 237, 0.3)",
          }}
        >
          <span style={{ fontSize: "18px", lineHeight: 1 }}>+</span>
          Catatan Baru
        </button>
      </div>
    </div>
  );
}
