export type CartItemVariantImage = {
  id: number;
  imageUrl: string | null;
  imageName: string | null;
};

export type CartItemVariantProduct = {
  id: number;
  name: string;
  slug: string;
  isDeleted: boolean;
};

export type CartItemVariant = {
  id: number;
  sku: string;
  color: string | null;
  size: string | null;
  image: CartItemVariantImage | null;
  isDeleted: boolean;
  quantity: number | null;
  version: number;
  product: CartItemVariantProduct | null;
};

export type CartItem = {
  id: number;
  quantity: number | null;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  variant: CartItemVariant | null;
};

export type CartResponse = {
  id: number;
  createdAt: string;
  updatedAt: string;
  totalItems: number;
  totalPrice: number;
  items: CartItem[];
};

export type CartGuestItem = {
  id: string;
  variantId: number;
  name: string;
  sku: string;
  color: string | null;
  size: string | null;
  quantity: number;
  price: number;
  imageUrl: string | null;
  url?: string;
  stock?: number | null;
};

export type CartDisplayItem = {
  id: number | string;
  variantId: number;
  name: string;
  sku: string;
  color: string | null;
  size: string | null;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  imageUrl: string | null;
  url?: string;
  stock?: number | null;
  isDeleted?: boolean;
};

export type CreateCartItemDto = {
  variantId: number;
  quantity?: number;
};

export type UpdateCartItemDto = {
  quantity: number;
};

export type MergeCartItemDto = {
  variantId: number;
  quantity: number;
};

export type MergeCartDto = {
  items: MergeCartItemDto[];
};
