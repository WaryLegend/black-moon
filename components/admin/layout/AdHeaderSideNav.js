import { SidebarProvider } from "@/context/SidebarContext";
import AdHeader from "./AdHeader";
import AdSideNavigation from "./AdSideNavigation";
import AdSideNavList from "@/components/admin/navigation/AdSideNavList";
import ALogoLink from "@/components/admin/navigation/ALogoLink";

export default function AdHeaderSideNav() {
  return (
    <SidebarProvider>
      <AdHeader />
      <AdSideNavigation>
        <ALogoLink />
        <AdSideNavList />
      </AdSideNavigation>
    </SidebarProvider>
  );
}
