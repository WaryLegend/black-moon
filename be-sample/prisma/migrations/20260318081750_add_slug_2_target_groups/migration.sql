/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `target_groups` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `target_groups` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `target_groups_name_key` ON `target_groups`;

-- AlterTable
ALTER TABLE `target_groups` ADD COLUMN `slug` VARCHAR(100) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `target_groups_slug_key` ON `target_groups`(`slug`);
