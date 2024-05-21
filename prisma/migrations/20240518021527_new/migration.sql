-- DropIndex
DROP INDEX `Post_id_key` ON `post`;

-- AlterTable
ALTER TABLE `post` MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT;
