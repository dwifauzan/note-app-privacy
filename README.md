## Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js (App Router, TypeScript) |
| Desktop | Tauri v2 (Rust) |
| Database | SQLite via `tauri-plugin-sql` |
| ORM | Drizzle ORM |

---

## Feature

- **Markdown editor** — write and preview notes in format `.md`
- **Bi-directional links** — link note with `[[name note]]`, backlinks automatic display
- **Tag system** — give color & categorize notes with tags
- **Daily notes** — automatic notes page per day *(coming soon)*
- **Graph view** — visualization of connections between notes *(coming soon)*
- **Canvas** — arrange notes visually on a whiteboard *(coming soon)*

---

## How Its Works

Each note is stored as a `.md` file on disk—it can be opened in any application. SQLite only stores metadata such as tags, links between notes, and search information. Deleting the application will not delete your notes.

```
File .md  →  fill note (portable, can use anywhere)
SQLite    →  metadata, tags, links, search index
```

---

### Prerequisites

- Node.js 18+
- Rust & Cargo
- Tauri CLI v2

### Setup

```bash
# clone repo
git clone https://github.com/username/pkm-app.git
cd pkm-app

# install dependencies
npm install

# setup database
npm run db:generate
npm run db:migrate

# run with mode development for now
npm run tauri dev
```

---

## Structure Folder

```
src/
├── app/                 
├── components/
│   ├── layout/             
│   ├── notes/              
│   └── ui/                 
├── hooks/                 
├── lib/                  
└── db/
    ├── schema.ts         
    ├── driver.ts        
    ├── migrate.ts         
    └── migrations/       
src-tauri/                 
```

---

## Scripts

```bash
npm run dev           # running Next.js dev server
npm run tauri dev     # running Tauri + Next.js same time
npm run tauri build   # build the aplication 
npm run db:generate   # generate file migration from schema database
npm run db:migrate    # running migration to database
npm run db:studio     # open Drizzle Studio for look inside database
```
