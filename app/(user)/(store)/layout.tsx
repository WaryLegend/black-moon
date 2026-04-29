import Header from "@/common/layout/Header";
import LogoLink from "@/common/navigation/LogoLink";
import User from "@/components/user-menu/User";
import Cart from "@/common/navigation/CartIcon";
import WishList from "@/common/navigation/WishlistIcon";
import StickyHeaderWrapper from "@/common/layout/StickyHeaderWrapper";

export const metadata = {
  title: {
    template: "%s | Black & Moon",
    default: "Black & Moon",
  },
  description:
    "Black & Moon is a modern fashion brand offering stylish, high-quality clothing. Discover the latest collections of shirts, dresses, pants, and accessories for men, women and kids.",
};

export default async function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-primary-100 relative flex min-h-screen flex-col">
      <StickyHeaderWrapper>
        <Header>
          <LogoLink />
          <div
            role="toolbar"
            className="flex items-center gap-2"
            aria-label="User actions"
          >
            <WishList />
            <Cart />
            <User />
          </div>
        </Header>
      </StickyHeaderWrapper>

      <main className="h-full w-full">
        <div className="mx-auto max-w-[1750px] px-4 py-4 sm:px-10 sm:py-5 md:px-20 lg:px-30">
          {children}
        </div>
      </main>
      {/* <footer>Footer</footer> */}
    </div>
  );
}
