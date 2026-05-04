import WishList from "@/components/store/wishlist/WishList";
import type { AppPageProps } from "@/types/page-props";
import type { WishlistPageSearchParams } from "@/types/wishlist";

export const metadata = {
  title: "Wishlist",
};

export default async function Page({
  searchParams,
}: AppPageProps<unknown, WishlistPageSearchParams>) {
  const query = await searchParams;

  return (
    <div className="flex flex-col gap-1 md:gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Danh sách yêu thích của bạn</h1>
      </div>
      <section className="border-primary-400 bg-primary-0 rounded-lg border-1 px-5 py-2">
        <WishList searchParams={query} />
      </section>
    </div>
  );
}
