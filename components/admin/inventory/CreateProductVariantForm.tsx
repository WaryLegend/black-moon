"use client";

import { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import Form from "@/components/forms/admin/Form";
import FormRow from "@/components/forms/admin/FormRow";
import Input from "@/components/forms/admin/Input";
import CustomSelectAsync from "@/components/filters/CustomSelectAsync";
import Button from "@/components/ui/Button";
import type {
  CreateVariantMatrixItem,
  ProductSummary,
  ProductVariantSummary,
} from "@/types/products";
import { useProduct } from "../products/useProduct";

import VariantMatrixBuilder, {
  toVariantCombinationKey,
} from "./VariantMatrixBuilder";
import { useCreateProductVariants } from "./useCreateProductVariants";
import { loadProductIdOptions } from "./useProductOptions";
import Spinner from "@/components/ui/Spinner";

type FormValues = {
  productId: number | null;
  basePrice: number;
};

type CreateProductVariantFormProps = {
  onCloseModal?: () => void;
};

export default function CreateProductVariantForm({
  onCloseModal,
}: CreateProductVariantFormProps) {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      productId: null,
      basePrice: 0,
    },
  });

  const selectedProductId = watch("productId");
  const basePrice = watch("basePrice") || 0;

  const [matrixVariants, setMatrixVariants] = useState<
    CreateVariantMatrixItem[]
  >([]);

  const { product: selectedProduct, isFetching: isProductLoading } =
    useProduct(selectedProductId);

  const { mutate: createVariants, isPending } = useCreateProductVariants();

  const disabledKeys = useMemo(
    () =>
      ((selectedProduct as ProductSummary | undefined)?.variants ?? [])
        .filter(
          (variant: ProductVariantSummary) =>
            Boolean(variant.color) && Boolean(variant.size),
        )
        .map((variant: ProductVariantSummary) =>
          toVariantCombinationKey(String(variant.color), String(variant.size)),
        ),
    [selectedProduct],
  );

  const onSubmit = () => {
    if (!selectedProduct || !matrixVariants.length) return;

    createVariants(
      {
        productId: selectedProduct.id,
        variants: matrixVariants,
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
        <h2 className="text-xl font-semibold">Thêm biến thể mới</h2>
        <p className="text-primary-500 text-sm">
          Chọn sản phẩm, sau đó chọn các cặp màu/kích thước cần tạo.
        </p>
      </div>

      <FormRow
        label={
          <div id="select-product" className="cursor-default">
            Sản phẩm*
          </div>
        }
        error={errors.productId?.message}
      >
        <Controller
          name="productId"
          control={control}
          rules={{ required: "Sản phẩm là bắt buộc" }}
          render={({ field }) => (
            <CustomSelectAsync
              inputId="productId"
              instanceId="productId"
              aria-labelledby="select-product"
              minWidth={320}
              placeholder="Chọn sản phẩm"
              defaultOptions
              cacheOptions
              loadOptions={loadProductIdOptions}
              value={field.value}
              onChange={(event) => {
                const nextValue = event.target.value;
                field.onChange(
                  nextValue === null || nextValue === ""
                    ? null
                    : Number(nextValue),
                );
              }}
              isDisabled={isPending}
            />
          )}
        />
      </FormRow>

      {selectedProductId ? (
        <>
          <FormRow
            label="Giá mặc định"
            id="variant-base-price"
            error={errors.basePrice?.message}
          >
            <Input
              id="variant-base-price"
              type="number"
              step="any"
              min={0}
              disabled={isPending}
              {...register("basePrice", {
                min: { value: 0, message: "Giá phải lớn hơn hoặc bằng 0" },
                valueAsNumber: true,
              })}
            />
          </FormRow>

          <FormRow
            label={
              <div id="variant-matrix-label" className="cursor-default">
                Chọn màu và kích thước
              </div>
            }
            helper={
              <>
                {isProductLoading && (
                  <Spinner type="mini" color="var(--color-accent-600)" />
                )}
              </>
            }
          >
            <VariantMatrixBuilder
              aria-labelledby="create-variant-matrix"
              basePrice={basePrice}
              disabledKeys={disabledKeys}
              onChange={setMatrixVariants}
            />
          </FormRow>
        </>
      ) : null}

      <FormRow className="sticky bottom-0 flex justify-end gap-2 bg-inherit">
        <Button
          type="button"
          variant="secondary"
          onClick={onCloseModal}
          disabled={isPending}
        >
          Hủy
        </Button>
        <Button
          type="submit"
          disabled={
            isPending ||
            !selectedProduct ||
            isProductLoading ||
            matrixVariants.length === 0
          }
        >
          Add new variant
        </Button>
      </FormRow>
    </Form>
  );
}
