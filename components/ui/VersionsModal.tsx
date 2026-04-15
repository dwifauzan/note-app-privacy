"use client";

type NoteVersion = {
  id: number;
  noteId: number;
  historyContent: string;
  createdAt: Date;
};

type VersionsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  versions: NoteVersion[];
  isLoading: boolean;
  selectedContent: string | null;
  onSelectVersion: (version: NoteVersion) => void;
  onRestore: () => void;
  onBack: () => void;
};

export default function VersionsModal({
  isOpen,
  onClose,
  versions,
  isLoading,
  selectedContent,
  onSelectVersion,
  onRestore,
  onBack,
}: VersionsModalProps) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#f5f3ee",
          borderRadius: 12,
          width: "100%",
          maxWidth: 500,
          maxHeight: "80vh",
          overflow: "auto",
          boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            padding: "16px 20px",
            borderBottom: "1px solid #dddbd4",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>Riwayat Versi</h2>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: 20,
              cursor: "pointer",
              color: "#8a8a80",
            }}
          >
            ×
          </button>
        </div>
        <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 12 }}>
          {isLoading ? (
            <div style={{ fontSize: 13, color: "#8a8a80" }}>Loading...</div>
          ) : versions.length === 0 ? (
            <div style={{ fontSize: 13, color: "#8a8a80", fontStyle: "italic" }}>
              Belum ada riwayat versi. Setiap kali Anda menyimpan catatan, versi sebelumnya akan disimpan di sini.
            </div>
          ) : selectedContent ? (
            <div>
              <div style={{ fontSize: 12, fontWeight: 500, marginBottom: 8 }}>Preview</div>
              <textarea
                value={selectedContent}
                readOnly
                style={{
                  width: "100%",
                  height: 200,
                  padding: 10,
                  border: "1px solid #dddbd4",
                  borderRadius: 8,
                  fontSize: 13,
                  resize: "none",
                  boxSizing: "border-box",
                  fontFamily: "inherit",
                }}
              />
              <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 12 }}>
                <button
                  onClick={onBack}
                  style={{
                    padding: "8px 16px",
                    borderRadius: 7,
                    background: "#fff",
                    border: "1px solid #dddbd4",
                    cursor: "pointer",
                    fontSize: 13,
                  }}
                >
                  Kembali
                </button>
                <button
                  onClick={onRestore}
                  style={{
                    padding: "8px 16px",
                    borderRadius: 7,
                    background: "#1a1a18",
                    color: "#fff",
                    border: "none",
                    cursor: "pointer",
                    fontSize: 13,
                  }}
                >
                  Pulihkan
                </button>
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {versions.map((v) => (
                <div
                  key={v.id}
                  onClick={() => onSelectVersion(v)}
                  style={{
                    padding: "10px 12px",
                    background: "#fff",
                    border: "1px solid #dddbd4",
                    borderRadius: 8,
                    cursor: "pointer",
                  }}
                >
                  <div style={{ fontSize: 12, fontWeight: 500 }}>
                    {new Date(v.createdAt).toLocaleString("id-ID")}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
