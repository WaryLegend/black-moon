import Admin from "@/app/_components/Admin";
import ToggleSideBar from "@/app/_components/ToggleSideBar";
import ThemeToggleBtn from "./ThemeToggleBtn";

function AdHeader() {
  return (
    <header className="bg-primary-200 px-4 py-3 transition-all sm:px-6 sm:py-3 lg:px-8 lg:py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <ToggleSideBar />
        <div className="flex items-center gap-2">
          <ThemeToggleBtn />
          <Admin />
        </div>
      </div>
    </header>
  );
}

export default AdHeader;
