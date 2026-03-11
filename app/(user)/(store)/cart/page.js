import CartList from "@/components/store/cart/CartList";
import CartSummeryWrapper from "@/components/store/cart/CartSummeryWrapper";

export const metadata = {
  title: "Cart",
};

export default function Page() {
  return (
    <div className="flex flex-col gap-1 md:gap-4">
      <h1 className="text-3xl font-semibold">Giỏ Hàng</h1>
      <section className="grid gap-5 lg:grid-cols-[2fr_1fr]">
        {/* LEFT: List products in cart*/}
        <CartList />
        {/* RIGHT: Total price, vouchers, order now,...*/}
        <CartSummeryWrapper />
      </section>
    </div>
  );
}
