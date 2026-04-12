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
        padding: "4px 12px",
        fontSize: "11px",
        fontWeight: 500,
        border: "1px solid",
        borderColor: active ? "#5c7a5c" : "#dddbd4",
        borderRadius: "6px",
        background: active ? "#eaf2ea" : "transparent",
        color: active ? "#3a5c3a" : "#6a6a62",
        cursor: "pointer",
        transition: "all .15s",
      }}
    >
      {label}
    </button>
  );
}
