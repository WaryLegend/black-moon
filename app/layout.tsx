import { Josefin_Sans } from "next/font/google";
const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";
import ThemeInitializer from "@/context/ThemeInitializer";
import SettingInitializer from "@/context/SettingInitializer";
import { getSettings } from "@/lib/apiSettings";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
