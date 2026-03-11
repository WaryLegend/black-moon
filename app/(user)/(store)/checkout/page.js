import CheckoutHeader from "@/components/store/checkout/CheckoutHeader";
import CheckoutForm from "@/components/store/checkout/CheckoutForm";
import OrderSummaryWrapper from "@/components/store/checkout/OrderSummaryWrapper";

export const metadata = {
  title: "Checkout",
};

export default function CheckoutPage() {
  // later will be middleware or something handle if user is log in to be able to use /checkout.
  // useEffect(() => {
  //   if (items.length === 0) {
  //     router.replace("/cart");
  //   }
  // }, [items, router]);

  return (
    <>
      <div className="pb-20 lg:pb-5">
        <div className="mx-auto max-w-7xl px-4">
          <CheckoutHeader />

          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1fr]">
            {/* Left: Form */}
            <CheckoutForm />

            {/* Right: Order Summary */}
            <OrderSummaryWrapper />
          </div>
        </div>
      </div>
    </>
  );
}
