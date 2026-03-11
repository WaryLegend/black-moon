import Image from "next/image";
import bg from "@/public/bg/bg-kids.jpg";

export default function Kids() {
  return (
    <div className="absolute top-0 left-0 flex h-screen w-screen flex-col items-center justify-center bg-gray-600 transition-all">
      <Image
        src={bg}
        fill
        placeholder="blur"
        quality={90}
        alt="Kids-section-image"
        className="pointer-events-none object-cover opacity-80"
      />

      <div className="from-primary-400/40 absolute inset-0" />

      <div className="absolute top-1/5 left-1/2 -translate-x-1/2 text-center">
        <h1 className="text-primary-900 mb-6 text-5xl font-bold tracking-tight drop-shadow-2xl sm:text-6xl md:text-7xl">
          Black & Moon
          <span
            className="block text-3xl font-extrabold text-yellow-300 sm:text-4xl"
            style={{
              WebkitTextStroke: "1px", // viền chữ
              WebkitTextFillColor: "transparent", // chữ rỗng
            }}
          >
            Kids Adventure
          </span>
        </h1>
        <p className="text-primary-800 mx-auto max-w-2xl text-lg font-medium drop-shadow-lg sm:text-xl">
          Mọi ngày đều là một cuộc phiêu&nbsp;lưu – thoải&nbsp;mái, bền&nbsp;bỉ
          và thật phong&nbsp;cách!
        </p>

        {/* Thêm chút icon vui vui (tùy chọn) */}
        <div className="mt-8 flex justify-center gap-4">
          <span className="text-4xl">✨</span>
          <span className="text-4xl">🚀</span>
          <span className="text-4xl">🌟</span>
        </div>
      </div>
    </div>
  );
}
