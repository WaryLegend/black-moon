import { FieldValues, FormState } from "react-hook-form";

/**
 * Hook để lấy class style cho các trường đã thay đổi.
 * Hỗ trợ cả giá trị boolean đơn giản và object/array (đệ quy).
 * Cũng hỗ trợ field path dạng "a.b.c".
 */
export function useFormDirtyStyle<TFieldValues extends FieldValues>(
  // Chúng ta trích xuất kiểu của dirtyFields từ FormState
  dirtyFields: FormState<TFieldValues>["dirtyFields"],
  dirtyClassName: string = "border-amber-600",
) {
  const hasTruthy = (val: unknown): boolean => {
    if (val == null) return false;
    if (typeof val === "boolean") return val;
    if (typeof val === "object") {
      return Object.values(val as Record<string, unknown>).some((v) =>
        hasTruthy(v),
      );
    }
    return false;
  };

  function getDirty<K extends keyof TFieldValues>(fieldName: K): boolean;
  function getDirty(fieldName: string): boolean;
  function getDirty(fieldName: keyof TFieldValues | string): boolean {
    if (!dirtyFields) return false;

    // Hỗ trợ path dạng dotted: "a.b.c"
    if (typeof fieldName === "string" && fieldName.includes(".")) {
      const parts = fieldName.split(".");
      let cur: any = dirtyFields as any;
      for (const p of parts) {
        if (cur == null) return false;
        cur = cur[p];
      }
      return hasTruthy(cur);
    }

    const val = (dirtyFields as any)[fieldName as string];
    return hasTruthy(val);
  }

  function getDirtyClass<K extends keyof TFieldValues>(fieldName: K): string;
  function getDirtyClass(fieldName: string): string;
  function getDirtyClass(fieldName: keyof TFieldValues | string): string {
    return getDirty(fieldName as any) ? dirtyClassName : "";
  }

  return { getDirty, getDirtyClass };
}
