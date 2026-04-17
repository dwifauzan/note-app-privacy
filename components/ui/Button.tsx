type ButtonProps = {
  onClick: () => void;
  active?: boolean;
  label: string;
};

export default function Button({
  onClick,
  active = false,
  label,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "6px 14px",
        fontSize: "12px",
        fontWeight: 500,
        border: "none",
        borderRadius: "6px",
        background: active ? "#7c3aed" : "#f1f5f9",
        color: active ? "#ffffff" : "#64748b",
        cursor: "pointer",
        transition: "all 0.15s ease",
      }}
    >
      {label}
    </button>
  );
}
