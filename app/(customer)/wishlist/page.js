import WishList from "@/app/_components/CWishlistPage/WishList";
import NoWishlistFound from "@/app/_components/CWishlistPage/NoWishlistFound";

export const metadata = {
  title: "Wishlist",
};

const wishItems = [
  {
    id: 1,
    name: "Quần Ni Dry Túi Hộp",
    color: "03 GRAY",
    size: "Trẻ em 4-5Y(110)",
    price: 391000,
    quantity: 1,
    image: "/t-shirt.jpg",
    isNew: false,
    sale: 5,
  },
  {
    id: 2,
    name: "Túi Bán Nguyệt Mini Đeo Chéo",
    color: "09 BLACK",
    size: "Trẻ em No Control",
    price: 293000,
    quantity: 1,
    image: "/t-shirt.jpg",
    isNew: false,
    sale: null,
  },
  {
    id: 3,
    name: "Túi Bán Nguyệt Mini Đeo Chéo",
    color: "09 BLACK",
    size: "Trẻ em No Control",
    price: 293000,
    quantity: 1,
    image: "/t-shirt.jpg",
    isNew: true,
    sale: null,
  },
  {
    id: 4,
    name: "Túi Bán Nguyệt Mini Đeo Chéo",
    color: "09 BLACK",
    size: "Trẻ em No Control",
    price: 293000,
    quantity: 1,
    image: "/t-shirt.jpg",
    isNew: false,
    sale: 10,
  },
];

export default function Page() {
  const wishLength = wishItems.length;

  return (
    <div className="flex flex-col gap-1 md:gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Yêu thích</h1>
        {wishLength > 0 && (
          <h1 className="text-xl font-semibold">{wishLength} sản phẩm</h1>
        )}
      </div>
      <section className="border-primary-400 bg-primary-0 rounded-md border-1 px-5 py-2">
        {wishLength ? <WishList items={wishItems} /> : <NoWishlistFound />}
      </section>
    </div>
  );
}
