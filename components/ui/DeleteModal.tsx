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
          maxWidth: 360,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
          border: "1px solid #e2e8f0",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ padding: "24px", textAlign: "center" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              background: "#fee2e2",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px",
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2">
              <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
            </svg>
          </div>
          <h2 style={{ margin: "0 0 8px", fontSize: "18px", fontWeight: 600, color: "#1e293b" }}>
            Hapus Catatan
          </h2>
          <p style={{ margin: 0, fontSize: "14px", color: "#64748b", lineHeight: "1.5" }}>
            Apakah kamu yakin ingin menghapus &quot;{noteTitle}&quot;? Tindakan ini tidak dapat dibatalkan.
          </p>
        </div>
        <div style={{ padding: "16px 24px 24px", display: "flex", gap: "10px", justifyContent: "center" }}>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: "12px 20px",
              borderRadius: "10px",
              background: "#f1f5f9",
              border: "none",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: 500,
              color: "#64748b",
            }}
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            style={{
              flex: 1,
              padding: "12px 20px",
              borderRadius: "10px",
              background: "#dc2626",
              border: "none",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: 500,
              color: "#ffffff",
            }}
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}
