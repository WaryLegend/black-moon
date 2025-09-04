import { SidebarProvider } from "../_context/SidebarContext";
import AdHeader from "@/app/_components/AdHeader";
import SideNavigation from "@/app/_components/SideNavigation";
import LogoLink from "./LogoLink";
import SideNavList from "./SideNavList";

export default function AdHeaderSideNav() {
  return (
    <SidebarProvider>
      <AdHeader />
      <SideNavigation>
        <LogoLink linkTo={"/admin"} className="max-lg:scale-90" />
        <SideNavList />
      </SideNavigation>
    </SidebarProvider>
  );
}
