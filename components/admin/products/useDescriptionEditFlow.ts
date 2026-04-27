"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import type { ProductSummary, UpdateProductDto } from "@/types/products";

import {
  normalizeDescriptionDrafts,
  type ProductDescriptionDraft,
} from "./ProductDescriptionsInput";
import { useUpdateProductDescription } from "./useUpdateProductDescription";

type StructuralDescriptionPayload = Pick<
  UpdateProductDto,
  "descriptionIdsInOrder" | "newDescriptions" | "newDescriptionOrders"
>;

type UseDescriptionEditFlowParams = {
  productId: number;
  productDescriptions?: ProductSummary["descriptions"];
  currentDescriptions: ProductDescriptionDraft[];
  getLatestDescriptions: () => ProductDescriptionDraft[];
};

const isDescriptionMeaningful = (description: ProductDescriptionDraft) =>
  Boolean(
    description.title.trim() &&
      description.contentHtml.trim() &&
      description.plainText.trim(),
  );

const areDescriptionInternalsEqual = (
  left: ProductDescriptionDraft,
  right: ProductDescriptionDraft,
) =>
  left.title.trim() === right.title.trim() &&
  left.contentHtml.trim() === right.contentHtml.trim() &&
  left.plainText.trim() === right.plainText.trim() &&
  Boolean(left.isDeleted) === Boolean(right.isDeleted);

export function useDescriptionEditFlow({
  productId,
  productDescriptions,
  currentDescriptions,
  getLatestDescriptions,
}: UseDescriptionEditFlowParams) {
  const [descriptionBaseline, setDescriptionBaseline] = useState<
    ProductDescriptionDraft[]
  >(normalizeDescriptionDrafts(productDescriptions ?? []));
  const [savingDescriptionKeys, setSavingDescriptionKeys] = useState<string[]>(
    [],
  );

  const { mutate: updateDescription } = useUpdateProductDescription();

  // Đồng bộ baseline theo dữ liệu mới nhất từ server mỗi khi product đổi.
  useEffect(() => {
    setDescriptionBaseline(
      normalizeDescriptionDrafts(productDescriptions ?? []),
    );
    setSavingDescriptionKeys([]);
  }, [productDescriptions]);

  const baselineExistingDescriptionOrder = useMemo(
    () =>
      descriptionBaseline
        .filter((description) => Number.isInteger(description.id))
        .map((description) => Number(description.id)),
    [descriptionBaseline],
  );

  const currentExistingDescriptionOrder = useMemo(
    () =>
      currentDescriptions
        .filter((description) => Number.isInteger(description.id))
        .map((description) => Number(description.id)),
    [currentDescriptions],
  );

  const hasDescriptionOrderChanges =
    baselineExistingDescriptionOrder.join(",") !==
    currentExistingDescriptionOrder.join(",");

  const hasNewDescriptions = currentDescriptions.some(
    (description) =>
      description.id === undefined && isDescriptionMeaningful(description),
  );

  const hasStructuralDescriptionChanges =
    hasDescriptionOrderChanges || hasNewDescriptions;

  const canSaveDescriptionItem = useCallback(
    (item: ProductDescriptionDraft) => {
      if (!item.id) return false;
      const baseline = descriptionBaseline.find(
        (candidate) => candidate.id === item.id,
      );
      if (!baseline) return false;
      return !areDescriptionInternalsEqual(item, baseline);
    },
    [descriptionBaseline],
  );

  const handleSaveDescriptionItem = useCallback(
    (draftKey: string) => {
      if (savingDescriptionKeys.includes(draftKey)) return;

      const target = currentDescriptions.find(
        (description) => description.key === draftKey,
      );
      if (!target?.id) return;

      const payload = {
        id: target.id,
        title: target.title.trim(),
        contentHtml: target.contentHtml.trim(),
        plainText: target.plainText.trim(),
        isDeleted: target.isDeleted,
      };

      setSavingDescriptionKeys((keys) => [...keys, draftKey]);
      updateDescription(
        {
          productId,
          payload,
        },
        {
          onSuccess: () => {
            // Cập nhật baseline sau khi save item thành công để nút Save ẩn đúng.
            const latestDescriptions = getLatestDescriptions() ?? [];
            const updatedDraft = latestDescriptions.find(
              (description) => description.key === draftKey,
            );

            if (updatedDraft?.id) {
              setDescriptionBaseline((baseline) =>
                baseline.map((description) =>
                  description.id === updatedDraft.id
                    ? {
                        ...description,
                        title: updatedDraft.title,
                        contentHtml: updatedDraft.contentHtml,
                        plainText: updatedDraft.plainText,
                        isDeleted: updatedDraft.isDeleted,
                      }
                    : description,
                ),
              );
            }
          },
          onSettled: () => {
            setSavingDescriptionKeys((keys) =>
              keys.filter((currentKey) => currentKey !== draftKey),
            );
          },
        },
      );
    },
    [
      currentDescriptions,
      getLatestDescriptions,
      productId,
      savingDescriptionKeys,
      updateDescription,
    ],
  );

  const buildStructuralDescriptionPayload = useCallback(
    (descriptions: ProductDescriptionDraft[]): StructuralDescriptionPayload => {
      const descriptionIdsInOrder = descriptions
        .filter((description) => Number.isInteger(description.id))
        .map((description) => Number(description.id));

      const newDescriptionsWithOrder = descriptions
        .map((description, index) => ({ description, index }))
        .filter(({ description }) => description.id === undefined)
        .map(({ description, index }) => ({
          title: description.title.trim(),
          contentHtml: description.contentHtml.trim(),
          plainText: description.plainText.trim(),
          order: index + 1,
          isDeleted: description.isDeleted,
        }))
        .filter((description) =>
          Boolean(
            description.title &&
              description.contentHtml &&
              description.plainText,
          ),
        );

      return {
        descriptionIdsInOrder,
        newDescriptions: newDescriptionsWithOrder.map(
          ({ order: _order, ...rest }) => rest,
        ),
        newDescriptionOrders: newDescriptionsWithOrder.map(
          ({ order }) => order,
        ),
      };
    },
    [],
  );

  return {
    savingDescriptionKeys,
    hasStructuralDescriptionChanges,
    canSaveDescriptionItem,
    handleSaveDescriptionItem,
    buildStructuralDescriptionPayload,
  };
}
