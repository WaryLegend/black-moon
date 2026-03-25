import { ReactNode } from "react";

function AdSideNavigation({ children }: { children: ReactNode }) {
  return (
    <aside
      style={{ gridRow: "1 / -1" }}
      className={`bg-primary-50 z-1 flex flex-col items-center gap-10 px-2 py-5 shadow-md`}
    >
      {children}
    </aside>
  );
}

export default AdSideNavigation;
