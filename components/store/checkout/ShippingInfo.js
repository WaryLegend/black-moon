import { useFormContext } from "react-hook-form";
import Button from "@/components/ui/Button";
import useCheckoutStepStore from "@/contexts/CheckoutStepStore";

export default function ShippingInfo() {
  const {
    register,
    formState: { errors },
    trigger,
  } = useFormContext();
  const { nextStep } = useCheckoutStepStore();

  const handleNext = async () => {
    const result = await trigger(["fullName", "phone", "address"]);
    if (result) nextStep();
  };

  return (
    <div className="bg-primary-0 space-y-5 rounded-lg p-6 shadow-md">
      <h1 className="text-xl font-bold lg:text-2xl">Thông tin giao hàng</h1>

      <input
        {...register("email")}
        type="email"
        placeholder="Email"
        className="w-full rounded border p-3"
      />

      <div>
        <input
          {...register("fullName", { required: "Vui lòng nhập họ tên" })}
          placeholder="Họ và tên *"
          className="w-full rounded border p-3"
        />
        {errors.fullName && (
          <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
        )}
      </div>

      <div>
        <input
          {...register("phone", { required: "Vui lòng nhập số điện thoại" })}
          placeholder="Số điện thoại *"
          className="w-full rounded border p-3"
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
        )}
      </div>

      <input
        {...register("address", { required: "Vui lòng nhập địa chỉ" })}
        placeholder="Địa chỉ chi tiết *"
        className="w-full rounded border p-3"
      />

      <textarea
        {...register("note")}
        placeholder="Ghi chú (tùy chọn)"
        rows={3}
        className="w-full rounded border p-3"
      />

      <Button type="button" className="w-full lg:text-xl" onClick={handleNext}>
        Tiếp tục đến vận chuyển
      </Button>
    </div>
  );
}
