import Carousel from "@/components/home/Carousel";
import HomePanel from "@/components/home/HomePanel";
import WomenPanel from "@/components/home/WomenPanel";
import MenPanel from "@/components/home/MenPanel";
import KidsPanel from "@/components/home/KidsPanel";

import dynamic from "next/dynamic";
const Women = dynamic(() => import("@/components/home/Women"));
const Men = dynamic(() => import("@/components/home/Men"));
const Kids = dynamic(() => import("@/components/home/Kids"));

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
