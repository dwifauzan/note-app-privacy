type TagProps = {
  name: string;
  color?: string;
};

export default function Tag({ name, color }: TagProps) {
  return (
    <span
      style={{
        fontSize: "11px",
        padding: "3px 10px",
        borderRadius: "20px",
        background: color || "#f1f5f9",
        color: "#64748b",
        fontWeight: 500,
      }}
    >
      {name}
    </span>
  );
}
