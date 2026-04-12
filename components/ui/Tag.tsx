import { TAG_COLORS } from "@/data/mockData";

type TagProps = {
  name: string;
};

export default function Tag({ name }: TagProps) {
  return (
    <span
      style={{
        fontSize: "10px",
        padding: "2px 8px",
        borderRadius: "20px",
        background: TAG_COLORS[name] || "#eee",
        color: "#3a3a35",
        fontWeight: 500,
      }}
    >
      {name}
    </span>
  );
}
