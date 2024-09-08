/*
  Warnings:

  - You are about to drop the column `companyHeadquaters` on the `Company` table. All the data in the column will be lost.
  - Added the required column `companyLocation` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Company" DROP COLUMN "companyHeadquaters",
ADD COLUMN     "companyLocation" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "userType" DROP DEFAULT;
