/*
  Warnings:

  - Added the required column `QoldaIshlashJarayoni` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `SanatTexnikasi` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "QoldaIshlashJarayoni" TEXT NOT NULL,
ADD COLUMN     "SanatTexnikasi" TEXT NOT NULL;
