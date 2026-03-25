-- AlterTable
ALTER TABLE `categories` ADD COLUMN `isDeleted` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `target_groups` ADD COLUMN `isDeleted` BOOLEAN NOT NULL DEFAULT false;
