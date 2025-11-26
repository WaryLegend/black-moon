import { useFormContext } from "react-hook-form";
import Button from "@/app/_components/Button";
import useCheckoutStepStore from "@/app/_context/CheckoutStepStore";

const shippingOptions = [
  {
    value: "standard",
    title: "Giao tiêu chuẩn",
    description: "Nhận hàng trong 3-5 ngày",
    price: "25.000₫",
  },
  {
    value: "express",
    title: "Giao nhanh (24h)",
    description: "Nhận hàng trong 1-2 ngày",
    price: "45.000₫",
  },
];

export default function ShippingMethod() {
  const { nextStep, prevStep } = useCheckoutStepStore();
  const { setValue, watch } = useFormContext();

  const shippingMethod = watch("shippingMethod");

  return (
    <div className="bg-primary-0 space-y-6 rounded-lg p-6 shadow-md">
      <h1 className="text-2xl font-bold">Phương thức vận chuyển</h1>

      <div className="space-y-4">
        {shippingOptions.map((option) => {
          const isSelected = shippingMethod === option.value;
          return (
            <label
              key={option.value}
              className={`hover:bg-primary-200 bg-primary-100 flex cursor-pointer items-center justify-between rounded border p-4 transition-colors ${isSelected ? "ring-accent-600 ring-1 ring-offset-2 ring-offset-transparent" : ""} `}
            >
              <div className="flex items-center gap-4">
                <input
                  type="radio"
                  name="shipping"
                  checked={isSelected}
                  onChange={() => setValue("shippingMethod", option.value)}
                  className="h-5 w-5"
                  style={{ accentColor: "var(--color-accent-600)" }}
                />
                <div>
                  <p className="font-medium">{option.title}</p>
                  <p className="text-primary-600 text-sm">
                    {option.description}
                  </p>
                </div>
              </div>
              <span className="font-medium">{option.price}</span>
            </label>
          );
        })}
      </div>

      <div className="flex gap-4 pt-4">
        <Button
          onClick={prevStep}
          variant="secondary"
          className="flex-1 lg:text-xl"
        >
          Quay lại
        </Button>
        <Button
          onClick={nextStep}
          className="flex-1 lg:text-xl"
          disabled={!shippingMethod}
        >
          Tiếp tục thanh toán
        </Button>
      </div>
    </div>
  );
}
