/*
  Warnings:

  - Added the required column `emotionsList` to the `CbtForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thoughtsList` to the `CbtForm` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Emotions" DROP CONSTRAINT "Emotions_cbtFormId_fkey";

-- DropForeignKey
ALTER TABLE "Thoughts" DROP CONSTRAINT "Thoughts_cbtFormId_fkey";

-- AlterTable
ALTER TABLE "CbtForm" ADD COLUMN     "emotionsList" JSONB NOT NULL,
ADD COLUMN     "thoughtsList" JSONB NOT NULL;
