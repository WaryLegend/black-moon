import Header from "@/app/_components/Header";
import Navigation from "@/app/_components/Navigation";
import LogoLink from "@/app/_components/LogoLink";
import User from "@/app/_components/User";
import SideNav from "@/app/_components/SideNav";
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
        <div className="flex items-center gap-2.5 sm:gap-4">
          <Wishlist />
          <Cart />
          <User />
          <SideNav />
        </div>
      </Header>

      {children}
    </div>
  );
}
