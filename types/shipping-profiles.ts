export type ShippingProfile = {
  id: number;
  userId: number;
  firstName: string | null;
  lastName: string | null;
  phoneNumber: string | null;
  address: string | null;
  wardId: string | null;
  ward: string | null;
  districtId: number | null;
  district: string | null;
  provinceId: number | null;
  province: string | null;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CreateShippingProfileDto = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  wardId?: string;
  ward?: string;
  districtId?: number;
  district?: string;
  provinceId?: number;
  province?: string;
  isDefault?: boolean;
};

export type UpdateShippingProfileDto = Partial<CreateShippingProfileDto>;

export type GhnProvince = {
  id: number;
  name: string;
  code: string | null;
};

export type GhnDistrict = {
  id: number;
  name: string;
  code: string | null;
};

export type GhnWard = {
  code: string;
  name: string;
};
