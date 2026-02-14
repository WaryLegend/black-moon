import Admin from "@/components/user-menu/Admin";
import ToggleSideBar from "./ToggleSideBar";
import ThemeToggleBtn from "@/components/ui/ThemeToggleBtn";

function AdHeader() {
  return (
    <header className="bg-primary-200 z-1 px-8 py-1 shadow-md">
      <div className="mx-auto flex max-w-[1750px] items-center justify-between">
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
