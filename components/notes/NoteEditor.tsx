type NoteEditorProps = {
  content: string;
  onChange: (value: string) => void;
};

export default function NoteEditor({ content, onChange }: NoteEditorProps) {
  return (
    <textarea
      value={content}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: "100%",
        minHeight: "calc(100vh - 200px)",
        background: "transparent",
        border: "none",
        outline: "none",
        fontSize: "14px",
        lineHeight: "1.75",
        color: "#1a1a18",
        fontFamily: "'DM Mono', 'Fira Code', monospace",
        resize: "none",
        boxSizing: "border-box",
      }}
    />
  );
}
