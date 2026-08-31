/*
  Warnings:

  - You are about to alter the column `stock` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.

*/
-- CreateTable
CREATE TABLE "Ingredient" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "stock" REAL NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "sellType" TEXT NOT NULL DEFAULT 'unit',
    "price" REAL NOT NULL,
    "stock" REAL NOT NULL,
    "imageUrl" TEXT,
    "alt" TEXT
);
INSERT INTO "new_Product" ("alt", "id", "imageUrl", "name", "price", "stock") SELECT "alt", "id", "imageUrl", "name", "price", "stock" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
