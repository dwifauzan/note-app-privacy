import Button from "@/components/ui/Button";
import Tag from "@/components/ui/Tag";
import { Note } from "@/data/mockData";

type TopbarProps = {
  note: Note | undefined;
  isEditing: boolean;
  showBacklinks: boolean;
  backlinkCount: number;
  onToggleEdit: () => void;
  onToggleBacklinks: () => void;
  onManageTags?: () => void;
  onDelete?: () => void;
};

export default function Topbar({
  note,
  isEditing,
  showBacklinks,
  backlinkCount,
  onToggleEdit,
  onToggleBacklinks,
  onManageTags,
  onDelete,
}: TopbarProps) {
  return (
    <div
      style={{
        height: "48px",
        borderBottom: "1px solid #dddbd4",
        display: "flex",
        alignItems: "center",
        padding: "0 24px",
        gap: "12px",
        background: "#f5f3ee",
        flexShrink: 0,
      }}
    >
      {/* Breadcrumb */}
      <div
        style={{ flex: 1, display: "flex", alignItems: "center", gap: "8px" }}
      >
        <span style={{ fontSize: "12px", color: "#8a8a80" }}>
          {note?.folder}
        </span>
        <span style={{ color: "#c0bdb6" }}>/</span>
        <span style={{ fontSize: "13px", fontWeight: 500, color: "#1a1a18" }}>
          {note?.title}
        </span>
      </div>

      {/* Tags + actions */}
      <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
        {note?.tags.map((t) => (
          <Tag key={t} name={t} />
        ))}

        <div
          style={{
            width: "1px",
            height: "16px",
            background: "#dddbd4",
            margin: "0 4px",
          }}
        />

        {onManageTags && (
          <Button
            onClick={onManageTags}
            active={false}
            label="Tags"
          />
        )}

        {onDelete && (
          <Button
            onClick={onDelete}
            active={false}
            label="Hapus"
          />
        )}

        <Button
          onClick={onToggleEdit}
          active={isEditing}
          label={isEditing ? "Preview" : "Edit"}
        />
        <Button
          onClick={onToggleBacklinks}
          active={showBacklinks}
          label={`Links (${backlinkCount})`}
        />
      </div>
    </div>
  );
}
