/*
  Warnings:

  - Added the required column `text2` to the `comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "comment" ADD COLUMN     "text2" TEXT NOT NULL;
