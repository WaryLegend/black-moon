import AdHeader from "@/app/_components/AdHeader";
import SideNavigation from "@/app/_components/SideNavigation";
import { SidebarProvider } from "../_context/SidebarContext";

export default function AdHeaderSideNav() {
  return (
    <SidebarProvider>
      <AdHeader />
      <SideNavigation />
    </SidebarProvider>
  );
}
