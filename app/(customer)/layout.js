// This pulls the "Josefin Sans" or others font from Google Fonts via Next.js. No need <link> or <head>.
import { Josefin_Sans } from "next/font/google";
const josefin = Josefin_Sans({
  subsets: ["latin"], // language styles. Ex: "vietnamese" --> "Chào buổi sáng"
  display: "swap", // browser will use a fallback system font immediately, then “swap” in Josefin Sans once it’s downloaded.
});

import "@/app/_styles/globals.css";
import Header from "@/app/_components/Header";

export const metadata = {
  title: {
    template: "%s | Black & Moon", // %s where child-page tilte replace
    default: "Welcome | Black & Moon", // default --> page without title
  },
  description:
    "Black & Moon is a modern fashion brand offering stylish, high-quality clothing. Discover the latest collections of shirts, dresses, pants, and accessories for men and women.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${josefin.className} bg-primary-50 text-primary-900 relative flex min-h-screen flex-col antialiased`}
      >
        <Header />

        <div className="border-primary-200 flex-1 border-t-2 px-8 py-1">
          <main className="mx-auto w-full max-w-7xl">{children}</main>
        </div>
      </body>
    </html>
  );
}
