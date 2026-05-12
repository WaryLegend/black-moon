export type SystemConfigValueType =
  | "NUMBER"
  | "STRING"
  | "BOOLEAN"
  | "JSON"
  | "ARRAY";

export type SystemConfigValue =
  | number
  | string
  | boolean
  | null
  | Record<string, unknown>
  | unknown[];

export type SystemConfigItem = {
  name: string;
  key: string;
  value: SystemConfigValue;
  type: SystemConfigValueType;
  isDefault: boolean;
  description: string | null;
  isPublic: boolean;
  updatedAt?: string | null;
  updatedBy?: number | null;
};

export type UpdateSystemConfigDto = {
  value?: string;
  isPublic?: boolean;
};

export type ResetSystemConfigsResponse = {
  success: boolean;
  updatedCount: number;
};
