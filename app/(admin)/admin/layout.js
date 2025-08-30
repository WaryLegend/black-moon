import { Josefin_Sans } from "next/font/google";
const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

import "@/app/_styles/globals.css";
import AdHeaderSideNav from "@/app/_components/AdHeaderSideNav";

export const metadata = {
  title: {
    template: "Admin | %s | Black & Moon",
    default: "Admin | Black & Moon",
  },
};

export default function AdminLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${josefin.className} text-primary-900 min-h-screen antialiased`}
      >
        <div className="grid h-screen grid-cols-[auto_1fr] grid-rows-[auto_1fr]">
          <AdHeaderSideNav />
          <div className="bg-primary-100 flex-1 overflow-auto px-8 py-12">
            <main className="mx-auto flex w-full max-w-7xl flex-col gap-8">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
