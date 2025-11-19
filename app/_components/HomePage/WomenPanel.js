import { Suspense } from "react";
import CategoryList from "@/app/_components/CategoryList";
import SuggestionList from "@/app/_components/SuggestionList";
import Spinner from "@/app/_components/Spinner";

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
      <Suspense
        fallback={
          <div className="mt-10 flex justify-center">
            <Spinner
              type="bar"
              color="var(--color-accent-600)"
              className="my-0.5"
            />
          </div>
        }
      >
        <CategoryList group={"women"} />
      </Suspense>
      {/* other sections */}
      <SuggestionList suggestions={suggestions} />
    </>
  );
}

export default WomenPanel;
