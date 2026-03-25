import type { ReadonlyURLSearchParams } from "next/navigation";

import type { SortDirection, SortValue } from "@/types/sort";

const DEFAULT_SORT: SortValue = "createdAt-desc";

// Định dạng chuẩn được chấp nhận bởi các component trang và các hook phía client.
export type SearchParamsLike =
  | URLSearchParams
  | ReadonlyURLSearchParams
  | Record<string, string | string[] | undefined>;

type MultiFilterItem<TValue> =
  TValue extends Array<infer TItem> ? TItem : never;

export type FilterFieldConfig<TValue> = {
  // Đánh dấu filter này là nhiều giá trị (ví dụ params như groups=a,b hoặc groups=a&groups=b).
  allowMulti?: boolean;
  // Nếu true, mỗi giá trị thô sẽ được tách theo dấu phẩy trước khi phân tích.
  splitCommaValues?: boolean;
  // Các giá trị được coi là "không được chọn".
  emptyValues?: Array<string | null | undefined>;
  // Phân tích (parse) trường có một giá trị.
  parse?: (value: string) => TValue | undefined;
  // Phân tích từng phần tử cho trường nhiều giá trị.
  parseItem?: (value: string) => MultiFilterItem<TValue> | undefined;
};

export type FilterConfigMap<TFilters extends Record<string, unknown>> = {
  [K in keyof TFilters]: FilterFieldConfig<TFilters[K]>;
};

export type ParseListSearchParamsOptions<
  TFilters extends Record<string, unknown>,
> = {
  filterConfig?: FilterConfigMap<TFilters>;
  defaultSort?: SortValue;
  sortParam?: string;
};

export type ParsedSort = {
  field: string;
  direction: SortDirection;
};

export type ParsedListSearchParams<TFilters extends Record<string, unknown>> = {
  filters: TFilters;
  sortBy: ParsedSort;
};

// Phân tích tham số trang một cách an toàn và quay về trang 1 nếu không hợp lệ.
export function parsePageParam(pageValue?: string, fallback = 1): number {
  const parsed = Number(pageValue);
  if (!Number.isFinite(parsed) || parsed <= 0) return fallback;
  return Math.floor(parsed);
}

// Giữ trường sắp xếp nằm trong các giá trị cho phép.
export function normalizeSortField<TField extends string>(
  value: string,
  allowedFields: readonly TField[],
  fallback: TField,
): TField {
  return allowedFields.includes(value as TField) ? (value as TField) : fallback;
}

export function parseListSearchParams<TFilters extends Record<string, unknown>>(
  searchParams: SearchParamsLike,
  options: ParseListSearchParamsOptions<TFilters> = {},
): ParsedListSearchParams<TFilters> {
  const filters = {} as TFilters;
  const entries = Object.entries(options.filterConfig ?? {}) as Array<
    [keyof TFilters, FilterFieldConfig<TFilters[keyof TFilters]>]
  >;

  for (const [field, config] of entries) {
    const emptyValues = new Set(
      (config.emptyValues ?? []).filter(
        (value): value is string => value !== undefined && value !== null,
      ),
    );

    if (config.allowMulti) {
      const values = readParam(searchParams, field as string, true);
      if (!values?.length) continue;

      const normalizedSourceValues = config.splitCommaValues
        ? values
            .flatMap((value) => value.split(","))
            .map((value) => value.trim())
            .filter(Boolean)
        : values;

      const parseItem = config.parseItem
        ? config.parseItem
        : (value: string) =>
            value as unknown as MultiFilterItem<TFilters[keyof TFilters]>;

      const parsedValues = normalizedSourceValues
        .map((value) => value?.trim())
        .filter(
          (value): value is string => Boolean(value) && !emptyValues.has(value),
        )
        .map((value) => parseItem(value))
        .filter(
          (value): value is MultiFilterItem<TFilters[keyof TFilters]> =>
            value !== undefined,
        );

      if (parsedValues.length) {
        filters[field] = parsedValues as TFilters[keyof TFilters];
      }
      continue;
    }

    const rawValue = readParam(searchParams, field as string);
    if (!rawValue) continue;

    const normalized = rawValue.trim();
    if (!normalized || emptyValues.has(normalized)) continue;

    const parsed = config.parse
      ? config.parse(normalized)
      : (normalized as unknown as TFilters[keyof TFilters]);

    if (parsed !== undefined) {
      filters[field] = parsed;
    }
  }

  const sortParamName = options.sortParam ?? "sortBy";
  const fallbackSort = options.defaultSort ?? DEFAULT_SORT;
  const sortValue = readParam(searchParams, sortParamName) || fallbackSort;
  const sortBy = parseSortValue(sortValue, fallbackSort);

  return { filters, sortBy };
}

function parseSortValue(value: string, fallback: SortValue): ParsedSort {
  const candidate = value.includes("-") ? value : fallback;
  const [field = fallback.split("-")[0], direction = fallback.split("-")[1]] =
    candidate.split("-");
  const normalizedDirection = direction === "asc" ? "asc" : "desc";

  return {
    field,
    direction: normalizedDirection,
  };
}

function isSearchParamsInstance(
  value: unknown,
): value is URLSearchParams | ReadonlyURLSearchParams {
  return Boolean(
    value && typeof value === "object" && "get" in value && "getAll" in value,
  );
}

function readParam(
  source: SearchParamsLike,
  key: string,
  all?: false,
): string | null;
function readParam(
  source: SearchParamsLike,
  key: string,
  all: true,
): string[] | null;
function readParam(
  source: SearchParamsLike,
  key: string,
  all: boolean = false,
): string | string[] | null {
  if (isSearchParamsInstance(source)) {
    if (all) {
      const values = source.getAll(key);
      return values.length ? values : null;
    }
    return source.get(key);
  }

  const record = source as Record<string, string | string[] | undefined>;
  const value = record?.[key];

  if (Array.isArray(value)) {
    if (all) {
      const normalized = value.filter((entry): entry is string =>
        Boolean(entry),
      );
      return normalized.length ? normalized : null;
    }
    return value[0] ?? null;
  }

  if (all) {
    return value ? [value] : null;
  }

  return value ?? null;
}
