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
        width: "240px",
        flexShrink: 0,
        borderLeft: "1px solid #e2e8f0",
        overflowY: "auto",
        padding: "24px 16px",
        background: "#f8fafc",
      }}
    >
      <div
        style={{
          fontSize: "11px",
          fontWeight: 600,
          color: "#94a3b8",
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          marginBottom: "16px",
        }}
      >
        Backlinks
      </div>

      {backlinks.length === 0 ? (
        <div style={{ fontSize: "13px", color: "#94a3b8", fontStyle: "italic" }}>
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
              padding: "12px 14px",
              borderRadius: "10px",
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              transition: "all 0.15s ease",
            }}
          >
            <div
              style={{
                fontSize: "13px",
                fontWeight: 500,
                color: "#1e293b",
                marginBottom: "4px",
              }}
            >
              {bl.title}
            </div>
            <div
              style={{
                fontSize: "12px",
                color: "#94a3b8",
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
