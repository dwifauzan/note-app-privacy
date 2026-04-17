import { Note as PKMNote } from "@/hooks/usePKM";

type NoteItemProps = {
  note: PKMNote;
  active: boolean;
  onClick: () => void;
};

export default function NoteItem({ note, active, onClick }: NoteItemProps) {
  return (
    <div
      onClick={onClick}
      style={{
        padding: "10px 12px",
        borderRadius: "10px",
        cursor: "pointer",
        background: active ? "#f3e8ff" : "transparent",
        marginBottom: "2px",
        transition: "all 0.15s ease",
        border: active ? "1px solid #7c3aed" : "1px solid transparent",
      }}
    >
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
      <div style={{ fontSize: "11px", color: "#94a3b8" }}>{note.updated}</div>
    </div>
  );
}
