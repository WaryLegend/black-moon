import Navigation from "@/app/_components/Navigation";
import LogoLink from "@/app/_components/LogoLink";
import User from "./User";
import Sidebar from "./Sidebar";

function Header() {
  return (
    <header className="sticky z-10 w-full px-4 py-4 sm:px-8 sm:py-5">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <LogoLink />
        <Navigation />
        <div className="flex gap-4 md:gap-0">
          <User />
          <Sidebar />
        </div>
      </div>
    </header>
  );
}

export default Header;
