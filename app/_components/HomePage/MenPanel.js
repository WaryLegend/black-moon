import { getCategoryByGroup } from "@/app/_lib/data-service";
import CategoryList from "@/app/_components/CategoryList";
import SuggestionList from "@/app/_components/SuggestionList";

const suggestions = ["ĐỒ MẶC NGOÀI", "QUẦN", "HEATTECH", "ĐỒ BẦU"];

async function MenPanel() {
  const { categories } = await getCategoryByGroup("men");

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
