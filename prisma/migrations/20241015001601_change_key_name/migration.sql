/*
  Warnings:

  - The primary key for the `Code2Fa` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `SecretCode` on the `Code2Fa` table. All the data in the column will be lost.
  - Added the required column `secretCode` to the `Code2Fa` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Code2Fa" (
    "secretCode" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "EnvironmentId" TEXT NOT NULL,
    CONSTRAINT "Code2Fa_EnvironmentId_fkey" FOREIGN KEY ("EnvironmentId") REFERENCES "Environment" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Code2Fa" ("secretCode", "name", "EnvironmentId")
SELECT COALESCE("secretCode", ''), "name", "EnvironmentId" FROM "Code2Fa";
DROP TABLE "Code2Fa";
ALTER TABLE "new_Code2Fa" RENAME TO "Code2Fa";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
