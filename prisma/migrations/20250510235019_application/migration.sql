-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Applied', 'InterviewScheduled', 'Interviewed', 'AssessmentScheduled', 'AssessmentCompleted', 'FollowedUp', 'OnHold', 'Rejected', 'OfferReceived', 'OfferAccepted', 'OfferDeclined', 'Withdrawn', 'Closed', 'Ghosted');

-- CreateTable
CREATE TABLE "Application" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "jobTitle" VARCHAR(255) NOT NULL,
    "status" "Status" NOT NULL,
    "companyName" VARCHAR(255),
    "companyLocation" VARCHAR(255),
    "applicationDate" TIMESTAMP(6),
    "applicationMethod" TEXT NOT NULL DEFAULT 'E-Mail',
    "link" VARCHAR(255),
    "contactPerson" VARCHAR(255),
    "contactEmail" VARCHAR(255),
    "notes" VARCHAR(255),
    "expectedSalary" VARCHAR(255),
    "dateOfLastStatusUpdate" TIMESTAMP(6),

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);
