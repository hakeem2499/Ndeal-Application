/*
  Warnings:

  - Added the required column `employmentStatus` to the `Founder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "UserType" ADD VALUE 'Founder';

-- AlterTable
ALTER TABLE "Founder" ADD COLUMN     "employmentStatus" TEXT NOT NULL;
