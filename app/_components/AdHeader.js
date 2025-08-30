import Admin from "@/app/_components/Admin";
import ToggleSideBar from "@/app/_components/ToggleSideBar";

function AdHeader() {
  return (
    <header className="bg-primary-200 px-4 py-3 sm:px-8 sm:py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <ToggleSideBar />
        <Admin />
      </div>
    </header>
  );
}

export default AdHeader;
