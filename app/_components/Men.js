import Image from "next/image";
import bg from "@/public/bg-men.jpg";

export default function Women() {
  return (
    <div className="bg-primary-500 absolute top-0 left-0 flex h-screen w-screen flex-col items-center justify-center">
      <Image
        src={bg}
        fill
        placeholder="blur"
        quality={90}
        alt="Women-section-image"
        className="pointer-events-none object-cover opacity-70"
      />

      <div className="relative flex flex-col items-center gap-10 text-center">
        <div>
          <h1 className="text-primary-50 mb-5 text-[40px] font-bold tracking-tight text-shadow-lg sm:text-5xl">
            Chào mừng đến với Black&nbsp;&&nbsp;Moon
          </h1>
          <p className="text-primary-100 text-lg text-shadow-lg sm:text-2xl">
            Khám phá bộ sưu tập mới mới của chúng tôi!
          </p>
        </div>
      </div>
    </div>
  );
}
