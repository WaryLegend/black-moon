import { Josefin_Sans } from "next/font/google";
const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

import "@/app/_styles/globals.css";
import { Toaster } from "react-hot-toast";
import ThemeInitializer from "@/app/_context/ThemeInitializer";
import SettingInitializer from "@/app/_context/SettingInitializer";
import { getSettings } from "@/app/_lib/apiSettings";

export default async function RootLayout({ children }) {
  const settings = await getSettings();

  return (
    <html lang="vi">
      <body className={`${josefin.className} text-primary-900 antialiased`}>
        <ThemeInitializer />
        <SettingInitializer settings={settings} />
        {children}
        <Toaster
          position="bottom-center"
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 6000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-primary-50)",
              color: "var(--color-primary-900)",
            },
          }}
        />
      </body>
    </html>
  );
}
