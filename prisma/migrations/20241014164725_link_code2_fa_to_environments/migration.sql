-- CreateTable
CREATE TABLE "Code2Fa" (
    "SecretCode" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "EnvironmentId" TEXT NOT NULL,
    CONSTRAINT "Code2Fa_EnvironmentId_fkey" FOREIGN KEY ("EnvironmentId") REFERENCES "Environment" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
