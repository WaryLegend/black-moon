import Women from "@/app/_components/Women";
import Men from "@/app/_components/Men";
import Kids from "@/app/_components/Kids";
import Carousel from "@/app/_components/Carousel";

const sliders = ["women", "men", "kids"];

const slideComponents = [Women, Men, Kids];

export default function Page() {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <Carousel sliders={sliders}>
        {slideComponents.map((Component, index) => (
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
