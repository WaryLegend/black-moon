import { getCategoryByGroup } from "@/app/_lib/data-service";
import CategoryList from "@/app/_components/CategoryList";
import SuggestionList from "@/app/_components/SuggestionList";

const suggestions = [
  "ĐỒ MẶC NGOÀI",
  "QUẦN",
  "HEATTECH",
  "ĐỒ BẦU",
  "ÁO THUN, ÁO NI & ÁO GIẢ LÔNG CỪU",
  "AIRism",
  "Đồ mặc nhà",
];

async function KidsPanel() {
  const { categories } = await getCategoryByGroup("kids");

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
