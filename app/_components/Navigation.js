import NavList from "@/app/_components/NavList";

export default function Navigation() {
  return (
    <nav className="z-10 hidden text-lg font-semibold sm:text-xl md:block">
      <ul className="flex items-center gap-5 sm:gap-10">
        <NavList />
      </ul>
    </nav>
  );
}
