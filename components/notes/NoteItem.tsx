import { useState, useRef, useEffect } from "react";
import { Note as PKMNote } from "@/hooks/usePKM";

type NoteItemProps = {
  note: PKMNote;
  active: boolean;
  onClick: () => void;
  onPinToggle: (id: number, pinned: boolean) => void;
};

export default function NoteItem({ note, active, onClick, onPinToggle }: NoteItemProps) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowMenu(true);
  };

  return (
    <div
      ref={menuRef}
      onClick={onClick}
      onContextMenu={handleContextMenu}
      style={{
        padding: "10px 12px",
        borderRadius: "10px",
        cursor: "pointer",
        background: active ? "#f3e8ff" : "transparent",
        marginBottom: "2px",
        transition: "all 0.15s ease",
        border: active ? "1px solid #7c3aed" : "1px solid transparent",
        position: "relative",
      }}
    >
      {showMenu && (
        <div
          style={{
            position: "absolute",
            right: "8px",
            top: "50%",
            transform: "translateY(-50%)",
            background: "#fff",
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            zIndex: 100,
            minWidth: "140px",
            overflow: "hidden",
          }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPinToggle(note.id, !note.pinned);
              setShowMenu(false);
            }}
            style={{
              display: "block",
              width: "100%",
              padding: "10px 14px",
              border: "none",
              background: "transparent",
              textAlign: "left",
              fontSize: "13px",
              color: "#334155",
              cursor: "pointer",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#f1f5f9")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            {note.pinned ? "📌 Unpin" : "📌 Pin"}
          </button>
        </div>
      )}
      <div
        style={{
          fontSize: "13px",
          fontWeight: active ? 600 : 500,
          color: active ? "#7c3aed" : "#334155",
          marginBottom: "4px",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {note.pinned && (
          <span style={{ color: "#d97706", marginRight: "4px", fontSize: "10px" }}>
            📌
          </span>
        )}
        {note.title}
      </div>
      {note.tags && note.tags.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginBottom: "4px" }}>
          {note.tags.slice(0, 3).map((tag, idx) => (
            <span
              key={idx}
              style={{
                fontSize: "10px",
                padding: "2px 6px",
                background: "#f1f5f9",
                borderRadius: "4px",
                color: "#64748b",
              }}
            >
              {tag}
            </span>
          ))}
          {note.tags.length > 3 && (
            <span style={{ fontSize: "10px", color: "#94a3b8" }}>
              +{note.tags.length - 3}
            </span>
          )}
        </div>
      )}
      <div style={{ fontSize: "11px", color: "#94a3b8", display: "flex", justifyContent: "space-between" }}>
        <span>{note.created}</span>
        <span>{note.updated}</span>
      </div>
    </div>
  );
}
