type TagProps = {
  name: string;
  color?: string;
};

export default function Tag({ name, color }: TagProps) {
  return (
    <span
      style={{
        fontSize: "10px",
        padding: "2px 8px",
        borderRadius: "20px",
        background: color || "#e8e0d8",
        color: "#3a3a35",
        fontWeight: 500,
      }}
    >
      {name}
    </span>
  );
}
