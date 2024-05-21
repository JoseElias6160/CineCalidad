/*
  Warnings:

  - You are about to alter the column `genero` on the `post` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `post` MODIFY `genero` INTEGER NOT NULL;
