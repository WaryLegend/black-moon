import { Josefin_Sans } from "next/font/google";
const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

import "@/app/_styles/globals.css";
import { Toaster } from "react-hot-toast";

export default async function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body className={`${josefin.className} text-primary-900 antialiased`}>
        {children}
        <Toaster position="bottom-center" />
      </body>
    </html>
  );
}
