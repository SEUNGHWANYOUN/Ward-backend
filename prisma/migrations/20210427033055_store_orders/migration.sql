-- AddForeignKey
ALTER TABLE "Order" ADD FOREIGN KEY ("stroeId") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;
