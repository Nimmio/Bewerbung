/*
  Warnings:

  - Added the required column `from` to the `History` table without a default value. This is not possible if the table is not empty.
  - Added the required column `to` to the `History` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `History` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "HistoryType" AS ENUM ('CREATED', 'CHANGEDSTATE', 'ARCHIVED');

-- AlterTable
ALTER TABLE "History" ADD COLUMN     "from" "State" NOT NULL,
ADD COLUMN     "to" "State" NOT NULL,
ADD COLUMN     "type" "HistoryType" NOT NULL;
