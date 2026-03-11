import { format, formatDistance, parseISO } from "date-fns";
import { vi } from "date-fns/locale";
import { toZonedTime } from "date-fns-tz";

const TZ = "Asia/Ho_Chi_Minh";
const FALLBACK = "———";

// date formatter
export const fDate = (date?: string | null): string => {
  if (!date) return FALLBACK;

  try {
    return format(toZonedTime(parseISO(date), TZ), "dd-MM-yyyy", {
      locale: vi,
    });
  } catch {
    return FALLBACK;
  }
};
// date and time formatter
export const fDateTime = (date?: string | null): string => {
  if (!date) return FALLBACK;
  try {
    return format(toZonedTime(parseISO(date), TZ), "dd-MM-yyyy HH:mm", {
      locale: vi,
    });
  } catch {
    return FALLBACK;
  }
};
// get date distance (3 days ago, yesterday, 10 ngày trước,...)
export const fDateDistance = (date?: string | null): string => {
  if (!date) return FALLBACK;
  try {
    return formatDistance(toZonedTime(parseISO(date), TZ), new Date(), {
      addSuffix: true,
      locale: vi,
    });
  } catch {
    return FALLBACK;
  }
};
