import NoteRenderer from "@/components/notes/NoteRenderer";
import NoteEditor from "@/components/notes/NoteEditor";
import { Note } from "@/data/mockData";

type EditorProps = {
  note: Note | undefined;
  content: string;
  isEditing: boolean;
  editContent: string;
  notes: Note[];
  onLinkClick: (id: number) => void;
  onEditChange: (value: string) => void;
};

export default function Editor({
  note,
  content,
  isEditing,
  editContent,
  notes,
  onLinkClick,
  onEditChange,
}: EditorProps) {
  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "40px 56px" }}>
      {isEditing ? (
        <NoteEditor content={editContent} onChange={onEditChange} />
      ) : (
        <div style={{ maxWidth: "640px" }}>
          {/* Meta info */}
          <div
            style={{
              fontSize: "11px",
              color: "#a0a098",
              marginBottom: "24px",
              display: "flex",
              gap: "16px",
            }}
          >
            <span>{note?.updated}</span>
            <span>{content.split(/\s+/).filter(Boolean).length} kata</span>
          </div>

          <NoteRenderer
            content={content}
            notes={notes}
            onLinkClick={onLinkClick}
          />
        </div>
      )}
    </div>
  );
}
