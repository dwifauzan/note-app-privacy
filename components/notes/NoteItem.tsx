import { Note } from "@/data/mockData";

type NoteItemProps = {
  note: Note;
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
      <div style={{ fontSize: "11px", color: "#9a9a90" }}>{note.updated}</div>
    </div>
  );
}
