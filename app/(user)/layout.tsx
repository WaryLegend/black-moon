import ChatBot from "@/components/ui/ChatBot";
import CartInitializer from "@/contexts/CartInitializer";

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = null;
  const serverCart = null;
  return (
    <>
      <CartInitializer user={user} cart={serverCart} />
      {children}
      <ChatBot />
    </>
  );
}
