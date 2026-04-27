"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";

import Form from "@/components/forms/admin/Form";
import FormRow from "@/components/forms/admin/FormRow";
import ImagesInput, {
  createExistingDragAndDropImgDraft,
  type DragAndDropImgDraft,
  revokeDragAndDropImgUrl,
} from "@/components/forms/admin/ImagesInput.tsx";
import Input from "@/components/forms/admin/Input";
import Button from "@/components/ui/Button";
import type { ProductSummary } from "@/types/products";
import { useUpdateProduct } from "./useUpdateProduct";
import { useFormDirtyStyle } from "@/components/forms/admin/useFormDirtyStyle";
import ProductDescriptionsInput, {
  normalizeDescriptionDrafts,
  type ProductDescriptionDraft,
} from "./ProductDescriptionsInput";
import { useProduct } from "./useProduct";
import Spinner from "@/components/ui/Spinner";
import { useDescriptionEditFlow } from "./useDescriptionEditFlow";

type EditProductFormProps = {
  productId: number;
  productSummary?: ProductSummary;
  onCloseModal?: () => void;
};

type ProductEditValues = {
  name: string;
  slug: string;
  baseSku: string;
  categoryName: string;
  descriptions: ProductDescriptionDraft[];
};

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const normalizeString = (value?: string | null) => {
  const normalized = value?.trim();
  return normalized && normalized.length ? normalized : undefined;
};

const mapToDefaultValues = (product: ProductSummary): ProductEditValues => ({
  name: product.name,
  slug: product.slug ?? "",
  baseSku: product.baseSku,
  categoryName: product.category?.name ?? "",
  descriptions: normalizeDescriptionDrafts(product.descriptions ?? []),
});

const mapExistingImages = (product: ProductSummary) =>
  (product.images ?? [])
    .filter((image) => Boolean(image.imageUrl))
    .map((image) =>
      createExistingDragAndDropImgDraft(image.id, String(image.imageUrl)),
    );

