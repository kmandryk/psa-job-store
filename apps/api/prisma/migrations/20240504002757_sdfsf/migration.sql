/*
  Warnings:

  - You are about to drop the column `text1` on the `comment` table. All the data in the column will be lost.
  - Added the required column `text5` to the `comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "comment" DROP COLUMN "text1",
ADD COLUMN     "text5" TEXT NOT NULL;
