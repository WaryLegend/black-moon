"use client";

import { useForm, FormProvider } from "react-hook-form";
import ShippingInfo from "./ShippingInfo";
import ShippingMethod from "./ShippingMethod";
import Payment from "./Payment";
import useCheckoutStepStore from "@/contexts/CheckoutStepStore";

export default function CheckoutForm() {
  const { step } = useCheckoutStepStore();

  const methods = useForm({
    defaultValues: {
      email: "",
      fullName: "",
      phone: "",
      address: "",
      note: "",
      shippingMethod: "standard",
      paymentMethod: "cod",
    },
    mode: "onBlur", // khuyến nghị cho checkout
  });

  return (
    <FormProvider {...methods}>
      <form>
        {step === 1 && <ShippingInfo />}
        {step === 2 && <ShippingMethod />}
        {step === 3 && <Payment />}
      </form>
    </FormProvider>
  );
}
