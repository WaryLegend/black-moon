import Header from "@/app/_components/Header";
import LogoLink from "@/app/_components/LogoLink";
import User from "@/app/_components/User";
import Cart from "@/app/_components/Cart";
import WishList from "@/app/_components/Wishlist";

export const metadata = {
  title: {
    template: "%s | Black & Moon",
    default: "Black & Moon", // default --> page without title
  },
  description:
    "Black & Moon is a modern fashion brand offering stylish, high-quality clothing. Discover the latest collections of shirts, dresses, pants, and accessories for men, women and kids.",
};

export default function RootLayout({ children }) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header>
        <LogoLink />
        <div className="flex items-center gap-2.5 sm:gap-4">
          <WishList />
          <Cart />
          <User />
        </div>
      </Header>

      <main className="h-full w-full">
        <div className="border-primary-400 border-t-1 px-4 py-4 sm:px-10 sm:py-5 md:px-15 lg:px-30">
          {children}
        </div>
      </main>
    </div>
  );
}
