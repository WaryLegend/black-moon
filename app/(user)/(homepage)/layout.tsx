import StickyHeaderWrapper from "@/common/layout/StickyHeaderWrapper";
import Header from "@/common/layout/Header";
import Navigation from "@/common/layout/Navigation";
import LogoLink from "@/common/navigation/LogoLink";
import WishlistIcon from "@/components/common/navigation/WishlistIcon";
import CartIcon from "@/components/common/navigation/CartIcon";
import User from "@/components/user-menu/User";
import { cn } from "@/utils/cn";

export const metadata = {
  title: "Welcome | Black & Moon",
  description:
    "Black & Moon is a modern fashion brand offering stylish, high-quality clothing. Discover the latest collections of shirts, dresses, pants, and accessories for men, women and kids.",
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-primary-100 relative flex min-h-screen flex-col">
      <StickyHeaderWrapper className={cn("!bg-primary-0/15")}>
        <Header>
          <LogoLink />
          <Navigation />
          <div
            role="toolbar"
            aria-label="User actions"
            className="order-2 flex items-center gap-2 md:order-3"
          >
            <WishlistIcon />
            <CartIcon />
            <User />
          </div>
        </Header>
      </StickyHeaderWrapper>

      {children}
    </div>
  );
}
