# PKM App - Personal Knowledge Management

A desktop note-taking application built with Next.js + Tauri.

## Download Latest Version

**[Click here to see all available downloads](https://github.com/dwifauzan/note-app/releases/latest)**

Or select your platform:

### Linux
- [Download .deb](https://github.com/dwifauzan/note-app/releases/latest)
- [Download .rpm](https://github.com/dwifauzan/note-app/releases/latest)
- [Download .AppImage](https://github.com/dwifauzan/note-app/releases/latest)

### Windows
- [Download .msi](https://github.com/dwifauzan/note-app/releases/latest)
- [Download .exe](https://github.com/dwifauzan/note-app/releases/latest)

### macOS
- [Download .dmg](https://github.com/dwifauzan/note-app/releases/latest)
- [Download .app.tar.gz](https://github.com/dwifauzan/note-app/releases/latest)

---

## Features

- **Markdown editor** — write and preview notes in `.md` format
- **Pin notes** — pin important notes to the top
- **Tag system** — organize notes with colored tags
- **Bi-directional links** — link notes with `[[note name]]`
- **Created date** — see when each note was created
- **Dark mode** — automatic dark/light theme

---

## How It Works

Each note is stored as a `.md` file on disk—it can be opened in any app. SQLite stores metadata like tags, links, and search info.

```
Note File (.md)  →  Your actual notes (portable)
SQLite DB        →  Tags, links, search index
```

---

## Development

### Prerequisites
- Node.js 18+
- Rust & Cargo
- Tauri CLI v2

### Setup

```bash
# clone repo
git clone https://github.com/dwifauzan/note-app.git
cd note-app

# install dependencies
npm install

# run in development mode
npm run tauri dev
```

### Build

```bash
# build for current platform
npm run tauri build
```

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 16 (App Router, TypeScript) |
| Desktop | Tauri v2 (Rust) |
| Database | SQLite via tauri-plugin-sql |
| ORM | Drizzle ORM |
