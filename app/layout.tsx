import { Josefin_Sans } from "next/font/google";
const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";
import { WebSocketProvider } from "@/contexts/websocket.context";
import ThemeInitializer from "@/contexts/ThemeInitializer";
import QueryProvider from "@/contexts/QueryClientProvider";
import HydrateToken from "@/contexts/HydrateToken";
import OverlayScreenLoader from "@/components/ui/OverlayScreenLoader";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body
        className={`${josefin.className} text-primary-900 bg-primary-50 h-screen antialiased`}
      >
        <ThemeInitializer />
        <HydrateToken />
        <QueryProvider>
          <WebSocketProvider>{children}</WebSocketProvider>
          <OverlayScreenLoader />
        </QueryProvider>
        <Toaster
          position="bottom-center"
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 4000,
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
