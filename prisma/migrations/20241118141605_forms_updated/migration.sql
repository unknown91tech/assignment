/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Form` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Form` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Form` table. All the data in the column will be lost.
  - You are about to drop the `File` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `description` on table `Form` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_formId_fkey";

-- DropForeignKey
ALTER TABLE "Form" DROP CONSTRAINT "Form_userId_fkey";

-- AlterTable
ALTER TABLE "Form" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ALTER COLUMN "description" SET NOT NULL;

-- DropTable
DROP TABLE "File";
