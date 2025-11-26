import { ColorsAndSizesProvider } from "@/app/_context/ColorsAndSizesContext";
import { getColors, getSizes } from "@/app/_lib/apiSettings";
import Header from "@/app/_components/Header";
import LogoLink from "@/app/_components/LogoLink";
import User from "@/app/_components/User";
import Cart from "@/app/_components/CartIcon";
import WishList from "@/app/_components/WishlistIcon";
import StickyHeaderWrapper from "@/app/_components/StickyHeaderWrapper";
import ThemeToggleBtn from "@/app/_components/ThemeToggleBtn";

export const metadata = {
  title: {
    template: "%s | Black & Moon",
    default: "Black & Moon",
  },
  description:
    "Black & Moon is a modern fashion brand offering stylish, high-quality clothing. Discover the latest collections of shirts, dresses, pants, and accessories for men, women and kids.",
};

export default async function StoreLayout({ children }) {
  const [colors, sizes] = await Promise.all([getColors(), getSizes()]);

  return (
    <div className="bg-primary-100 relative flex min-h-screen flex-col">
      <StickyHeaderWrapper>
        <Header>
          <LogoLink />
          <div
            role="toolbar"
            className="flex items-center gap-2.5 sm:gap-4"
            aria-label="User actions"
          >
            <ThemeToggleBtn />
            <WishList />
            <Cart />
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
      {/* <footer>Footer</footer> */}
    </div>
  );
}
