import Women from "@/app/_components/Women";
import Men from "@/app/_components/Men";
import Kids from "@/app/_components/Kids";
import Carousel from "@/app/_components/Carousel";

const pages = [
  { route: "women", component: Women },
  { route: "men", component: Men },
  { route: "kids", component: Kids },
];

const routes = pages.map((c) => c.route);

export default function CategoryPage() {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <Carousel routes={routes}>
        {pages.map(({ component: Component }, index) => (
          <div
            key={index}
            className="relative h-full min-w-full px-10 py-10 pt-20"
          >
            <Component />
          </div>
        ))}
      </Carousel>
    </div>
  );
}
