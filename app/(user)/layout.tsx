import ChatBot from "@/components/ui/ChatBot";
import CartInitializer from "@/components/store/cart/CartInitializer";

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CartInitializer />
      {children}
      <ChatBot />
    </>
  );
}
