import Header from "@/app/_components/Header";
import LogoLink from "@/app/_components/LogoLink";
import User from "@/app/_components/User";
import Cart from "@/app/_components/Cart";
import WishList from "@/app/_components/Wishlist";
import StickyHeaderWrapper from "@/app/_components/StickyHeaderWrapper";
import { ColorsAndSizesProvider } from "@/app/_context/ColorsAndSizesContext";
import { getColors, getSizes } from "@/app/_lib/apiSettings";
import CartProvider from "@/app/_context/CartProvider";

export const metadata = {
  title: {
    template: "%s | Black & Moon",
    default: "Black & Moon",
  },
  description:
    "Black & Moon is a modern fashion brand offering stylish, high-quality clothing. Discover the latest collections of shirts, dresses, pants, and accessories for men, women and kids.",
};

export default async function CustomerLayout({ children }) {
  const [colors, sizes] = await Promise.all([getColors(), getSizes()]);

  return (
    <div className="bg-primary-50 relative flex min-h-screen flex-col">
      <StickyHeaderWrapper>
        <Header>
          <LogoLink />
          <div className="flex items-center gap-2.5 sm:gap-4">
            <WishList />
            <CartProvider>
              <Cart />
            </CartProvider>
            <User />
          </div>
        </Header>
      </StickyHeaderWrapper>

      <main className="h-full w-full">
        <div className="mx-auto max-w-[1750px] px-4 py-4 sm:px-10 sm:py-5 md:px-20 lg:px-30">
          <ColorsAndSizesProvider value={{ colors, sizes }}>
            {children}
          </ColorsAndSizesProvider>
        </div>
      </main>
    </div>
  );
}
