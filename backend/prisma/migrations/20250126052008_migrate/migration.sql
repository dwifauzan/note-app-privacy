-- CreateTable
CREATE TABLE "databaseNote" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "judul" TEXT NOT NULL,
    "conteks" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'belum selesai',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
