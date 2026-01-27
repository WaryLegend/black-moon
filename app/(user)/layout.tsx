import ChatBot from "@/components/ui/ChatBot";
import CartInitializer from "@/context/CartInitializer";
import WishListInitializer from "@/context/WishListInitializer";

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = null;
  const serverCart = null;
  const serverWishList = null;
  return (
    <>
      <CartInitializer user={user} cart={serverCart} />
      <WishListInitializer user={user} wishlist={serverWishList} />
      {children}
      <ChatBot />
    </>
  );
}
