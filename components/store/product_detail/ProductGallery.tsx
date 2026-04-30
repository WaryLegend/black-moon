"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import { useProductStore } from "@/contexts/ProductStore";
import type { ProductImageSummary } from "@/types/products";
import Modal from "@/components/ui/Modal";
import ImageViewer from "@/components/ui/ImageViewer";

function dedupeImages(images: ProductImageSummary[]): ProductImageSummary[] {
  const seen = new Set<string>();
  return images.filter((img) => {
    const key = `${img.id}-${img.imageUrl}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export default function ProductGallery() {
  const product = useProductStore((s) => s.product);
  const selectedVariant = useProductStore((s) => s.selectedVariant());
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const images = useMemo(() => {
    if (!product) return [];

    const baseImages = product.images ?? [];
    const variantImage = selectedVariant?.image;

    if (!variantImage?.imageUrl) return dedupeImages(baseImages);

    const leadImage: ProductImageSummary = {
      id: variantImage.id,
      imageUrl: variantImage.imageUrl,
      imageName: variantImage.imageName,
      imageOrder: -1,
    };

    return dedupeImages([leadImage, ...baseImages]);
  }, [product, selectedVariant]);

  if (!images.length) {
    return (
      <div className="relative grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-[1px] overflow-hidden rounded-lg">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="from-primary-300 to-primary-200 aspect-[3/4] animate-pulse bg-gradient-to-tr"
          />
        ))}
      </div>
    );
  }

  return (
    <Modal>
      <div className="relative grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-[1px] overflow-hidden rounded-lg">
        {images.map((image, index) => (
          <div
            key={image.id ?? index}
            className="relative aspect-[3/4] hover:cursor-zoom-in"
            onClick={() => setPreviewImage(image.imageUrl)}
          >
            {image.imageUrl ? (
              <Modal.Open opens="image-zoom">
                <Image
                  src={image.imageUrl}
                  alt={`image of ${product?.name ?? "product"}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 400px"
                  className="object-cover"
                />
              </Modal.Open>
            ) : (
              <div className="from-primary-200 to-primary-100 h-full w-full bg-gradient-to-tr" />
            )}
          </div>
        ))}
      </div>
      {previewImage && (
        <Modal.Window name="image-zoom">
          <ImageViewer src={previewImage} />
        </Modal.Window>
      )}
    </Modal>
  );
}
