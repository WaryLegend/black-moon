import { SidebarProvider } from "@/app/_context/SidebarContext";
import AdHeader from "@/app/_components/AdHeader";
import AdSideNavigation from "@/app/_components/AdSideNavigation";
import AdSideNavList from "@/app/_components/AdSideNavList";
import ALogoLink from "@/app/_components/ALogoLink";

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
