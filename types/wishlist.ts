export type WishlistSortField = "createdAt";
export type WishlistSortOrder = "asc" | "desc";

export type WishlistPageSearchParams = {
  sortBy?: string;
};

export type WishlistSort = {
  field: WishlistSortField;
  order: WishlistSortOrder;
};

export type WishlistVariantImage = {
  id: number;
  imageUrl: string | null;
  imageName: string | null;
};

export type WishlistVariantProduct = {
  id: number;
  name: string;
  slug: string;
  isDeleted: boolean;
};

export type WishlistVariantSummary = {
  id: number;
  sku: string;
  color: string | null;
  size: string | null;
  image: WishlistVariantImage | null;
  isDeleted: boolean;
  product: WishlistVariantProduct | null;
};

export type WishlistUserItem = {
  id: number;
  createdAt: string;
  updatedAt: string;
  variant: WishlistVariantSummary | null;
};

export type WishlistListMeta = {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
};

export type WishlistUserListResponse = {
  items: WishlistUserItem[];
  meta: WishlistListMeta;
};

export type CreateWishlistDto = {
  userId: number;
  variantId: number;
};

export type WishlistUserSummary = {
  id: number;
  email: string;
  profile: {
    id: number;
    firstName: string | null;
    lastName: string | null;
    fullName: string | null;
    gender: string | null;
    avatarUrl: string | null;
  } | null;
};

export type WishlistResponse = {
  id: number;
  createdAt: string;
  updatedAt: string;
  user: WishlistUserSummary | null;
  variant: WishlistVariantSummary | null;
};
