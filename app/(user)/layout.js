import ChatBot from "@/app/_components/ChatBot";
import CartInitializer from "@/app/_context/CartInitializer";
import WishListInitializer from "@/app/_context/WishListInitializer";

export default async function UserLayout({ children }) {
  const user = null;
  const serverCart = user ? await getCartByUserId(user.id) : null;
  const serverWishList = user ? await getWishListByUserId(user.id) : null;
  return (
    <>
      <CartInitializer user={user} cart={serverCart} />
      <WishListInitializer user={user} wishlist={serverWishList} />
      {children}
      <ChatBot />
    </>
  );
}
