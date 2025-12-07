import QuantityInput from "@/app/_components/CProductPage/QuantityInput";
import ProductAvgRates from "./ProductAvgRates";
import ColorAndSizeRadio from "./ColorAndSizeRadio";
import AddToWishListWrapper from "./AddToWishListWrapper";
import ProductCost from "./ProductCost";
import AddToCart from "./AddToCart";

export default function ProductMenu({ product }) {
  const { name: productName, reviews } = product;

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
          {/* colors and sizes variant selection */}
          <ColorAndSizeRadio />
          <section className="grid grid-cols-[1fr_auto]">
            {/* Price section */}
            <ProductCost />
            {/* avg product rates */}
            <div className="ml-auto">
              <ProductAvgRates reviews={reviews} />
            </div>
          </section>
          {/* set quantity section */}
          <QuantityInput />
          {/* Add to cart */}
          <AddToCart />
        </div>
      </div>
    </aside>
  );
}
