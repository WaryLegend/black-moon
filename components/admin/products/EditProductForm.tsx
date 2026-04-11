"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import Form from "@/components/forms/admin/Form";
import FormRow from "@/components/forms/admin/FormRow";
import ImagesInput, {
  createExistingDragAndDropImgDraft,
  type DragAndDropImgDraft,
  revokeDragAndDropImgUrl,
} from "@/components/forms/admin/ImagesInput.tsx";
import Input from "@/components/forms/admin/Input";
import RichTextEditor from "@/components/forms/admin/RichTextEditor";
import Button from "@/components/ui/Button";
import type { ProductSummary } from "@/types/products";
import { useUpdateProduct } from "./useUpdateProduct";
import { useFormDirtyStyle } from "@/components/forms/admin/useFormDirtyStyle";

type EditProductFormProps = {
  productToEdit: ProductSummary;
  onCloseModal?: () => void;
};

type ProductEditValues = {
  name: string;
  slug: string;
  baseSku: string;
  categoryName: string;
  description: string;
};

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

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

const mapToDefaultValues = (product: ProductSummary): ProductEditValues => ({
  name: product.name,
  slug: product.slug ?? "",
  baseSku: product.baseSku,
  categoryName: product.category?.name ?? "",
  description: product.description ?? "",
});

const mapExistingImages = (product: ProductSummary) =>
  (product.images ?? []).map((image) =>
    createExistingDragAndDropImgDraft(image.id, image.imageUrl),
  );

export default function EditProductForm({
  productToEdit,
  onCloseModal,
}: EditProductFormProps) {
  const [images, setImages] = useState<DragAndDropImgDraft[]>(
    mapExistingImages(productToEdit),
  );
  const imagesRef = useRef<DragAndDropImgDraft[]>(images);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty, dirtyFields },
  } = useForm<ProductEditValues>({
    defaultValues: mapToDefaultValues(productToEdit),
  });

  const { mutate: updateProduct, isPending } = useUpdateProduct();

  useEffect(() => {
    imagesRef.current = images;
  }, [images]);

  useEffect(() => {
    return () => {
      imagesRef.current.forEach(revokeDragAndDropImgUrl);
    };
  }, []);

  const hasImageChanges = useMemo(() => {
    const initialKeys = mapExistingImages(productToEdit).map(
      (image) => image.localId,
    );
    const currentKeys = images.map((image) => image.localId);
    return initialKeys.join(",") !== currentKeys.join(",");
  }, [images, productToEdit]);

  const onSubmit = (values: ProductEditValues) => {
    const imageIdsInOrder = images
      .filter((image) => image.kind === "existing" && image.imageId)
      .map((image) => Number(image.imageId));

    const newImagesInOrder = images
      .map((image, index) => ({ image, index }))
      .filter(({ image }) => image.kind === "new" && image.file);

    const hasNewImages = newImagesInOrder.length > 0;
    const hasExistingOrder = imageIdsInOrder.length > 0;

    const payload = {
      name: values.name.trim(),
      slug: normalizeString(values.slug),
      description: normalizeRichText(values.description),
      ...(hasExistingOrder ? { imageIdsInOrder } : {}),
      ...(hasNewImages
        ? {
            newImageOrders: newImagesInOrder.map(({ index }) => index + 1),
          }
        : {}),
    };

    updateProduct(
      {
        productId: productToEdit.id,
        payload,
        imageFiles: newImagesInOrder.map(({ image }) => image.file as File),
      },
      {
        onSuccess: () => {
          onCloseModal?.();
        },
      },
    );
  };

  const handleCancel = () => {
    images.forEach(revokeDragAndDropImgUrl);
    const nextImages = mapExistingImages(productToEdit);
    setImages(nextImages);
    imagesRef.current = nextImages;
    reset(mapToDefaultValues(productToEdit));
    onCloseModal?.();
  };

  const { getDirtyClass } = useFormDirtyStyle<ProductEditValues>(dirtyFields);

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type="modal"
      className="flex flex-col gap-4"
    >
      <div className="space-y-1">
        <h2 className="text-xl font-semibold">Thông tin sản phẩm</h2>
        <p className="text-primary-500 text-sm">
          Xem hoặc sửa thông tin sản phẩm.
        </p>
      </div>

      <FormRow
        label="Tên sản phẩm*"
        id="edit-product-name"
        error={errors.name?.message}
      >
        <Input
          id="edit-product-name"
          disabled={isPending}
          className={getDirtyClass("name")}
          {...register("name", {
            required: "Tên sản phẩm là bắt buộc",
            maxLength: { value: 255, message: "Tên sản phẩm quá dài" },
          })}
        />
      </FormRow>

      <FormRow
        label="Slug"
        id="edit-product-slug"
        error={errors.slug?.message}
        helper="kebab-case, có thể để trống để tự tạo"
      >
        <Input
          id="edit-product-slug"
          disabled={isPending}
          className={getDirtyClass("slug")}
          {...register("slug", {
            maxLength: { value: 255, message: "Slug quá dài" },
            pattern: {
              value: slugPattern,
              message: "Slug phải ở dạng kebab-case",
            },
          })}
        />
      </FormRow>

      <FormRow label="Mã SKU cơ bản*" id="edit-product-base-sku">
        <Input id="edit-product-base-sku" disabled {...register("baseSku")} />
      </FormRow>

      <FormRow label="Danh mục*" id="edit-product-category">
        <Input
          id="edit-product-category"
          disabled
          {...register("categoryName")}
        />
      </FormRow>

      <FormRow label="Mô tả" error={errors.description?.message}>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <RichTextEditor
              value={field.value || ""}
              onChange={field.onChange}
              disabled={isPending}
              className={getDirtyClass("description")}
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

      <FormRow className="flex justify-end gap-2">
        <Button
          type="button"
          variant="secondary"
          onClick={handleCancel}
          disabled={isPending}
        >
          Hủy
        </Button>
        <Button
          type="submit"
          disabled={isPending || (!isDirty && !hasImageChanges)}
        >
          Lưu thay đổi
        </Button>
      </FormRow>
    </Form>
  );
}
