-- DropForeignKey
ALTER TABLE "social_links" DROP CONSTRAINT "social_links_card_id_fkey";

-- AddForeignKey
ALTER TABLE "social_links" ADD CONSTRAINT "social_links_card_id_fkey" FOREIGN KEY ("card_id") REFERENCES "digital_cards"("id") ON DELETE CASCADE ON UPDATE CASCADE;
