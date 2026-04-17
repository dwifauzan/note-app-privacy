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
        maxWidth: "720px",
        minHeight: "calc(100vh - 200px)",
        background: "transparent",
        border: "none",
        outline: "none",
        fontSize: "15px",
        lineHeight: "1.8",
        color: "#1e293b",
        fontFamily: "'SF Mono', 'Fira Code', 'Monaco', monospace",
        resize: "none",
        boxSizing: "border-box",
      }}
    />
  );
}
