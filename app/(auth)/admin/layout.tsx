import bg from "@/public/bg/bg-auth.jpg";
import Image from "next/image";

export const metadata = {
  title: {
    template: "%s | Black & Moon",
    default: "Auth | Black & Moon",
  },
};

export default function AdminAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <div className="absolute top-0 left-0 h-screen w-screen bg-gray-950">
        <Image
          src={bg}
          fill
          placeholder="blur"
          quality={100}
          alt="Login background Image"
          className="object-cover opacity-75 blur-[1px]"
        />
      </div>

      {/* Form */}
      <main className="relative mx-auto w-full max-w-7xl">{children}</main>
    </div>
  );
}
