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
        padding: "10px 14px",
        fontSize: "13px",
        background: "#f8fafc",
        border: "1px solid #e2e8f0",
        borderRadius: "10px",
        outline: "none",
        color: "#1e293b",
        boxSizing: "border-box",
      }}
    />
  );
}
