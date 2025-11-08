import Carousel from "@/app/_components/Carousel";
import HomePanel from "@/app/_components/HomePage/HomePanel";
import WomenPanel from "@/app/_components/HomePage/WomenPanel";
import MenPanel from "@/app/_components/HomePage/MenPanel";
import KidsPanel from "@/app/_components/HomePage/KidsPanel";

import dynamic from "next/dynamic";
const Women = dynamic(() => import("@/app/_components/Women"));
const Men = dynamic(() => import("@/app/_components/Men"));
const Kids = dynamic(() => import("@/app/_components/Kids"));

const sliders = ["women", "men", "kids"];
const slideComponents = [Women, Men, Kids];

export default function Page() {
  return (
    <>
      <HomePanel
        panels={{
          "/": <WomenPanel />,
          "/men": <MenPanel />,
          "/kids": <KidsPanel />,
        }}
      />
      <main className="absolute top-0 left-0 h-full w-full">
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
      </main>
    </>
  );
}
