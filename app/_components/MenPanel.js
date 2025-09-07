import CategoryList from "@/app/_components/CategoryList";
import SuggestionList from "@/app/_components/SuggestionList";

const categories = [
  { id: 1, name: "ĐỒ MẶC NGOÀI" },
  { id: 2, name: "ÁO THUN, ÁO NỈ & ÁO LÓT DÀI TAY" },
  { id: 3, name: "ÁO SƠ MI & ÁO POLO" },
  { id: 4, name: "QUẦN" },
  { id: 5, name: "SPORT UTILITY WEAR" },
  { id: 6, name: "AIRism" },
  { id: 7, name: "HEATTECH" },
  { id: 8, name: "ÁO LEN" },
  { id: 9, name: "ÁO KHOÁC NHẸ" },
  { id: 10, name: "PHỤ KIỆN" },
  { id: 11, name: "ĐỒ MẶC TRONG & ĐỒ LÓT" },
  { id: 12, name: "LINEN" },
  { id: 13, name: "Special Collaborations" },
  { id: 14, name: "BST THU/ĐÔNG 2023" },
  { id: 15, name: "UT (UNIQLO T-Shirts)" },
];

const suggestions = ["ĐỒ MẶC NGOÀI", "QUẦN", "HEATTECH", "ĐỒ BẦU"];

function MenPanel() {
  return (
    <>
      <h2 className="mb-4 text-center text-xl font-bold">Danh mục cho nam</h2>
      {/* cagetory section */}
      <CategoryList categories={categories} group={"men"} />
      {/* other sections */}
      <SuggestionList suggestions={suggestions} />
    </>
  );
}

export default MenPanel;
