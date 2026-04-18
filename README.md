# PKM App - Personal Knowledge Management

A desktop note-taking application built with Next.js + Tauri.

## Download Latest Version

### Linux
- [.deb (Ubuntu/Debian)](https://github.com/dwifauzan/note-app/releases/latest/download/PKM%20App_0.1.0-beta_amd64.deb)
- [.rpm (Fedora/RHEL)](https://github.com/dwifauzan/note-app/releases/latest/download/PKM%20App-0.1.0-beta-1.x86_64.rpm)
- [.AppImage (Universal)](https://github.com/dwifauzan/note-app/releases/latest/download/PKM%20App_0.1.0-beta_amd64.AppImage)

### Windows
- [.msi Installer](https://github.com/dwifauzan/note-app/releases/latest/download/PKM%20App_0.1.0-beta_x64_en-US.msi)
- [.exe (Portable)](https://github.com/dwifauzan/note-app/releases/latest/download/PKM%20App_0.1.0-beta_x64-setup.exe)

### macOS
- [.dmg Installer](https://github.com/dwifauzan/note-app/releases/latest/download/PKM%20App_0.1.0-beta_aarch64.dmg)
- [.app (Apple Silicon)](https://github.com/dwifauzan/note-app/releases/latest/download/PKM%20App_0.1.0-beta_universal.dmg)

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

# build for all platforms (needs proper setup)
```

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 16 (App Router, TypeScript) |
| Desktop | Tauri v2 (Rust) |
| Database | SQLite via tauri-plugin-sql |
| ORM | Drizzle ORM |
