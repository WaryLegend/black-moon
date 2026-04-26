import SuggestionList from "@/components/SuggestionList";
import CategoryList from "./CategoryList";
import type { HomeTargetGroup } from "@/types/homepage";
import { Suspense } from "react";
import Spinner from "@/components/ui/Spinner";

const defaultSuggestions: string[] = [
  "DO MAC NGOAI",
  "QUAN",
  "HEATTECH",
  "AO THUN",
  "DO MOI VE",
];

type GroupPanelProps = {
  group: HomeTargetGroup;
};

function GroupPanel({ group }: GroupPanelProps) {
  return (
    <>
      <h2 className="mb-4 text-center text-xl font-bold">
        Danh mục cho {group.name}
      </h2>
      <Suspense
        fallback={
          <div className="flex items-center justify-center">
            <Spinner
              type="bar"
              color="var(--color-accent-600)"
              size={40}
              className="self-center"
            />
          </div>
        }
      >
        <CategoryList groupSlug={group.slug} />
      </Suspense>
      <SuggestionList suggestions={defaultSuggestions} />
    </>
  );
}

export default GroupPanel;
