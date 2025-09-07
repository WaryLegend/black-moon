import CategoryList from "@/app/_components/CategoryList";
import SuggestionList from "@/app/_components/SuggestionList";

const categories = [
  { id: 1, name: "Áo Khoác" },
  { id: 2, name: "Áo Thun, Áo Nỉ & Áo Sơ Mi Dài Tay" },
  { id: 3, name: "Quần" },
  { id: 4, name: "Đầm & Chân Váy" },
  { id: 5, name: "AIRism" },
  { id: 6, name: "Sport Utility Wear" },
  { id: 7, name: "ĐỒ MẶC TRONG & ĐỒ LÓT" },
  { id: 8, name: "Đồ mặc nhà" },
  { id: 9, name: "Phụ Kiện" },
  { id: 10, name: "Hệ Thống Trang Phục Thiết Yếu" },
  { id: 11, name: "BST Thu Đông 2023" },
];

const suggestions = [
  "ĐỒ MẶC NGOÀI",
  "QUẦN",
  "HEATTECH",
  "ĐỒ BẦU",
  "ÁO THUN, ÁO NI & ÁO GIẢ LÔNG CỪU",
  "AIRism",
  "Đồ mặc nhà",
];

function KidsPanel() {
  return (
    <>
      <h2 className="mb-4 text-center text-xl font-bold">
        Danh mục cho trẻ em
      </h2>
      {/* cagetory section */}
      <CategoryList categories={categories} group={"kids"} />
      {/* other sections */}
      <SuggestionList suggestions={suggestions} />
    </>
  );
}

export default KidsPanel;
