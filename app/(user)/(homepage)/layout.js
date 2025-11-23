import Header from "@/app/_components/Header";
import Navigation from "@/app/_components/Navigation";
import LogoLink from "@/app/_components/LogoLink";
import User from "@/app/_components/User";
import Cart from "@/app/_components/CartIcon";
import Wishlist from "@/app/_components/WishlistIcon";

export const metadata = {
  title: "Welcome | Black & Moon",
  description:
    "Black & Moon is a modern fashion brand offering stylish, high-quality clothing. Discover the latest collections of shirts, dresses, pants, and accessories for men, women and kids.",
};

export default function HomeLayout({ children }) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header>
        <LogoLink />
        <Navigation />
        <div
          role="toolbar"
          aria-label="User actions"
          className="order-2 flex items-center gap-2.5 sm:gap-4 md:order-3"
        >
          <Wishlist />
          <Cart />
          <User />
        </div>
      </Header>

      {children}
    </div>
  );
}
