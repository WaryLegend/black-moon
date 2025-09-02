import Header from "@/app/_components/Header";
import HomePanel from "@/app/_components/HomePanel";

export const metadata = {
  title: {
    template: "%s | Black & Moon", // %s where child-page tilte replace
    default: "Welcome | Black & Moon", // default --> page without title
  },
  description:
    "Black & Moon is a modern fashion brand offering stylish, high-quality clothing. Discover the latest collections of shirts, dresses, pants, and accessories for men, women and kids.",
};

export default function RootLayout({ children }) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      <HomePanel />

      <main className="absolute top-0 left-0 h-full w-full">{children}</main>
    </div>
  );
}
