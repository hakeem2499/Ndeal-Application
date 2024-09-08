-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('PROFESSIONAL', 'COMPANY', 'ADMIN');

-- CreateEnum
CREATE TYPE "CompanyEmployeeRange" AS ENUM ('SMALL', 'MEDIUM', 'LARGE', 'ENTERPRISE');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT,
    "LastName" TEXT,
    "phoneNumber" TEXT,
    "userType" "UserType" NOT NULL DEFAULT 'PROFESSIONAL',
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "professionalProfileId" INTEGER,
    "companyProfileId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfessionalProfile" (
    "id" SERIAL NOT NULL,
    "jobTitle" TEXT NOT NULL,
    "organizationName" TEXT NOT NULL,
    "queryResponse" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "ProfessionalProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyProfile" (
    "id" SERIAL NOT NULL,
    "companyHeadquaters" TEXT NOT NULL,
    "companySize" "CompanyEmployeeRange",
    "industry" TEXT NOT NULL,
    "companyEmail" TEXT NOT NULL,
    "companyWebsite" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "CompanyProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ProfessionalProfile_userId_key" ON "ProfessionalProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyProfile_userId_key" ON "CompanyProfile"("userId");

-- AddForeignKey
ALTER TABLE "ProfessionalProfile" ADD CONSTRAINT "ProfessionalProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyProfile" ADD CONSTRAINT "CompanyProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
