-- DropForeignKey
ALTER TABLE "History" DROP CONSTRAINT "History_applicationId_fkey";

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE CASCADE ON UPDATE CASCADE;
