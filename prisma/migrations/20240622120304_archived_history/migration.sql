/*
  Warnings:

  - You are about to drop the column `from` on the `History` table. All the data in the column will be lost.
  - You are about to drop the column `to` on the `History` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "History" RENAME COLUMN "to" TO "stateTo";
ALTER TABLE "History" RENAME COLUMN "from" TO "stateFrom";
ALTER TABLE "History" ADD COLUMN     "archivedFrom" BOOLEAN;
ALTER TABLE "History" ADD COLUMN     "archivedTo" BOOLEAN;
