import NavList from "@/app/_components/NavList";

export default function Navigation() {
  return (
    <nav className="z-10 order-3 text-lg font-semibold max-md:w-full sm:text-xl md:order-2 md:block">
      <ul className="flex items-center justify-evenly md:justify-normal md:gap-8 lg:gap-15">
        <NavList />
      </ul>
    </nav>
  );
}
