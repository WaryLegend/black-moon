import { cn } from "@/utils/cn";
import StickyHeaderWrapper from "@/common/layout/StickyHeaderWrapper";
import Header from "@/common/layout/Header";
import Navigation from "@/common/layout/Navigation";
import LogoLink from "@/common/navigation/LogoLink";
import WishlistIcon from "@/components/common/navigation/WishlistIcon";
import CartIcon from "@/components/common/navigation/CartIcon";
import User from "@/components/user-menu/User";
import GroupHero from "@/components/home/GroupHero";
import Carousel from "@/components/home/Carousel";
import { getPublicTargetGroups } from "@/services/homepage.api";

export const metadata = {
  title: "Welcome | Black & Moon",
  description:
    "Black & Moon is a modern fashion brand offering stylish, high-quality clothing. Discover the latest collections of shirts, dresses, pants, and accessories for men, women and kids.",
};

export const revalidate = 86400; // 24 hours

export async function generateStaticParams() {
  try {
    const groups = await getPublicTargetGroups();

    return [
      { group: [] },
      ...groups.map((g) => ({
        group: [g.slug],
      })),
    ];
  } catch {
    return [{ group: [] }];
  }
}
export const dynamicParams = false;

export default async function HomeLayout({
  params,
  children,
}: {
  params: Promise<{ group?: string[] }>;
  children: React.ReactNode;
}) {
  const { group: groupSlug } = await params;
  const groups = await getPublicTargetGroups();
  const sliders = groups.map((group) => group.slug);
  const initialIndex = sliders.findIndex((slug) => slug === groupSlug?.[0]);

  return (
    <div className="bg-primary-100 relative flex min-h-screen flex-col">
      {/* header */}
      <StickyHeaderWrapper className={cn("bg-primary-50/15")}>
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
      {/* main content */}
      <main className="absolute top-0 left-0 h-full w-full">
        <div className="relative h-screen w-screen overflow-hidden">
          <Carousel
            sliders={sliders}
            initialIndex={initialIndex > -1 ? initialIndex : 0}
          >
            {groups.map((group) => (
              <div
                key={group.id}
                className="relative h-full min-w-full px-10 py-10 pt-20"
              >
                <GroupHero group={group} />
              </div>
            ))}
          </Carousel>
        </div>
      </main>
      {children}
    </div>
  );
}
