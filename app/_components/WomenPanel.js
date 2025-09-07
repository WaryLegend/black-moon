import CategoryList from "@/app/_components/CategoryList";
import SuggestionList from "@/app/_components/SuggestionList";

const categories = [
  { id: 1, name: "ĐỒ MẶC NGOÀI" },
  { id: 2, name: "QUẦN" },
  { id: 3, name: "HEATTECH" },
  { id: 4, name: "ĐỒ BẦU" },
  { id: 5, name: "ÁO THUN, ÁO NI & ÁO GIẢ LÔNG CỪU" },
  { id: 6, name: "CHÂN VÁY & ĐẦM" },
  { id: 7, name: "ĐỒ MẶC TRONG & ĐỒ LÓT" },
  { id: 8, name: "SẢN PHẨM CHỐNG TIA UV" },
  { id: 9, name: "ÁO LEN & ÁO DỆT KIM" },
  { id: 10, name: "SPORT UTILITY WEAR" },
  { id: 11, name: "ĐỒ MẶC NHÀ" },
  { id: 12, name: "ÁO SƠ MI & ÁO KIỂU" },
  { id: 13, name: "AIRism" },
  { id: 14, name: "PHỤ KIỆN" },
  { id: 15, name: "BST THU/ĐÔNG 2025" },
  { id: 16, name: "UT: Áo Thun In Họa Tiết" },
];

const suggestions = [
  "ĐỒ MẶC NGOÀI",
  "QUẦN",
  "HEATTECH",
  "ĐỒ BẦU",
  "ÁO THUN, ÁO NI & ÁO GIẢ LÔNG CỪU",
];

function WomenPanel() {
  return (
    <>
      {/* cagetory section */}
      <h2 className="mb-4 text-center text-xl font-bold">Danh mục cho nữ</h2>
      <CategoryList categories={categories} group={"women"} />
      {/* other sections */}
      <SuggestionList suggestions={suggestions} />
    </>
  );
}

export default WomenPanel;
