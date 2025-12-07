import Admin from "@/app/_components/Admin";
import ToggleSideBar from "@/app/_components/ToggleSideBar";
import ThemeToggleBtn from "./ThemeToggleBtn";

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
