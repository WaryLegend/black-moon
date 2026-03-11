/*
  Warnings:

  - You are about to drop the column `avatar` on the `profiles` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `profiles` DROP COLUMN `avatar`,
    ADD COLUMN `avatar_name` VARCHAR(255) NULL,
    ADD COLUMN `avatar_url` VARCHAR(500) NULL;
