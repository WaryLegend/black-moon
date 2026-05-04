import QuantityInput from "./QuantityInput";
import ColorAndSizeRadio from "./ColorAndSizeOption";
import AddToWishListWrapper from "./AddToWishListWrapper";
import ProductCost from "./ProductCost";
import AddToCart from "./AddToCart";
import { ProductDetailSummary } from "@/types/products";

export default function ProductMenu({
  product,
}: {
  product: ProductDetailSummary;
}) {
  const { name: productName } = product;

  return (
    <aside>
      <div className="bg-primary-0 sticky top-[var(--header-height)] rounded-lg p-5 shadow-md">
        <div className="grid gap-3 md:gap-4 lg:gap-5">
          <header className="flex items-center">
            <h1 className="mr-auto text-xl font-semibold lg:text-2xl">
              {productName}
            </h1>
            <AddToWishListWrapper />
          </header>
          <ColorAndSizeRadio />
          <div className="grid grid-cols-[1fr_auto]">
            <ProductCost />
          </div>
          <QuantityInput />
          <AddToCart />
        </div>
      </div>
    </aside>
  );
}
