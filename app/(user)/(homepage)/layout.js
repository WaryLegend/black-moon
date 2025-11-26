import StickyHeaderWrapper from "@/app/_components/StickyHeaderWrapper";
import Header from "@/app/_components/Header";
import Navigation from "@/app/_components/Navigation";
import LogoLink from "@/app/_components/LogoLink";
import User from "@/app/_components/User";
import Cart from "@/app/_components/CartIcon";
import Wishlist from "@/app/_components/WishlistIcon";
import ThemeToggleBtn from "@/app/_components/ThemeToggleBtn";

export const metadata = {
  title: "Welcome | Black & Moon",
  description:
    "Black & Moon is a modern fashion brand offering stylish, high-quality clothing. Discover the latest collections of shirts, dresses, pants, and accessories for men, women and kids.",
};

export default function HomeLayout({ children }) {
  return (
    <div className="bg-primary-100 relative flex min-h-screen flex-col">
      <StickyHeaderWrapper className="!bg-primary-0/15">
        <Header>
          <LogoLink />
          <Navigation />
          <div
            role="toolbar"
            aria-label="User actions"
            className="order-2 flex items-center gap-2 md:order-3 md:gap-3 lg:gap-4"
          >
            <ThemeToggleBtn />
            <Wishlist />
            <Cart />
            <User />
          </div>
        </Header>
      </StickyHeaderWrapper>

      {children}
    </div>
  );
}
