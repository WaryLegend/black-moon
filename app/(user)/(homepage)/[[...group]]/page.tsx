import GroupPanelLoader from "@/components/home/GroupPanelLoader";
import HomePanel from "@/components/home/HomePanel";
import Spinner from "@/components/ui/Spinner";
import { Suspense } from "react";

export default async function HomePage({
  params,
}: {
  params: Promise<{ group?: string[] }>;
}) {
  const { group } = await params;
  const groupSlug = group?.[0]?.toLowerCase();

  return (
    <HomePanel>
      {groupSlug ? (
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
          {/* This component does the fetching */}
          <GroupPanelLoader slug={groupSlug} />
        </Suspense>
      ) : null}
    </HomePanel>
  );
}
