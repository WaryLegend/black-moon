import { getCategoryByGroup } from "@/app/_lib/data-service";
import CategoryList from "@/app/_components/CategoryList";
import SuggestionList from "@/app/_components/SuggestionList";

const suggestions = [
  "ĐỒ MẶC NGOÀI",
  "QUẦN",
  "HEATTECH",
  "ĐỒ BẦU",
  "ÁO THUN, ÁO NI & ÁO GIẢ LÔNG CỪU",
];

async function WomenPanel() {
  const { categories } = await getCategoryByGroup("women");

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
