import NoteRenderer from "@/components/notes/NoteRenderer";
import NoteEditor from "@/components/notes/NoteEditor";
import Tag from "@/components/ui/Tag";
import { Note } from "@/data/mockData";

type TagType = {
  id: number;
  name: string;
  colorTag: string | null;
};

type EditorProps = {
  note: Note | undefined;
  content: string;
  isEditing: boolean;
  editContent: string;
  notes: Note[];
  tags?: TagType[];
  onLinkClick: (id: number) => void;
  onEditChange: (value: string) => void;
};

export default function Editor({
  note,
  content,
  isEditing,
  editContent,
  notes,
  tags = [],
  onLinkClick,
  onEditChange,
}: EditorProps) {
  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "40px 56px" }}>
      {isEditing ? (
        <NoteEditor content={editContent} onChange={onEditChange} />
      ) : (
        <div style={{ maxWidth: "640px" }}>
          {/* Tags display */}
          {tags.length > 0 && (
            <div style={{ display: "flex", gap: "6px", marginBottom: "12px", flexWrap: "wrap" }}>
              {tags.map((tag) => (
                <Tag key={tag.id} name={tag.name} color={tag.colorTag || "#e8e0d8"} />
              ))}
            </div>
          )}

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
