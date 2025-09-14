import { SidebarProvider } from "@/app/_context/SidebarContext";
import AdHeader from "@/app/_components/AdHeader";
import AdSideNavigation from "@/app/_components/AdSideNavigation";
import LogoLink from "@/app/_components/LogoLink";
import AdSideNavList from "@/app/_components/AdSideNavList";

export default function AdHeaderSideNav() {
  return (
    <SidebarProvider>
      <AdHeader />
      <AdSideNavigation>
        <LogoLink linkTo={"/admin"} className="max-lg:scale-90" />
        <AdSideNavList />
      </AdSideNavigation>
    </SidebarProvider>
  );
}
