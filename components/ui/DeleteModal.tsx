"use client";

type DeleteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  noteTitle?: string;
};

export default function DeleteModal({ isOpen, onClose, onConfirm, noteTitle }: DeleteModalProps) {
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
          maxWidth: 400,
          boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #dddbd4" }}>
          <h2 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>Hapus Catatan</h2>
        </div>
        <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 12 }}>
          <div>Apakah kamu yakin ingin menghapus catatan{noteTitle ? ` "${noteTitle}"` : ""}?</div>
          <div style={{ fontSize: 13, color: "#8a8a80" }}>Tindakan ini tidak dapat dibatalkan.</div>
          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 8 }}>
            <button
              onClick={onClose}
              style={{
                padding: "8px 16px",
                borderRadius: 7,
                background: "#fff",
                border: "1px solid #dddbd4",
                cursor: "pointer",
                fontSize: 13,
              }}
            >
              Batal
            </button>
            <button
              onClick={onConfirm}
              style={{
                padding: "8px 16px",
                borderRadius: 7,
                background: "#d32f2f",
                color: "#fff",
                border: "none",
                cursor: "pointer",
                fontSize: 13,
              }}
            >
              Hapus
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
