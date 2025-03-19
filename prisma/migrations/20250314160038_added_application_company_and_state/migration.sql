-- CreateEnum
CREATE TYPE "State" AS ENUM ('PLANNED', 'SENT', 'TALK', 'WAITING', 'DECLINED');

-- CreateTable
CREATE TABLE "Application" (
    "id" SERIAL NOT NULL,
    "companyId" INTEGER NOT NULL,
    "position" TEXT NOT NULL,
    "state" "State" NOT NULL,
    "link" TEXT,
    "sendDate" TIMESTAMP(3),
    "lastUpdate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT,
    "street" TEXT,
    "postal" TEXT,
    "contactPerson" TEXT,
    "email" TEXT,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
