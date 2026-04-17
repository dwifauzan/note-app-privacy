import { Note } from "@/data/mockData";

type NoteRendererProps = {
  content: string;
  notes: Note[];
  onLinkClick: (id: number) => void;
};

export default function NoteRenderer({
  content,
  notes,
  onLinkClick,
}: NoteRendererProps) {
  const lines = content.split("\n");

  return (
    <div style={{ fontSize: "15px", lineHeight: "1.8", color: "#334155" }}>
      {lines.map((line, i) => renderLine(line, i, notes, onLinkClick))}
    </div>
  );
}

function renderInline(
  line: string,
  notes: Note[],
  onLinkClick: (id: number) => void,
) {
  const parts = line.split(/(\[\[[^\]]+\]\])/g);
  return parts.map((part, j) => {
    const match = part.match(/^\[\[(.+)\]\]$/);
    if (match) {
      const linkTitle = match[1];
      const target = notes.find((n) => n.title === linkTitle);
      return (
        <span
          key={j}
          onClick={() => target && onLinkClick(target.id)}
          style={{
            color: "#7c3aed",
            textDecoration: "underline",
            textUnderlineOffset: "3px",
            cursor: target ? "pointer" : "default",
            fontWeight: 500,
          }}
        >
          {linkTitle}
        </span>
      );
    }
    return <span key={j}>{part}</span>;
  });
}

function renderLine(
  line: string,
  i: number,
  notes: Note[],
  onLinkClick: (id: number) => void,
) {
  if (line.startsWith("# ")) {
    return (
      <h1
        key={i}
        style={{
          fontSize: "28px",
          fontWeight: 700,
          color: "#1e293b",
          marginBottom: "20px",
          marginTop: 0,
          letterSpacing: "-0.02em",
          lineHeight: "1.3",
        }}
      >
        {line.slice(2)}
      </h1>
    );
  }

  if (line.startsWith("## ")) {
    return (
      <h2
        key={i}
        style={{
          fontSize: "14px",
          fontWeight: 600,
          color: "#64748b",
          marginTop: "28px",
          marginBottom: "10px",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
        }}
      >
        {line.slice(3)}
      </h2>
    );
  }

  if (line.startsWith("- [x] ") || line.startsWith("- [ ] ")) {
    const done = line.startsWith("- [x]");
    return (
      <div
        key={i}
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "6px",
          alignItems: "center",
        }}
      >
        <span
          style={{
            width: "16px",
            height: "16px",
            border: "1px solid #cbd5e1",
            borderRadius: "4px",
            background: done ? "#7c3aed" : "transparent",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {done && <span style={{ color: "#fff", fontSize: "10px" }}>✓</span>}
        </span>
        <span
          style={{
            color: done ? "#94a3b8" : "#334155",
            textDecoration: done ? "line-through" : "none",
          }}
        >
          {line.slice(6)}
        </span>
      </div>
    );
  }

  if (line.startsWith("- ") || line.startsWith("* ")) {
    return (
      <div key={i} style={{ display: "flex", gap: "10px", marginBottom: "6px" }}>
        <span style={{ color: "#94a3b8", marginTop: "4px" }}>•</span>
        <span style={{ color: "#334155" }}>
          {renderInline(line.slice(2), notes, onLinkClick)}
        </span>
      </div>
    );
  }

  if (line.match(/^\d+\./)) {
    const num = line.match(/^\d+/)?.[0];
    const text = line.replace(/^\d+\.\s*/, "");
    return (
      <div key={i} style={{ display: "flex", gap: "10px", marginBottom: "6px" }}>
        <span style={{ color: "#94a3b8", minWidth: "20px" }}>{num}.</span>
        <span style={{ color: "#334155" }}>
          {renderInline(text, notes, onLinkClick)}
        </span>
      </div>
    );
  }

  if (line.startsWith("```")) {
    return <div key={i} style={{ display: "none" }} />;
  }

  if (line === "") {
    return <div key={i} style={{ height: "12px" }} />;
  }

  return (
    <p
      key={i}
      style={{ margin: "0 0 8px 0", color: "#334155", lineHeight: "1.8" }}
    >
      {renderInline(line, notes, onLinkClick)}
    </p>
  );
}
