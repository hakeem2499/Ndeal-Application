/*
  Warnings:

  - The values [PROFESSIONAL,COMPANY,ADMIN] on the enum `UserType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `LastName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `companyProfileId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `professionalProfileId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `CompanyProfile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProfessionalProfile` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "UserType_new" AS ENUM ('Professional', 'Company', 'Admin');
ALTER TABLE "User" ALTER COLUMN "userType" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "userType" TYPE "UserType_new" USING ("userType"::text::"UserType_new");
ALTER TYPE "UserType" RENAME TO "UserType_old";
ALTER TYPE "UserType_new" RENAME TO "UserType";
DROP TYPE "UserType_old";
ALTER TABLE "User" ALTER COLUMN "userType" SET DEFAULT 'Professional';
COMMIT;

-- DropForeignKey
ALTER TABLE "CompanyProfile" DROP CONSTRAINT "CompanyProfile_userId_fkey";

-- DropForeignKey
ALTER TABLE "ProfessionalProfile" DROP CONSTRAINT "ProfessionalProfile_userId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "LastName",
DROP COLUMN "companyProfileId",
DROP COLUMN "professionalProfileId",
ADD COLUMN     "lastName" TEXT,
ALTER COLUMN "userType" SET DEFAULT 'Professional';

-- DropTable
DROP TABLE "CompanyProfile";

-- DropTable
DROP TABLE "ProfessionalProfile";

-- CreateTable
CREATE TABLE "Professional" (
    "id" SERIAL NOT NULL,
    "jobTitle" TEXT NOT NULL,
    "organizationName" TEXT NOT NULL,
    "queryResponse" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Professional_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "CompanyHeadquaters" TEXT NOT NULL,
    "CompanySize" "CompanyEmployeeRange",
    "industry" TEXT NOT NULL,
    "CompanyEmail" TEXT NOT NULL,
    "CompanyWebsite" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Professional_userId_key" ON "Professional"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Company_userId_key" ON "Company"("userId");

-- AddForeignKey
ALTER TABLE "Professional" ADD CONSTRAINT "Professional_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
