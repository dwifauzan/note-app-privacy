type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Cari catatan..."
      style={{
        width: "100%",
        padding: "7px 10px",
        fontSize: "12px",
        background: "#e8e6e0",
        border: "1px solid #d5d3cc",
        borderRadius: "6px",
        outline: "none",
        color: "#1a1a18",
        boxSizing: "border-box",
      }}
    />
  );
}
