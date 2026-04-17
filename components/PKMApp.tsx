"use client";

import { useState, useCallback } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import Editor from "@/components/layout/Editor";
import BacklinksPanel from "@/components/layout/BacklinksPanel";
import Modal from "@/components/ui/Modal";
import DeleteModal from "@/components/ui/DeleteModal";
import VersionsModal from "@/components/ui/VersionsModal";
import {
  useNotes,
  useActiveNote,
  useEditor,
  useSidebar,
  Tag,
  mapDbNoteToNote,
} from "@/hooks/usePKM";
import { createNote, deleteNote } from "@/lib/notes";
import { generateFilePath, writeNoteFile, deleteNoteFile } from "@/lib/files";
import { exportToPDF, exportToDOCX } from "@/lib/export";
import { ToastProvider, useToast } from "@/components/ui/Toast";
import {
  getAllTags,
  createTag,
  deleteTag,
  addTagToNote,
  removeTagFromNote,
  Tag as DbTag,
} from "@/lib/tags";
import { getVersionsByNoteId, NoteVersion } from "@/lib/versions";

const TAG_COLORS = [
  { name: "Default", value: "#e8e0d8" },
  { name: "Red", value: "#f8e0e0" },
  { name: "Green", value: "#e0f0e8" },
  { name: "Blue", value: "#e0e8f0" },
  { name: "Yellow", value: "#f8f0e0" },
  { name: "Purple", value: "#f0e8f8" },
];

