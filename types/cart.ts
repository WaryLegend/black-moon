export type CartItemVariantImage = {
  id: number;
  imageUrl: string | null;
  imageName: string | null;
};

export type CartItemProduct = {
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
  price: number;
  image: CartItemVariantImage | null;
  isDeleted: boolean;
  quantity: number | null;
  version: number;
  product: CartItemProduct | null;
};

export type CartItem = {
  id: number;
  quantity: number | null;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  variant: CartItemVariant | null;
};

export type GuestCartItem = {
  id: number;
  quantity: number;
  variant: CartItemVariant;
};

export type CartResponse = {
  id: number;
  createdAt: string;
  updatedAt: string;
  totalItems: number;
  totalPrice: number;
  items: CartItem[];
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
