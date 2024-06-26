-- CreateEnum
CREATE TYPE "Languages" AS ENUM ('ENGLISH', 'GERMAN');

-- CreateTable
CREATE TABLE "Settings" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "defaultLimit" INTEGER NOT NULL,
    "language" "Languages" NOT NULL,

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);
