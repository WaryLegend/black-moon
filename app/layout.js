import { Josefin_Sans } from "next/font/google";
const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

import "@/app/_styles/globals.css";
import CartInitializer from "./_context/CartInitializer";
import WishListInitializer from "./_context/WishListInitializer";
import { Toaster } from "react-hot-toast";

export default async function RootLayout({ children }) {
  const user = null;
  const serverCart = user ? await getCartByUserId(user.id) : null;
  const serverWishList = user ? await getWishListByUserId(user.id) : null;

  return (
    <html lang="vi">
      <body className={`${josefin.className} text-primary-900 antialiased`}>
        <CartInitializer user={user} cart={serverCart} />
        <WishListInitializer user={user} wishlist={serverWishList} />
        {children}
        <Toaster position="bottom-center" />
      </body>
    </html>
  );
}
