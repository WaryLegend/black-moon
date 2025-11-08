import CartList from "@/app/_components/CCartPage/CartList";
import CartMenu from "@/app/_components/CCartPage/CartMenu";

export const metadata = {
  title: "Cart",
};

export default function Page() {
  return (
    <div className="flex flex-col gap-1 md:gap-4">
      <h1 className="text-3xl font-semibold">Giỏ Hàng</h1>
      <section className="grid grid-cols-[2fr_1fr] gap-5">
        {/* LEFT: List products in cart*/}
        <CartList />

        {/* RIGHT: Total price, vouchers, order now,...*/}
        <CartMenu />
      </section>
    </div>
  );
}
