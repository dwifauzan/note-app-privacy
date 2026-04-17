import Button from "@/components/ui/Button";
import Tag from "@/components/ui/Tag";
import { Note as PKMNote } from "@/hooks/usePKM";

type TopbarProps = {
  note: PKMNote | undefined;
  isEditing: boolean;
  showBacklinks: boolean;
  backlinkCount: number;
  onToggleEdit: () => void;
  onToggleBacklinks: () => void;
  onManageTags?: () => void;
  onDelete?: () => void;
  onVersions?: () => void;
  onExportPDF?: () => void;
  onExportDOCX?: () => void;
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
  onVersions,
  onExportPDF,
  onExportDOCX,
}: TopbarProps) {
  return (
    <div
      style={{
        height: "56px",
        borderBottom: "1px solid #e2e8f0",
        display: "flex",
        alignItems: "center",
        padding: "0 24px",
        gap: "8px",
        background: "#f8fafc",
        flexShrink: 0,
      }}
    >
      {/* Breadcrumb */}
      <div
        style={{ flex: 1, display: "flex", alignItems: "center", gap: "8px" }}
      >
        <span style={{ fontSize: "13px", color: "#94a3b8", fontWeight: 500 }}>
          {note?.folder}
        </span>
        <span style={{ color: "#e2e8f0" }}>/</span>
        <span style={{ fontSize: "14px", fontWeight: 600, color: "#1e293b" }}>
          {note?.title}
        </span>
      </div>

      {/* Tags + actions */}
      <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
        {note?.tags.map((t) => (
          <Tag key={t} name={t} />
        ))}

        {note?.tags && note.tags.length > 0 && (
          <div
            style={{
              width: "1px",
              height: "20px",
              background: "#e2e8f0",
              margin: "0 8px",
            }}
          />
        )}

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

        {onVersions && (
          <Button
            onClick={onVersions}
            active={false}
            label="Versi"
          />
        )}

        {onExportPDF && (
          <Button
            onClick={onExportPDF}
            active={false}
            label="PDF"
          />
        )}

        {onExportDOCX && (
          <Button
            onClick={onExportDOCX}
            active={false}
            label="DOCX"
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
