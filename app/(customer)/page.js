import Image from "next/image";
import Link from "next/link";
import bg from "@/public/bg.jpg";

export default function Home() {
  return (
    <div className="bg-primary-600 absolute top-0 left-0 flex h-screen w-screen flex-col items-center justify-center">
      <Image
        src={bg}
        fill
        placeholder="blur"
        quality={100}
        alt="4 fashion women"
        className="object-cover opacity-65"
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
        <Link
          href="/products"
          className="bg-accent-400 text-primary-800 hover:bg-accent-600 hover:text-primary-200 w-fit rounded-md px-4 py-4 text-lg font-semibold shadow-2xl transition-all duration-300 sm:px-7 sm:py-5 sm:text-xl"
        >
          Khám phá ngay
        </Link>
      </div>
    </div>
  );
}
