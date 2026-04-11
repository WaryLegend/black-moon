export type DragAndDropImgDraft = {
  localId: string;
  kind: "existing" | "new";
  imageId?: number;
  imageUrl: string;
  file?: File;
};

export const createNewDragAndDropImgDraft = (
  file: File,
): DragAndDropImgDraft => ({
  localId: `new-${crypto.randomUUID()}`,
  kind: "new",
  imageUrl: URL.createObjectURL(file),
  file,
});

export const createExistingDragAndDropImgDraft = (
  imageId: number,
  imageUrl: string,
): DragAndDropImgDraft => ({
  localId: `existing-${imageId}`,
  kind: "existing",
  imageId,
  imageUrl,
});

export const revokeDragAndDropImgUrl = (image: DragAndDropImgDraft) => {
  if (image.kind === "new" && image.imageUrl.startsWith("blob:")) {
    URL.revokeObjectURL(image.imageUrl);
  }
};
