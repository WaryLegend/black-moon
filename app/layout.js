import { Josefin_Sans } from "next/font/google";
const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

import "@/app/_styles/globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${josefin.className} text-primary-900 antialiased`}>
        {children}
      </body>
    </html>
  );
}
