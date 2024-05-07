/*
  Warnings:

  - Added the required column `texts` to the `comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "comment" ADD COLUMN     "texts" TEXT NOT NULL;
