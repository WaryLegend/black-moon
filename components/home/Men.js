import Image from "next/image";
import bg from "@/public/bg/bg-men.jpg";

export default function Men() {
  return (
    <section className="absolute top-0 left-0 flex h-screen w-screen flex-col items-center justify-center bg-gray-600 transition-all">
      <Image
        src={bg}
        fill
        placeholder="blur"
        quality={90}
        alt="Men-section-image"
        className="pointer-events-none object-cover opacity-80"
      />

      <div className="from-primary-400/40 absolute inset-0 bg-gradient-to-bl via-transparent to-transparent" />

      <div className="absolute top-1/2 right-8 -translate-y-1/2 text-right md:right-15 lg:right-30">
        <h1 className="text-primary-900 mb-3 text-5xl font-black tracking-wider uppercase drop-shadow-2xl sm:text-6xl md:text-7xl">
          Black
          <br />& Moon
        </h1>
        <p
          className="mt-4 text-2xl font-medium text-blue-300 drop-shadow-lg sm:text-2xl"
          style={{
            WebkitTextStroke: "1px", // viền chữ
            WebkitTextFillColor: "transparent", // chữ rỗng
          }}
        >
          Men’s Collection
        </p>
        <p className="text-primary-800 mt-2 max-w-md text-lg leading-relaxed">
          Sức mạnh nằm ở sự tối giản và phong cách.
        </p>
      </div>
    </section>
  );
}