export default function EditProductForm({
  productId,
  productSummary,
  onCloseModal,
}: EditProductFormProps) {
  const { product: fullProduct, isPending: isLoadingProduct } =
    useProduct(productId);

  // Ưu tiên dữ liệu chi tiết từ getById; fallback tạm bằng summary để modal mở mượt,
  // không bị "trống" trong lúc chờ fetch chi tiết.
  const productToEdit = fullProduct ?? productSummary;
  const fallbackProduct = useMemo(
    () =>
      productToEdit ??
      ({
        id: productId,
        name: "",
        slug: "",
        baseSku: "",
        category: { id: 0, name: "" },
        images: [],
        descriptions: [],
        createdAt: "",
        updatedAt: "",
      } as ProductSummary),
    [productId, productToEdit],
  );

  const initialImageKeys = useMemo(
    () => mapExistingImages(fallbackProduct).map((image) => image.localId),
    [fallbackProduct],
  );

  const [images, setImages] = useState<DragAndDropImgDraft[]>(() =>
    mapExistingImages(fallbackProduct),
  );
  const imagesRef = useRef<DragAndDropImgDraft[]>(images);

  const {
    register,
    control,
    getValues,
    handleSubmit,
    reset,
    formState: { errors, dirtyFields },
  } = useForm<ProductEditValues>({
    defaultValues: mapToDefaultValues(fallbackProduct),
  });
  const currentDescriptions = useWatch({ control, name: "descriptions" }) ?? [];

  const { mutate: updateProduct, isPending } = useUpdateProduct();
  const {
    savingDescriptionKeys,
    hasStructuralDescriptionChanges,
    canSaveDescriptionItem,
    handleSaveDescriptionItem,
    buildStructuralDescriptionPayload,
  } = useDescriptionEditFlow({
    productId,
    productDescriptions: productToEdit?.descriptions,
    currentDescriptions,
    getLatestDescriptions: () => getValues("descriptions") ?? [],
  });

  useEffect(() => {
    if (!productToEdit) return;

    const nextValues = mapToDefaultValues(productToEdit);
    const nextImages = mapExistingImages(productToEdit);

    setImages(nextImages);
    imagesRef.current = nextImages;
    reset(nextValues);
  }, [productToEdit, reset]);

  useEffect(() => {
    imagesRef.current = images;
  }, [images]);

  useEffect(() => {
    return () => {
      imagesRef.current.forEach(revokeDragAndDropImgUrl);
    };
  }, []);

  const hasImageChanges = useMemo(() => {
    const currentKeys = images.map((image) => image.localId);
    return initialImageKeys.join(",") !== currentKeys.join(",");
  }, [images, initialImageKeys]);

  const onSubmit = (values: ProductEditValues) => {
    const imageIdsInOrder = images
      .filter((image) => image.kind === "existing" && image.imageId)
      .map((image) => Number(image.imageId));

    const newImagesInOrder = images
      .map((image, index) => ({ image, index }))
      .filter(({ image }) => image.kind === "new" && image.file);

    const hasNewImages = newImagesInOrder.length > 0;
    const hasExistingImageOrder = imageIdsInOrder.length > 0;

    const hasBaseInfoChanges = getDirty("name") || getDirty("slug");

    const structuralDescriptionPayload = buildStructuralDescriptionPayload(
      values.descriptions,
    );

    const payload = {
      name: values.name.trim(),
      slug: normalizeString(values.slug),
      ...(hasExistingImageOrder ? { imageIdsInOrder } : {}),
      ...(hasNewImages
        ? {
            newImageOrders: newImagesInOrder.map(({ index }) => index + 1),
          }
        : {}),
      ...(hasStructuralDescriptionChanges
        ? {
            // Flow chính chỉ xử lý structural changes cho descriptions:
            // - thứ tự existing
            // - danh sách description mới
            ...structuralDescriptionPayload,
          }
        : {}),
    };

    const canSubmitMain =
      hasBaseInfoChanges || hasImageChanges || hasStructuralDescriptionChanges;
    if (!canSubmitMain) return;

    updateProduct(
      {
        productId,
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
    const nextImages = mapExistingImages(fallbackProduct);
    setImages(nextImages);
    imagesRef.current = nextImages;
    reset(mapToDefaultValues(fallbackProduct));
    onCloseModal?.();
  };

  const { getDirty, getDirtyClass } =
    useFormDirtyStyle<ProductEditValues>(dirtyFields);

  // Nút "Lưu thay đổi" của form chính chỉ bật cho thay đổi cấp product
  // (name/slug/images/description order/new description), không phụ thuộc
  // thay đổi nội bộ từng description vì đã có Save riêng theo item.
  const hasBaseInfoChanges = getDirty("name") || getDirty("slug");
  const canSubmitMain =
    hasBaseInfoChanges || hasImageChanges || hasStructuralDescriptionChanges;

  if (!productToEdit && isLoadingProduct) {
    return (
      <div className="flex min-h-56 items-center justify-center px-10 py-8">
        <div className="flex items-center gap-3">
          <Spinner type="mini" />
          <p className="text-primary-600 text-sm">
            Đang tải chi tiết sản phẩm...
          </p>
        </div>
      </div>
    );
  }

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

      <FormRow label="Mã SKU cơ bản*" id="edit-base-sku">
        <Input id="edit-base-sku" disabled {...register("baseSku")} />
      </FormRow>

      <FormRow label="Danh mục*" id="edit-category">
        <Input id="edit-category" disabled {...register("categoryName")} />
      </FormRow>

      <FormRow label={<div className="cursor-default">Mô tả sản phẩm</div>}>
        <Controller
          name="descriptions"
          control={control}
          render={({ field }) => (
            <ProductDescriptionsInput
              mode="edit"
              value={field.value || []}
              onChange={field.onChange}
              disabled={isPending}
              className={getDirtyClass("descriptions")}
              onSaveItem={handleSaveDescriptionItem}
              canSaveItem={canSaveDescriptionItem}
              savingItemIds={savingDescriptionKeys}
            />
          )}
        />
      </FormRow>

      <FormRow
        label={<div className="cursor-default">Hình ảnh</div>}
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

      <FormRow className="sticky bottom-0 flex justify-end gap-2 bg-inherit">
        <Button
          type="button"
          variant="secondary"
          onClick={handleCancel}
          disabled={isPending}
        >
          Hủy
        </Button>
        <Button type="submit" disabled={isPending || !canSubmitMain}>
          Lưu thay đổi
        </Button>
      </FormRow>
    </Form>
  );
}
