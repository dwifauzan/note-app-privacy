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
    <div style={{ fontSize: "14px", lineHeight: "1.75" }}>
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
            color: "#5c7a5c",
            borderBottom: "1px solid #8aab8a",
            cursor: target ? "pointer" : "default",
            fontStyle: "italic",
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
          fontSize: "20px",
          fontWeight: 600,
          color: "#1a1a18",
          marginBottom: "16px",
          marginTop: 0,
          letterSpacing: "-0.02em",
          fontFamily: "'DM Serif Display', Georgia, serif",
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
          color: "#3a3a35",
          marginTop: "24px",
          marginBottom: "8px",
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
          gap: "8px",
          marginBottom: "4px",
          alignItems: "center",
        }}
      >
        <span
          style={{
            width: "14px",
            height: "14px",
            border: "1px solid #bbb",
            borderRadius: "3px",
            background: done ? "#5c7a5c" : "transparent",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {done && <span style={{ color: "#fff", fontSize: "9px" }}>✓</span>}
        </span>
        <span
          style={{
            color: done ? "#8a8a80" : "#3a3a35",
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
      <div key={i} style={{ display: "flex", gap: "8px", marginBottom: "4px" }}>
        <span style={{ color: "#8a8a80", marginTop: "2px" }}>·</span>
        <span style={{ color: "#3a3a35" }}>
          {renderInline(line.slice(2), notes, onLinkClick)}
        </span>
      </div>
    );
  }

  if (line.match(/^\d+\./)) {
    const num = line.match(/^\d+/)?.[0];
    const text = line.replace(/^\d+\.\s*/, "");
    return (
      <div key={i} style={{ display: "flex", gap: "8px", marginBottom: "4px" }}>
        <span style={{ color: "#8a8a80", minWidth: "16px" }}>{num}.</span>
        <span style={{ color: "#3a3a35" }}>
          {renderInline(text, notes, onLinkClick)}
        </span>
      </div>
    );
  }

  if (line.startsWith("```")) {
    return <div key={i} style={{ display: "none" }} />;
  }

  if (line === "") {
    return <div key={i} style={{ height: "8px" }} />;
  }

  return (
    <p
      key={i}
      style={{ margin: "0 0 6px 0", color: "#3a3a35", lineHeight: "1.75" }}
    >
      {renderInline(line, notes, onLinkClick)}
    </p>
  );
}
