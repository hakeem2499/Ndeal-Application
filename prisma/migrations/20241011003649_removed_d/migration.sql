/*
  Warnings:

  - The primary key for the `NewsletterSignup` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `NewsletterSignup` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "NewsletterSignup" DROP CONSTRAINT "NewsletterSignup_pkey",
DROP COLUMN "id";
