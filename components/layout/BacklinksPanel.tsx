type BacklinkType = {
  id: number;
  title: string;
  ctx: string;
};

type BacklinksPanelProps = {
  backlinks: BacklinkType[];
  onNoteClick: (id: number) => void;
};

export default function BacklinksPanel({
  backlinks,
  onNoteClick,
}: BacklinksPanelProps) {
  return (
    <div
      style={{
        width: "220px",
        flexShrink: 0,
        borderLeft: "1px solid #dddbd4",
        overflowY: "auto",
        padding: "24px 16px",
        background: "#f0ede8",
      }}
    >
      <div
        style={{
          fontSize: "10px",
          fontWeight: 600,
          color: "#a0a098",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          marginBottom: "14px",
        }}
      >
        Backlinks
      </div>

      {backlinks.length === 0 ? (
        <div
          style={{ fontSize: "12px", color: "#b0ae a8", fontStyle: "italic" }}
        >
          Belum ada catatan yang menautkan ke sini
        </div>
      ) : (
        backlinks.map((bl) => (
          <div
            key={bl.id}
            onClick={() => onNoteClick(bl.id)}
            style={{
              marginBottom: "12px",
              cursor: "pointer",
              padding: "10px 12px",
              borderRadius: "8px",
              background: "#e8e5df",
              border: "1px solid #dddbd4",
              transition: "background .1s",
            }}
          >
            <div
              style={{
                fontSize: "12px",
                fontWeight: 500,
                color: "#1a1a18",
                marginBottom: "4px",
              }}
            >
              {bl.title}
            </div>
            <div
              style={{
                fontSize: "11px",
                color: "#7a7a72",
                lineHeight: "1.5",
                fontStyle: "italic",
              }}
            >
              {bl.ctx}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