export default function PKMApp() {
  const { showToast } = useToast();
  const { notes, isLoading: notesLoading, refetch } = useNotes();
  const [activeNoteId, setActiveNoteId] = useState<number>(1);

  const {
    currentNote: dbCurrentNote,
    currentContent,
    currentTags,
    currentBacklinks,
  } = useActiveNote(activeNoteId);

  const currentNote = dbCurrentNote
    ? mapDbNoteToNote(dbCurrentNote, currentTags as unknown as DbTag[])
    : undefined;

  const handleSave = useCallback(() => {
    refetch();
  }, [refetch]);

  const { isEditing, editContent, setEditContent, saveNote } = useEditor(
    dbCurrentNote?.id || 0,
    currentContent,
    handleSave,
  );

  const {
    activeFolder,
    search,
    showBacklinks,
    setActiveFolder,
    setSearch,
    toggleBacklinks,
  } = useSidebar();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteContent, setNewNoteContent] = useState("");
  const [newNoteFolder, setNewNoteFolder] = useState("inbox");
  const [isCreating, setIsCreating] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);

  const [showTagsModal, setShowTagsModal] = useState(false);
  const [allTags, setAllTags] = useState<Tag[]>([]);
  const [newTagName, setNewTagName] = useState("");
  const [newTagColor, setNewTagColor] = useState(TAG_COLORS[0].value);
  const [isLoadingTags, setIsLoadingTags] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [showVersionsModal, setShowVersionsModal] = useState(false);
  const [noteVersions, setNoteVersions] = useState<NoteVersion[]>([]);
  const [isLoadingVersions, setIsLoadingVersions] = useState(false);
  const [selectedVersionContent, setSelectedVersionContent] = useState<
    string | null
  >(null);

  const folders = ["inbox", "learning", "projects", "daily", "ideas"];

  const loadTags = useCallback(async () => {
    try {
      setIsLoadingTags(true);
      const tags = await getAllTags();
      setAllTags(tags);
    } catch (err) {
      console.error("Error loading tags:", err);
    } finally {
      setIsLoadingTags(false);
    }
  }, []);

  const handleOpenTags = () => {
    loadTags();
    setShowTagsModal(true);
  };

  const handleCreateTag = async () => {
    if (!newTagName.trim()) return;
    try {
      await createTag({ name: newTagName.trim(), colorTag: newTagColor });
      setNewTagName("");
      await loadTags();
    } catch (err) {
      console.error("Error creating tag:", err);
    }
  };

  const handleDeleteTag = async (id: number) => {
    try {
      await deleteTag(id);
      await loadTags();
    } catch (err) {
      console.error("Error deleting tag:", err);
    }
  };

  const handleAddTagToNote = async (tagId: number) => {
    if (!dbCurrentNote) return;
    try {
      await addTagToNote(dbCurrentNote.id, tagId);
      window.location.reload();
    } catch (err) {
      console.error("Error adding tag to note:", err);
    }
  };

  const handleRemoveTagFromNote = async (tagId: number) => {
    if (!dbCurrentNote) return;
    try {
      await removeTagFromNote(dbCurrentNote.id, tagId);
      window.location.reload();
    } catch (err) {
      console.error("Error removing tag from note:", err);
    }
  };

  const handleDeleteNote = async () => {
    if (!dbCurrentNote) return;
    try {
      await deleteNoteFile(dbCurrentNote.filePath);
      await deleteNote(dbCurrentNote.id);
      setShowDeleteModal(false);
      if (notes.length > 1) {
        const nextNote = notes.find((n) => n.id !== dbCurrentNote.id);
        if (nextNote) setActiveNoteId(nextNote.id);
      } else {
        setActiveNoteId(0);
      }
      await refetch();
    } catch (err) {
      console.error("Error deleting note:", err);
    }
  };

  const handleOpenVersions = async () => {
    if (!dbCurrentNote) return;
    try {
      setIsLoadingVersions(true);
      const versions = await getVersionsByNoteId(dbCurrentNote.id);
      setNoteVersions(versions);
      setShowVersionsModal(true);
    } catch (err) {
      console.error("Error loading versions:", err);
    } finally {
      setIsLoadingVersions(false);
    }
  };

  const handleRestoreVersion = (version: NoteVersion) => {
    setSelectedVersionContent(version.historyContent);
  };

  const handleConfirmRestore = () => {
    if (selectedVersionContent && dbCurrentNote) {
      setEditContent(selectedVersionContent);
      setShowVersionsModal(false);
      setShowEditModal(true);
    }
  };

  const handleExportPDF = () => {
    if (currentNote && currentContent) {
      exportToPDF(currentNote.title, currentContent, currentNote.tags)
        .then(() => showToast("Berhasil export ke PDF"))
        .catch(() => showToast("Gagal export PDF", "error"));
    }
  };

  const handleExportDOCX = () => {
    if (currentNote && currentContent) {
      exportToDOCX(currentNote.title, currentContent, currentNote.tags)
        .then(() => showToast("Berhasil export ke DOCX"))
        .catch(() => showToast("Gagal export DOCX", "error"));
    }
  };

  const handleNoteClick = (id: number) => {
    setActiveNoteId(id);
  };

  const handleNewNote = () => {
    setNewNoteTitle("");
    setNewNoteContent("");
    setShowCreateModal(true);
  };

  const handleCreateNote = async () => {
    if (!newNoteTitle.trim()) return;

    try {
      setIsCreating(true);
      const filePath = await generateFilePath(newNoteTitle, newNoteFolder);
      await writeNoteFile(filePath, newNoteContent || `# ${newNoteTitle}\n\n`);
      const newNote = await createNote({
        title: newNoteTitle,
        filePath,
        folder: newNoteFolder,
      });
      await refetch();
      setActiveNoteId(newNote.id);
      setShowCreateModal(false);
    } catch (err) {
      console.error("Error creating note:", err);
    } finally {
      setIsCreating(false);
    }
  };

  const handleOpenEdit = () => {
    if (currentNote) {
      setEditContent(currentContent);
      setShowEditModal(true);
    }
  };

  const handleSaveEdit = async () => {
    if (dbCurrentNote) {
      try {
        await saveNote(dbCurrentNote, editContent, currentContent);
        setShowEditModal(false);
      } catch (err) {
        console.error("Error saving note:", err);
      }
    }
  };

  const handleToggleEdit = () => {
    if (isEditing) {
      handleSaveEdit();
    } else {
      handleOpenEdit();
    }
  };

  if (notesLoading) {
    return (
      <div
        style={{
          display: "flex",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
          background: "#f8fafc",
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          color: "#475569",
        }}
      >
        <span style={{ fontSize: "15px", fontWeight: 500 }}>Loading...</span>
      </div>
    );
  }

  return (
    <ToastProvider>
      <div
        style={{
          display: "flex",
          height: "100vh",
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          background: "#f8fafc",
          color: "#1e293b",
          fontSize: "14px",
        }}
      >
        <Sidebar
          notes={notes}
          activeNote={activeNoteId}
          activeFolder={activeFolder}
          search={search}
          onNoteClick={handleNoteClick}
          onFolderChange={setActiveFolder}
          onSearchChange={setSearch}
          onNewNote={handleNewNote}
        />

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            minWidth: 0,
          }}
        >
          <Topbar
            note={currentNote}
            isEditing={isEditing}
            showBacklinks={showBacklinks}
            backlinkCount={currentBacklinks.length}
            onToggleEdit={handleToggleEdit}
            onToggleBacklinks={toggleBacklinks}
            onManageTags={handleOpenTags}
            onDelete={() => setShowDeleteModal(true)}
            onVersions={handleOpenVersions}
            onExportPDF={handleExportPDF}
            onExportDOCX={handleExportDOCX}
          />

          <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
            <Editor
              note={currentNote}
              content={currentContent}
              isEditing={isEditing}
              editContent={editContent}
              notes={notes}
              tags={currentTags}
              onLinkClick={handleNoteClick}
              onEditChange={setEditContent}
            />

            {showBacklinks && (
              <BacklinksPanel
                backlinks={currentBacklinks}
                onNoteClick={handleNoteClick}
              />
            )}
          </div>
        </div>

        <Modal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          title="Catatan Baru"
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
              <input
                type="text"
                value={newNoteTitle}
                onChange={(e) => setNewNoteTitle(e.target.value)}
                placeholder="Judul catatan..."
                autoFocus
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  border: "1px solid var(--border)",
                  borderRadius: "10px",
                  fontSize: "15px",
                  background: "var(--background)",
                  color: "var(--foreground)",
                  outline: "none",
                  boxSizing: "border-box",
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && newNoteTitle.trim()) {
                    handleCreateNote();
                  }
                }}
              />
            </div>
            <div>
              <select
                value={newNoteFolder}
                onChange={(e) => setNewNoteFolder(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "1px solid var(--border)",
                  borderRadius: "10px",
                  fontSize: "14px",
                  background: "var(--background)",
                  color: "var(--foreground)",
                  outline: "none",
                  boxSizing: "border-box",
                  cursor: "pointer",
                }}
              >
                {folders.map((f) => (
                  <option key={f} value={f}>
                    {f === "inbox"
                      ? "Inbox"
                      : f.charAt(0).toUpperCase() + f.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <textarea
                value={newNoteContent}
                onChange={(e) => setNewNoteContent(e.target.value)}
                placeholder="Tuliskan isi catatan (opsional)..."
                rows={4}
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  border: "1px solid var(--border)",
                  borderRadius: "10px",
                  fontSize: "14px",
                  background: "var(--background)",
                  color: "var(--foreground)",
                  outline: "none",
                  resize: "vertical",
                  fontFamily: "inherit",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", paddingTop: "8px" }}>
              <button
                onClick={() => setShowCreateModal(false)}
                style={{
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "8px",
                  background: "var(--border-light)",
                  color: "var(--text-muted)",
                  fontSize: "14px",
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                Batal
              </button>
              <button
                onClick={handleCreateNote}
                disabled={!newNoteTitle.trim() || isCreating}
                style={{
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "8px",
                  background: newNoteTitle.trim() && !isCreating 
                    ? "#93C5FD" 
                    : "var(--border)",
                  color: newNoteTitle.trim() && !isCreating ? "#1e293b" : "var(--text-muted)",
                  fontSize: "14px",
                  fontWeight: 500,
                  cursor: newNoteTitle.trim() && !isCreating ? "pointer" : "not-allowed",
                  boxShadow: newNoteTitle.trim() && !isCreating ? "0 2px 8px rgba(124, 58, 237, 0.3)" : "none",
                }}
              >
                {isCreating ? "Membuat..." : "Buat Catatan"}
              </button>
            </div>
          </div>
        </Modal>

        <Modal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          title={`Edit: ${currentNote?.title || ""}`}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                placeholder="Tuliskan isi catatan..."
                rows={12}
                autoFocus
                style={{
                  width: "100%",
                  padding: "16px",
                  border: "1px solid var(--border)",
                  borderRadius: "10px",
                  fontSize: "14px",
                  background: "var(--background)",
                  color: "var(--foreground)",
                  outline: "none",
                  resize: "vertical",
                  fontFamily: "monospace",
                  boxSizing: "border-box",
                  lineHeight: "1.7",
                }}
              />
            </div>
            <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", paddingTop: "8px" }}>
              <button
                onClick={() => setShowEditModal(false)}
                style={{
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "8px",
                  background: "var(--border-light)",
                  color: "var(--text-muted)",
                  fontSize: "14px",
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                Batal
              </button>
              <button
                onClick={handleSaveEdit}
                style={{
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "8px",
                  background: "#93C5FD",
                  color: "#1e293b",
                  fontSize: "14px",
                  fontWeight: 500,
                  cursor: "pointer",
                  boxShadow: "0 2px 8px rgba(124, 58, 237, 0.3)",
                }}
              >
                Simpan
              </button>
            </div>
          </div>
        </Modal>

        <Modal
          isOpen={showTagsModal}
          onClose={() => setShowTagsModal(false)}
          title={`Kelola Tags: ${currentNote?.title || ""}`}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: 500,
                  marginBottom: "8px",
                  color: "var(--text-muted)",
                }}
              >
                Tags pada catatan ini
              </label>
              {currentTags.length === 0 ? (
                <div
                  style={{
                    fontSize: "13px",
                    color: "var(--text-muted-light)",
                    fontStyle: "italic",
                    marginBottom: "12px",
                  }}
                >
                  Belum ada tag. Tambahkan dari daftar di bawah.
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    gap: "6px",
                    flexWrap: "wrap",
                    marginBottom: "12px",
                  }}
                >
                  {currentTags.map((tag) => (
                    <div
                      key={tag.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        padding: "4px 10px",
                        background: tag.colorTag || "var(--border-light)",
                        borderRadius: "20px",
                      }}
                    >
                      <span style={{ fontSize: "12px", fontWeight: 500, color: "var(--foreground)" }}>
                        {tag.name}
                      </span>
                      <button
                        onClick={() => handleRemoveTagFromNote(tag.id)}
                        style={{
                          padding: "2px 4px",
                          border: "none",
                          borderRadius: "50%",
                          background: "rgba(0,0,0,0.1)",
                          color: "var(--text-muted)",
                          fontSize: "10px",
                          cursor: "pointer",
                          lineHeight: 1,
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: 500,
                  marginBottom: "8px",
                  color: "var(--text-muted)",
                }}
              >
                Tambah tag ke catatan ini
              </label>
              {isLoadingTags ? (
                <div style={{ fontSize: "13px", color: "var(--text-muted-light)" }}>
                  Loading...
                </div>
              ) : allTags.length === 0 ? (
                <div
                  style={{
                    fontSize: "13px",
                    color: "var(--text-muted-light)",
                    fontStyle: "italic",
                  }}
                >
                  Belum ada tag. Buat tag baru di bawah.
                </div>
              ) : (
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {allTags
                    .filter((tag) => !currentTags.some((ct) => ct.id === tag.id))
                    .map((tag) => (
                      <button
                        key={tag.id}
                        onClick={() => handleAddTagToNote(tag.id)}
                        style={{
                          padding: "4px 10px",
                          border: "1px solid var(--border)",
                          borderRadius: "20px",
                          background: "var(--sidebar-bg)",
                          color: "var(--foreground)",
                          fontSize: "12px",
                          cursor: "pointer",
                        }}
                      >
                        + {tag.name}
                      </button>
                    ))}
                  {allTags.length > 0 &&
                    allTags.every((tag) =>
                      currentTags.some((ct) => ct.id === tag.id),
                    ) && (
                      <div style={{ fontSize: "12px", color: "var(--text-muted-light)" }}>
                        Semua tag sudah ditambahkan
                      </div>
                    )}
                </div>
              )}
            </div>

            <div style={{ height: "1px", background: "var(--border)" }} />

            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: 500,
                  marginBottom: "8px",
                  color: "var(--text-muted)",
                }}
              >
                Buat tag baru
              </label>
              <div
                style={{ display: "flex", gap: "8px", alignItems: "flex-end" }}
              >
                <div style={{ flex: 1 }}>
                  <input
                    type="text"
                    value={newTagName}
                    onChange={(e) => setNewTagName(e.target.value)}
                    placeholder="Nama tag..."
                    style={{
                      width: "100%",
                      padding: "8px 10px",
                      border: "1px solid var(--border)",
                      borderRadius: "6px",
                      fontSize: "13px",
                      background: "var(--sidebar-bg)",
                      color: "var(--foreground)",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && newTagName.trim()) {
                        handleCreateTag();
                      }
                    }}
                  />
                </div>
                <select
                  value={newTagColor}
                  onChange={(e) => setNewTagColor(e.target.value)}
                  style={{
                    padding: "8px 10px",
                    border: "1px solid var(--border)",
                    borderRadius: "6px",
                    fontSize: "13px",
                    background: "var(--sidebar-bg)",
                    color: "var(--foreground)",
                    outline: "none",
                    cursor: "pointer",
                  }}
                >
                  {TAG_COLORS.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleCreateTag}
                  disabled={!newTagName.trim()}
                  style={{
                    padding: "8px 14px",
                    border: "none",
                    borderRadius: "6px",
                    background: newTagName.trim() ? "var(--accent)" : "#ccc",
                    color: "#fff",
                    fontSize: "13px",
                    cursor: newTagName.trim() ? "pointer" : "not-allowed",
                  }}
                >
                  Tambah
                </button>
              </div>
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: 500,
                  marginBottom: "8px",
                  color: "var(--text-muted)",
                }}
              >
                Semua Tags ({allTags.length})
              </label>
              {allTags.length === 0 ? (
                <div
                  style={{
                    fontSize: "13px",
                    color: "var(--text-muted-light)",
                    fontStyle: "italic",
                  }}
                >
                  Belum ada tag
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                    maxHeight: "150px",
                    overflowY: "auto",
                  }}
                >
                  {allTags.map((tag) => (
                    <div
                      key={tag.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "8px 10px",
                        background: tag.colorTag || "var(--border-light)",
                        borderRadius: "6px",
                      }}
                    >
                      <span style={{ fontSize: "13px", fontWeight: 500, color: "var(--foreground)" }}>
                        {tag.name}
                      </span>
                      <button
                        onClick={() => handleDeleteTag(tag.id)}
                        style={{
                          padding: "4px 8px",
                          border: "none",
                          borderRadius: "4px",
                          background: "rgba(0,0,0,0.1)",
                          color: "var(--text-muted)",
                          fontSize: "12px",
                          cursor: "pointer",
                        }}
                      >
                        Hapus
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button
                onClick={() => setShowTagsModal(false)}
                style={{
                  padding: "8px 16px",
                  border: "1px solid var(--border)",
                  borderRadius: "6px",
                  background: "var(--sidebar-bg)",
                  color: "var(--text-muted)",
                  fontSize: "13px",
                  cursor: "pointer",
                }}
              >
                Tutup
              </button>
            </div>
          </div>
        </Modal>

        <DeleteModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDeleteNote}
          noteTitle={currentNote?.title}
        />
        <VersionsModal
          isOpen={showVersionsModal}
          onClose={() => {
            setShowVersionsModal(false);
            setSelectedVersionContent(null);
          }}
          versions={noteVersions}
          isLoading={isLoadingVersions}
          selectedContent={selectedVersionContent}
          onSelectVersion={handleRestoreVersion}
          onRestore={handleConfirmRestore}
          onBack={() => setSelectedVersionContent(null)}
        />
      </div>
    </ToastProvider>
  );
}
