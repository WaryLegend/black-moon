import CheckoutHeader from "@/app/_components/CCheckoutPage/CheckoutHeader";
import CheckoutForm from "@/app/_components/CCheckoutPage/CheckoutForm";
import OrderSummaryWrapper from "@/app/_components/CCheckoutPage/OrderSummaryWrapper";

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
