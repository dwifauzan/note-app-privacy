export type Note = {
  id: number;
  title: string;
  folder: string;
  updated: string;
  pinned: boolean;
  tags: string[];
};

export type Backlink = {
  id: number;
  title: string;
  ctx: string;
};

export const NOTES: Note[] = [
  {
    id: 1,
    title: "belajar-rust",
    folder: "learning",
    updated: "Hari ini",
    pinned: true,
    tags: ["rust", "programming"],
  },
  {
    id: 2,
    title: "ownership & borrowing",
    folder: "learning",
    updated: "Kemarin",
    pinned: false,
    tags: ["rust"],
  },
  {
    id: 3,
    title: "project pkm app",
    folder: "projects",
    updated: "2 hari lalu",
    pinned: true,
    tags: ["tauri", "nextjs"],
  },
  {
    id: 4,
    title: "daily — 12 Apr",
    folder: "daily",
    updated: "Hari ini",
    pinned: false,
    tags: [],
  },
  {
    id: 5,
    title: "ide fitur graph view",
    folder: "ideas",
    updated: "3 hari lalu",
    pinned: false,
    tags: ["pkm"],
  },
  {
    id: 6,
    title: "lifetimes in rust",
    folder: "learning",
    updated: "4 hari lalu",
    pinned: false,
    tags: ["rust"],
  },
];

export const NOTE_CONTENTS: Record<number, string> = {
  1: `# belajar-rust

Mulai belajar Rust hari ini. Bahasa ini punya konsep yang unik — terutama soal [[ownership & borrowing]] yang bikin program lebih aman.

Rust memastikan tidak ada *dangling pointer* atau *data race* di compile time, bukan runtime.

## Yang sudah dipelajari
- Instalasi toolchain via rustup
- Hello world pertama
- Konsep dasar [[ownership & borrowing]]
- Kenalan dengan [[lifetimes in rust]]

## Referensi
- The Rust Book (doc.rust-lang.org)
- Rustlings exercises`,

  2: `# ownership & borrowing

Dua konsep paling penting di Rust. Setiap nilai punya tepat satu *owner*.

## Ownership rules
1. Setiap nilai punya satu owner
2. Hanya boleh ada satu owner di satu waktu
3. Ketika owner keluar scope, nilai di-drop

## Borrowing
- \`&T\` — immutable borrow, bisa banyak sekaligus
- \`&mut T\` — mutable borrow, hanya boleh satu

Terhubung erat dengan [[lifetimes in rust]].`,

  3: `# project pkm app

App catatan berbasis desktop menggunakan Next.js + Tauri.

## Stack
- Frontend: Next.js (React)
- Desktop: Tauri (Rust)
- Database: SQLite via tauri-plugin-sql
- ORM: Drizzle ORM

## Fitur yang direncanakan
- Markdown editor dengan preview
- Bi-directional links
- Graph view
- Tag system
- Daily notes`,

  4: `# daily — 12 Apr

Hari ini fokus setup database untuk [[project pkm app]].

## Done
- [x] Setup Drizzle schema
- [x] Konfigurasi tauri-plugin-sql
- [x] Test koneksi database

## Todo
- [ ] Implementasi markdown editor
- [ ] Setup bi-directional links parser`,

  5: `# ide fitur graph view

Visualisasi koneksi antar catatan menggunakan D3.js.

Setiap node = satu catatan. Setiap edge = satu baris di tabel note_link.`,

  6: `# lifetimes in rust

Lifetime adalah cara Rust memastikan referensi selalu valid. Terkait langsung dengan [[ownership & borrowing]].

\`\`\`rust
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() { x } else { y }
}
\`\`\``,
};

export const BACKLINKS_DATA: Record<number, Backlink[]> = {
  1: [],
  2: [
    {
      id: 1,
      title: "belajar-rust",
      ctx: "terutama soal [[ownership & borrowing]]...",
    },
    {
      id: 6,
      title: "lifetimes in rust",
      ctx: "Terkait langsung dengan [[ownership & borrowing]].",
    },
  ],
  3: [
    {
      id: 4,
      title: "daily — 12 Apr",
      ctx: "setup database untuk [[project pkm app]].",
    },
    {
      id: 5,
      title: "ide fitur graph view",
      ctx: "Data sudah tersedia dari [[project pkm app]]...",
    },
  ],
  4: [],
  5: [],
  6: [
    {
      id: 1,
      title: "belajar-rust",
      ctx: "Kenalan dengan [[lifetimes in rust]]",
    },
    {
      id: 2,
      title: "ownership & borrowing",
      ctx: "Terhubung erat dengan [[lifetimes in rust]].",
    },
  ],
};

export const FOLDERS = ["semua", "daily", "learning", "projects", "ideas"];

export const TAG_COLORS: Record<string, string> = {
  rust: "#e8f0e0",
  programming: "#e0eaf8",
  tauri: "#f0e8f8",
  nextjs: "#e0f4f0",
  pkm: "#fdf0e0",
};
