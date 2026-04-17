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
        background: "rgba(15, 23, 42, 0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        backdropFilter: "blur(4px)",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#ffffff",
          borderRadius: "16px",
          width: "100%",
          maxWidth: 440,
          maxHeight: "80vh",
          overflow: "auto",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
          border: "1px solid #e2e8f0",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid #e2e8f0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2 style={{ margin: 0, fontSize: "18px", fontWeight: 600, color: "#1e293b" }}>
            Riwayat Versi
          </h2>
          <button
            onClick={onClose}
            style={{
              background: "#f1f5f9",
              border: "none",
              width: "28px",
              height: "28px",
              borderRadius: "8px",
              fontSize: "16px",
              cursor: "pointer",
              color: "#64748b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ×
          </button>
        </div>
        <div style={{ padding: "20px" }}>
          {isLoading ? (
            <div style={{ fontSize: "14px", color: "#94a3b8", textAlign: "center", padding: "20px" }}>
              Loading...
            </div>
          ) : versions.length === 0 ? (
            <div style={{ fontSize: "14px", color: "#94a3b8", textAlign: "center", padding: "20px", fontStyle: "italic" }}>
              Belum ada riwayat versi. Setiap kali Anda menyimpan catatan, versi sebelumnya akan disimpan di sini.
            </div>
          ) : selectedContent ? (
            <div>
              <div style={{ fontSize: "14px", fontWeight: 500, marginBottom: "12px", color: "#1e293b" }}>
                Preview
              </div>
              <textarea
                value={selectedContent}
                readOnly
                style={{
                  width: "100%",
                  height: 180,
                  padding: "14px",
                  border: "1px solid #e2e8f0",
                  borderRadius: "10px",
                  fontSize: "13px",
                  resize: "none",
                  boxSizing: "border-box",
                  fontFamily: "monospace",
                  color: "#334155",
                  background: "#f8fafc",
                }}
              />
              <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", marginTop: "16px" }}>
                <button
                  onClick={onBack}
                  style={{
                    padding: "10px 18px",
                    borderRadius: "8px",
                    background: "#f1f5f9",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#64748b",
                  }}
                >
                  Kembali
                </button>
                <button
                  onClick={onRestore}
                  style={{
                    padding: "10px 18px",
                    borderRadius: "8px",
                    background: "#7c3aed",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#ffffff",
                    boxShadow: "0 2px 8px rgba(124, 58, 237, 0.3)",
                  }}
                >
                  Pulihkan
                </button>
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {versions.map((v) => (
                <div
                  key={v.id}
                  onClick={() => onSelectVersion(v)}
                  style={{
                    padding: "14px 16px",
                    background: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    borderRadius: "10px",
                    cursor: "pointer",
                  }}
                >
                  <div style={{ fontSize: "14px", fontWeight: 500, color: "#1e293b" }}>
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
