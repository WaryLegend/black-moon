// phone digit format
export const formatMobile = (mobile?: string | null): string => {
  if (!mobile) return "———";
  // Xóa hết ký tự không phải số
  const cleaned = mobile.replace(/\D/g, "");
  // Trường hợp Việt Nam: 10 hoặc 11 số
  if (cleaned.length === 10) {
    return cleaned.replace(/(\d{4})(\d{3})(\d{3})/, "$1.$2.$3");
    // 0901234567 → 0901.234.567
  }
  if (cleaned.length === 11) {
    return cleaned.replace(/(\d{1})(\d{4})(\d{3})(\d{3})/, "$1 $2.$3.$4");
    // 84901234567 → 84 901.234.567
  }
  // Nếu lạ quá thì trả nguyên bản có dấu chấm mỗi 3–4 số
  return cleaned.replace(/(\d{3,4})(?=\d)/g, "$1.").replace(/\.$/, "");
};
