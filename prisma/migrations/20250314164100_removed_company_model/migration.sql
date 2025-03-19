/*
  Warnings:

  - You are about to drop the column `companyId` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the `Company` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `company` to the `Application` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_companyId_fkey";

-- AlterTable
ALTER TABLE "Application" DROP COLUMN "companyId",
ADD COLUMN     "company" TEXT NOT NULL;

-- DropTable
DROP TABLE "Company";
