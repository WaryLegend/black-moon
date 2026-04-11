"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import { Controller, useForm } from "react-hook-form";

import Form from "@/components/forms/admin/Form";
import FormRow from "@/components/forms/admin/FormRow";
import ImagesInput, {
  type DragAndDropImgDraft,
  revokeDragAndDropImgUrl,
} from "@/components/forms/admin/ImagesInput.tsx";
import Input from "@/components/forms/admin/Input";
import RichTextEditor from "@/components/forms/admin/RichTextEditor";
import CustomSelectAsync from "@/components/filters/CustomSelectAsync";
import Button from "@/components/ui/Button";
import type { CreateVariantMatrixItem } from "@/types/products";

import { loadCategoryIdOptions } from "./useCategoryOptions";
import { useCreateProduct } from "./useCreateProduct";
import VariantMatrixBuilder from "../inventory/VariantMatrixBuilder";

type CreateProductFormProps = {
  onCloseModal?: () => void;
};

type ProductFormValues = {
  name: string;
  slug: string;
  baseSku: string;
  categoryId: number | null;
  description: string;
};

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const getEmptyValues = (): ProductFormValues => ({
  name: "",
  slug: "",
  baseSku: "",
  categoryId: null,
  description: "",
});

const normalizeString = (value?: string | null) => {
  const normalized = value?.trim();
  return normalized && normalized.length ? normalized : undefined;
};

const normalizeRichText = (value?: string | null) => {
  if (!value) return undefined;

  const normalized = value.trim();
  if (!normalized) return undefined;

  const plainText = normalized
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .trim();

  return plainText ? normalized : undefined;
};

