import Image from "next/image";
import bg from "@/public/bg/bg-women.jpg";

export default function Women() {
  return (
    <section className="absolute top-0 left-0 flex h-screen w-screen flex-col items-center justify-center bg-gray-600 transition-all">
      <Image
        src={bg}
        fill
        placeholder="blur"
        quality={80}
        alt="Women-section-image"
        className="pointer-events-none object-cover opacity-80"
      />

      <div className="from-primary-400/40 absolute inset-0 bg-gradient-to-tr via-transparent to-transparent" />

      <div className="absolute bottom-15 left-10 max-w-xl md:bottom-16 md:left-15 lg:left-30">
        <h1 className="text-primary-900 mb-4 text-4xl font-bold tracking-tight drop-shadow-2xl sm:text-5xl md:text-6xl">
          Black & Moon
          <br />
          <span
            className="text-3xl font-medium text-rose-200 sm:text-4xl"
            style={{
              WebkitTextStroke: "1px", // viền chữ
              WebkitTextFillColor: "transparent", // chữ rỗng
            }}
          >
            Women’s Collection
          </span>
        </h1>
        <p className="text-primary-800 text-lg leading-relaxed drop-shadow-lg sm:text-xl">
          Tinh tế trong từng đường nét – sức mạnh của sự quyến rũ.
        </p>
      </div>
    </section>
  );
}
