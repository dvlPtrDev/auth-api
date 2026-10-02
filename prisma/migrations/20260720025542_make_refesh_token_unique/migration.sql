/*
  Warnings:

  - You are about to drop the column `revokes_at` on the `refresh_tokens` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[token_hash]` on the table `refresh_tokens` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "auth"."refresh_tokens" DROP COLUMN "revokes_at",
ADD COLUMN     "revoked_at" TIMESTAMPTZ(6);

-- CreateIndex
CREATE UNIQUE INDEX "refresh_tokens_token_hash_key" ON "auth"."refresh_tokens"("token_hash");