function CreateProductForm({ onCloseModal }: CreateProductFormProps) {
  const [images, setImages] = useState<DragAndDropImgDraft[]>([]);
  const [enableVariants, setEnableVariants] = useState(false);
  const [basePrice, setBasePrice] = useState(0);
  const [matrixVariants, setMatrixVariants] = useState<
    CreateVariantMatrixItem[]
  >([]);
  const imagesRef = useRef<DragAndDropImgDraft[]>([]);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormValues>({
    defaultValues: getEmptyValues(),
  });

  const { mutate: createProduct, isPending } = useCreateProduct();

  useEffect(() => {
    imagesRef.current = images;
  }, [images]);

  useEffect(() => {
    return () => {
      imagesRef.current.forEach(revokeDragAndDropImgUrl);
    };
  }, []);

  const imageFiles = useMemo(
    () =>
      images
        .filter((item) => item.kind === "new" && item.file)
        .map((item) => item.file as File),
    [images],
  );

  const resetFormState = () => {
    images.forEach(revokeDragAndDropImgUrl);
    setImages([]);
    setEnableVariants(false);
    setBasePrice(0);
    setMatrixVariants([]);
    reset(getEmptyValues());
  };

  const onSubmit = (values: ProductFormValues) => {
    if (!values.categoryId) return;

    createProduct(
      {
        payload: {
          name: values.name.trim(),
          slug: normalizeString(values.slug),
          baseSku: values.baseSku.trim(),
          categoryId: values.categoryId,
          description: normalizeRichText(values.description),
          variantMatrix:
            enableVariants && matrixVariants.length
              ? {
                  basePrice,
                  pairs: Array.from(
                    new Map(
                      matrixVariants.map((item) => {
                        const color = item.color.toUpperCase();
                        const size = item.size.toUpperCase();
                        return [`${color}:${size}`, { color, size }];
                      }),
                    ).values(),
                  ),
                }
              : undefined,
        },
        imageFiles,
      },
      {
        onSuccess: () => {
          resetFormState();
          onCloseModal?.();
        },
      },
    );
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
      className="flex flex-col gap-4"
    >
      <div className="space-y-1">
        <h2 className="text-xl font-semibold">Thêm sản phẩm mới</h2>
        <p className="text-primary-500 text-sm">
          Tạo sản phẩm mới cho catalog.
        </p>
      </div>

      <FormRow
        label="Tên sản phẩm*"
        id="product-name"
        error={errors.name?.message}
      >
        <Input
          id="product-name"
          disabled={isPending}
          {...register("name", {
            required: "Tên sản phẩm là bắt buộc",
            maxLength: { value: 255, message: "Tên sản phẩm quá dài" },
          })}
        />
      </FormRow>

      <FormRow
        label="Slug"
        id="product-slug"
        error={errors.slug?.message}
        helper="kebab-case, có thể để trống để tự tạo"
      >
        <Input
          id="product-slug"
          disabled={isPending}
          placeholder="VD: ten-san-pham"
          {...register("slug", {
            maxLength: { value: 255, message: "Slug quá dài" },
            pattern: {
              value: slugPattern,
              message: "Slug phải ở dạng kebab-case",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Mã SKU cơ bản*"
        id="product-base-sku"
        error={errors.baseSku?.message}
        helper={
          <>
            Kết hợp với màu và kích thước để tạo sku biến thể hoàn chỉnh.
            <br />
            <span className="font-bold">{`[sku cơ bản]-[màu]-[kích thước]`}</span>
          </>
        }
      >
        <Input
          id="product-base-sku"
          disabled={isPending}
          {...register("baseSku", {
            required: "Mã SKU cơ bản là bắt buộc",
            maxLength: { value: 120, message: "Mã SKU cơ bản quá dài" },
          })}
          placeholder=""
        />
      </FormRow>

      <FormRow label="Danh mục*" error={errors.categoryId?.message}>
        <Controller
          name="categoryId"
          control={control}
          rules={{ required: "Danh mục là bắt buộc" }}
          render={({ field }) => (
            <CustomSelectAsync
              filterField="categoryId"
              minWidth={200}
              placeholder="Chọn danh mục"
              defaultOptions
              cacheOptions
              loadOptions={loadCategoryIdOptions}
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

      <FormRow
        label="Mô tả sản phẩm"
        id="product-description"
        error={errors.description?.message}
      >
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <RichTextEditor
              value={field.value || ""}
              onChange={field.onChange}
              disabled={isPending}
            />
          )}
        />
      </FormRow>

      <FormRow
        label="Hình ảnh"
        helper={
          <>
            PNG/JPG, tối đa 5MB mỗi ảnh
            <br />
            Tải được nhiều ảnh đại diện cho sản phẩm.
            <br />
            <strong>Ưu tiên</strong> sắp xếp ảnh: Ảnh chính &gt; các góc độ &gt;
            khác
          </>
        }
      >
        <ImagesInput items={images} onChange={setImages} disabled={isPending} />
      </FormRow>

      <FormRow
        label="Biến thể"
        helper="Tùy chọn: tạo nhiều biến thể ngay cho sản phẩm"
      >
        <div className="space-y-3">
          <Button
            type="button"
            variant="secondary"
            onClick={() => setEnableVariants((prev) => !prev)}
            disabled={isPending}
          >
            {enableVariants ? "Bỏ thêm biến thể" : "Thêm biến thể"}
          </Button>

          {enableVariants && (
            <div className="space-y-3">
              <div>
                <label className="text-primary-700 mb-1 block text-sm font-medium">
                  Giá mặc định
                </label>
                <Input
                  type="number"
                  min={0}
                  value={basePrice}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    setBasePrice(Number(event.target.value || 0))
                  }
                  disabled={isPending}
                />
              </div>

              <VariantMatrixBuilder
                basePrice={basePrice}
                onChange={setMatrixVariants}
              />
            </div>
          )}
        </div>
      </FormRow>

      <FormRow className="flex justify-end gap-2">
        <Button
          type="button"
          variant="secondary"
          onClick={() => {
            resetFormState();
            onCloseModal?.();
          }}
          disabled={isPending}
        >
          Hủy
        </Button>
        <Button type="submit" disabled={isPending}>
          Tạo sản phẩm
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateProductForm;
