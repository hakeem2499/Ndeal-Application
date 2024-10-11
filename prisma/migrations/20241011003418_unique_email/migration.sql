/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `NewsletterSignup` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "NewsletterSignup_email_key" ON "NewsletterSignup"("email");
