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
        padding: "8px 10px",
        borderRadius: "7px",
        cursor: "pointer",
        background: active ? "#e0ddd6" : "transparent",
        marginBottom: "1px",
        borderLeft: active ? "2px solid #5c7a5c" : "2px solid transparent",
      }}
    >
      <div
        style={{
          fontSize: "12px",
          fontWeight: active ? 500 : 400,
          color: active ? "#1a1a18" : "#3a3a35",
          marginBottom: "2px",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {note.pinned && (
          <span
            style={{ color: "#8a8a80", marginRight: "4px", fontSize: "10px" }}
          >
            ⊙
          </span>
        )}
        {note.title}
      </div>
      {note.tags && note.tags.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "3px", marginBottom: "2px" }}>
          {note.tags.slice(0, 3).map((tag, idx) => (
            <span
              key={idx}
              style={{
                fontSize: "9px",
                padding: "1px 5px",
                background: "#e0ddd6",
                borderRadius: "4px",
                color: "#5a5a52",
              }}
            >
              {tag}
            </span>
          ))}
          {note.tags.length > 3 && (
            <span style={{ fontSize: "9px", color: "#9a9a90" }}>
              +{note.tags.length - 3}
            </span>
          )}
        </div>
      )}
      <div style={{ fontSize: "11px", color: "#9a9a90" }}>{note.updated}</div>
    </div>
  );
}
