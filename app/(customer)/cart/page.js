import CartList from "@/app/_components/CCartPage/CartList";
import CartMenu from "@/app/_components/CCartPage/CartMenu";

export const metadata = {
  title: "Cart",
};

const cartItems = [
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
  return (
    <div className="flex flex-col gap-1 md:gap-4">
      <h1 className="text-3xl font-semibold">Giỏ Hàng</h1>
      <section className="grid grid-cols-[2fr_1fr] gap-5">
        {/* LEFT: List products in cart*/}
        <CartList cartItems={cartItems} />

        {/* RIGHT: Total price, vouchers, order now,...*/}
        <CartMenu />
      </section>
    </div>
  );
}
