"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import Form from "@/components/forms/admin/Form";
import FormRow from "@/components/forms/admin/FormRow";
import ImageInput from "@/components/forms/admin/ImageInput";
import Input from "@/components/forms/admin/Input";
import Button from "@/components/ui/Button";
import { formatCurrency } from "@/utils/currency";
import type { ProductVariantSummary } from "@/types/products";

import { useUpdateProductVariant } from "./useUpdateProductVariant";

type EditProductVariantFormProps = {
  variant: ProductVariantSummary;
  onCloseModal?: () => void;
};

type VariantFormValues = {
  sku: string;
  color: string | null;
  size: string | null;
  price: number;
  quantity: number;
};

export default function EditProductVariantForm({
  variant,
  onCloseModal,
}: EditProductVariantFormProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<VariantFormValues>({
    defaultValues: {
      sku: variant.sku,
      color: variant.color,
      size: variant.size,
      price: variant.price,
      quantity: variant.quantity,
    },
  });

  const { mutate: updateVariant, isPending } = useUpdateProductVariant();

  const onSubmit = (values: VariantFormValues) => {
    updateVariant(
      {
        variantId: variant.id,
        payload: {
          price: Number(values.price),
          quantity: Number(values.quantity),
        },
        imageFile: selectedFile,
      },
      {
        onSuccess: () => {
          onCloseModal?.();
        },
      },
    );
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type="modal"
      className="flex flex-col gap-4"
    >
      <div className="space-y-1">
        <h2 className="text-xl font-semibold">Thông tin biến thể sản phẩm</h2>
        <p className="text-primary-500 text-sm">
          Xem hoặc sửa thông tin biến thể sản phẩm.
        </p>
      </div>

      <FormRow label="Mã SKU*" id="variant-sku">
        <Input id="variant-sku" disabled {...register("sku")} />
      </FormRow>

      <FormRow label="Màu sắc*" id="variant-color">
        <Input id="variant-color" disabled value={variant.color ?? "−"} />
      </FormRow>

      <FormRow label="Kích thước*" id="variant-size">
        <Input id="variant-size" disabled value={variant.size ?? "−"} />
      </FormRow>

      <FormRow
        label="Giá bán"
        id="variant-price"
        error={errors.price?.message}
        helper={<>{formatCurrency(watch("price"))}</>}
      >
        <Input
          id="variant-price"
          type="number"
          step="any"
          min={0}
          disabled={isPending}
          {...register("price", {
            min: { value: 0, message: "Giá bán phải lớn hơn hoặc bằng 0" },
            valueAsNumber: true,
          })}
        />
      </FormRow>

      <FormRow
        label="Số lượng"
        id="variant-quantity"
        error={errors.quantity?.message}
      >
        <Input
          id="variant-quantity"
          type="number"
          min={0}
          disabled={isPending}
          {...register("quantity", {
            min: { value: 0, message: "Số lượng phải lớn hơn hoặc bằng 0" },
            valueAsNumber: true,
          })}
        />
      </FormRow>

      <FormRow label="Hình ảnh" id="variant-img" helper="PNG/JPG, tối đa 5MB">
        <ImageInput
          id="variant-img"
          value={selectedFile || variant.imageUrl}
          onChange={setSelectedFile}
          disabled={isPending}
        />
      </FormRow>

      <FormRow className="flex justify-end gap-2">
        <Button type="button" variant="secondary" onClick={onCloseModal}>
          Hủy
        </Button>
        <Button
          type="submit"
          disabled={isPending || (!isDirty && !selectedFile)}
        >
          Lưu thay đổi
        </Button>
      </FormRow>
    </Form>
  );
}
