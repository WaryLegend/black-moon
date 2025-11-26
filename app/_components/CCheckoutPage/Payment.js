import { useFormContext } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/app/_context/CartStore";
import { formatCurrency } from "@/app/_utils/helpers";
import { RiBankCard2Fill } from "react-icons/ri";
import { FaWallet, FaTruckFast } from "react-icons/fa6";
import Button from "@/app/_components/Button";
import useCheckoutStepStore from "@/app/_context/CheckoutStepStore";

const paymentOptions = [
  {
    value: "cod",
    label: "Thanh toán khi nhận hàng (COD)",
    icon: FaTruckFast,
  },
  {
    value: "bank",
    label: "Chuyển khoản ngân hàng",
    icon: RiBankCard2Fill,
  },
  {
    value: "momo",
    label: "Ví MoMo",
    icon: FaWallet,
    badge: "Hot",
  },
];

export default function Payment() {
  const router = useRouter();
  const { prevStep } = useCheckoutStepStore();
  const total = useCartStore((c) => c.getTotalPrice());

  const { handleSubmit, setValue, watch } = useFormContext();
  const paymentMethod = watch("paymentMethod");

  const onSubmit = (data) => {
    console.log("Đơn hàng hoàn tất:", data);
    // TODO: Gọi API tạo đơn hàng
    // router.push(`/checkout/success?order=BM${Date.now().toString().slice(-6)}`);
  };

  return (
    <div className="bg-primary-0 space-y-6 rounded-lg p-6 shadow-md">
      <h1 className="text-2xl font-bold">Phương thức thanh toán</h1>

      <div className="space-y-3">
        {paymentOptions.map((option) => {
          const Icon = option.icon;
          const isSelected = paymentMethod === option.value;

          return (
            <label
              key={option.value}
              className={`hover:bg-primary-200 bg-primary-100 relative flex cursor-pointer items-center gap-4 rounded-lg border p-5 transition-all duration-200 ${
                isSelected
                  ? "text-accent-600 ring-accent-600 shadow-accent-600/10 border-transparent shadow-lg ring-1 ring-offset-2 ring-offset-transparent"
                  : "border-primary-300"
              } `}
            >
              <input
                type="radio"
                name="paymentMethod"
                checked={isSelected}
                onChange={() => setValue("paymentMethod", option.value)}
                className="h-5 w-5"
                style={{ accentColor: "var(--color-accent-600)" }}
              />

              <Icon
                className={`h-6 w-6 ${isSelected ? "text-accent-600" : ""}`}
              />

              <span className="flex-1 font-medium">{option.label}</span>

              {/* Badge "Hot" nếu có */}
              {option.badge && (
                <span className="absolute -top-2 -right-2 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white">
                  {option.badge}
                </span>
              )}
            </label>
          );
        })}
      </div>

      {/* Tổng tiền trên mobile */}
      <div className="bg-primary-50 block rounded-lg p-5 text-2xl font-bold lg:hidden">
        Tổng thanh toán:{" "}
        <span className="text-accent-600">{formatCurrency(total)}</span>
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
          onClick={handleSubmit(onSubmit)}
          className="flex-1 lg:text-xl"
          disabled={!paymentMethod}
        >
          Hoàn tất đơn hàng
        </Button>
      </div>
    </div>
  );
}
