import type {
  GroupBase,
  MultiValue,
  Props as SelectProps,
  SingleValue,
} from "react-select";
import type { AsyncProps } from "react-select/async";

// Primitive value each option may hold. Numbers are allowed for internal computations
// but will be converted to strings before syncing back to the URL.
export type FilterOptionValue = string | number;

// Canonical option shape consumed across all filter-related components.
export type FilterOption = {
  value: FilterOptionValue;
  label: string;
};

// Runtime value a filter can store locally or receive from URLSearchParams.
export type FilterPrimitive = FilterOptionValue | "";
export type FilterValue = FilterPrimitive | FilterPrimitive[] | null;

// Normalized change event emitted by every filter control.
export type FilterChangeEvent = {
  target: { value: FilterValue };
  option?: SingleValue<FilterOption> | MultiValue<FilterOption> | null;
};

// Thin wrappers around the react-select prop types so we can safely extend them.
export type BaseSelectProps = SelectProps<
  FilterOption,
  boolean,
  GroupBase<FilterOption>
>;
export type BaseAsyncSelectProps = AsyncProps<
  FilterOption,
  boolean,
  GroupBase<FilterOption>
>;

// Shared props that can be forwarded into Select/AsyncSelect instances from config.
export type FilterSelectProps = Partial<
  Omit<BaseSelectProps, "options" | "value" | "onChange">
> & {
  isAsync?: boolean;
  isMulti?: boolean;
  minWidth?: string | number;
  isAnimated?: boolean;
};

// Declarative description for each filter rendered by NestedFilter/SideFilter.
export type FilterConfig = {
  filterField: string;
  options?: FilterOption[];
  selectProps?: FilterSelectProps;
  loadOptions?: (inputValue: string) => Promise<FilterOption[]>;
};

// Local representation of filter values keyed by their field names.
export type FilterState = Record<string, FilterValue>;
