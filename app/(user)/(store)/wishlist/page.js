import WishListHeader from "@/app/_components/CWishlistPage/WishListHeader";
import WishList from "@/app/_components/CWishlistPage/WishList";

export const metadata = {
  title: "Wishlist",
};

export default function Page() {
  return (
    <div className="flex flex-col gap-1 md:gap-4">
      <div className="flex items-center justify-between">
        <WishListHeader />
      </div>
      <section className="border-primary-400 bg-primary-0 rounded-md border-1 px-5 py-2">
        <WishList />
      </section>
    </div>
  );
}
