import type { ProfileDetails } from "@/types/profile";

export const ROLE_OPTIONS = [
  { value: "USER", label: "User" },
  { value: "STAFF", label: "Staff" },
  { value: "MANAGER", label: "Manager" },
  { value: "ADMIN", label: "Admin" },
];

export const DEFAULT_ROLE = ROLE_OPTIONS[0].value;

const GENDER_VALUES = ["MALE", "FEMALE", "OTHER"] as const;
export type GenderValue = (typeof GENDER_VALUES)[number];

export const GENDER_OPTIONS: Array<{ value: GenderValue; label: string }> = [
  { value: "MALE", label: "Nam" },
  { value: "FEMALE", label: "Nữ" },
  { value: "OTHER", label: "Khác" },
];

const isGenderValue = (value: string): value is GenderValue =>
  GENDER_VALUES.includes(value as GenderValue);

export const normalizeGenderValue = (
  value?: string | null,
): ProfileDetails["gender"] => {
  if (!value?.trim()) return null;
  const normalized = value.trim().toUpperCase();
  return isGenderValue(normalized) ? normalized : null;
};
