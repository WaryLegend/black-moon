"use client";

import useCheckoutStepStore from "@/context/CheckoutStepStore";

export default function CheckoutHeader() {
  const stepsLabel = ["Thông tin", "Vận chuyển", "Thanh toán"];
  const { step: currentStep, maxStep } = useCheckoutStepStore();

  return (
    <header className="flex items-center justify-center gap-8 text-sm font-bold md:text-base lg:text-lg">
      {stepsLabel.map((label, i) => (
        <div key={i} className="flex items-center gap-3">
          <div
            className={`text-primary-0 flex h-6 w-6 items-center justify-center rounded-full sm:h-8 sm:w-8 lg:h-10 lg:w-10 ${
              i + 1 <= currentStep ? "bg-primary-800" : "bg-primary-300"
            }`}
          >
            {i + 1}
          </div>
          <span
            className={
              i + 1 <= currentStep ? "text-accent-600" : "text-primary-500"
            }
          >
            {label}
          </span>
          {i < maxStep - 1 && (
            <div
              className={`${
                i + 1 < currentStep ? "bg-primary-800" : "border-primary-300"
              } hidden w-20 border-t-2 md:block`}
            />
          )}
        </div>
      ))}
    </header>
  );
}
