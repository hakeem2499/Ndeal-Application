/*
  Warnings:

  - You are about to drop the column `CompanyEmail` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `CompanyHeadquaters` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `CompanySize` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `CompanyWebsite` on the `Company` table. All the data in the column will be lost.
  - Added the required column `companyHeadquaters` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companySize` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyWebsite` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Company" DROP COLUMN "CompanyEmail",
DROP COLUMN "CompanyHeadquaters",
DROP COLUMN "CompanySize",
DROP COLUMN "CompanyWebsite",
ADD COLUMN     "companyHeadquaters" TEXT NOT NULL,
ADD COLUMN     "companySize" "CompanyEmployeeRange" NOT NULL,
ADD COLUMN     "companyWebsite" TEXT NOT NULL;
