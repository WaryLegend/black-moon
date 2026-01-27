import NavList from "@/common/navigation/NavList";

export default function Navigation() {
  return (
    <nav className="z-10 order-3 text-lg font-semibold max-md:w-full sm:text-xl md:absolute md:left-1/2 md:order-2 md:block md:-translate-x-1/2">
      <NavList />
    </nav>
  );
}
