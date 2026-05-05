import ChatBot from "@/components/ui/ChatBot";
import CartInitializer from "@/contexts/CartInitializer";

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CartInitializer user={null} cart={null} />
      {children}
      <ChatBot />
    </>
  );
}
