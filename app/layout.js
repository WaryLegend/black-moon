import { Josefin_Sans } from "next/font/google";
const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

import "@/app/_styles/globals.css";
import CartInitializer from "./_context/CartInitializer";
import WishListInitializer from "./_context/WishListInitializer";

// test
// const mockServerCart = {
//   id: "c_001", //<- the cartId in DB
//   items: [
//     {
//       id: "ci_001",
//       variantId: "1",
//       name: "Áo khoác bomber lót lông",
//       color: "Đen",
//       size: "S",
//       sku: "1-BLACK-S",
//       variantPrice: 799000,
//       quantity: 5,
//       image: "/t-shirt.jpg",
//     },
//     {
//       id: "ci_002",
//       variantId: "2",
//       name: "Áo khoác bomber lót lông",
//       color: "Đen",
//       size: "M",
//       sku: "1-BLACK-M",
//       variantPrice: 799000,
//       quantity: 2,
//       image: "/t-shirt.jpg",
//     },
//     {
//       id: "ci_003",
//       variantId: "4",
//       name: "Áo khoác bomber lót lông",
//       color: "Nâu",
//       size: "S",
//       sku: "1-BROWN-S",
//       variantPrice: 293000,
//       quantity: 2,
//       image: "/t-shirt.jpg",
//     },
//   ],
// };

// const wishItems = [
//   {
//     id: "ci_001",
//     variantId: "1",
//     name: "Áo khoác bomber lót lông",
//     color: "Đen",
//     size: "S",
//     sku: "1-BLACK-S",
//     variantPrice: 799000,
//     image: "/t-shirt.jpg",
//   },
//   {
//     id: "ci_002",
//     variantId: "2",
//     name: "Áo khoác bomber lót lông",
//     color: "Đen",
//     size: "M",
//     sku: "1-BLACK-M",
//     variantPrice: 799000,
//     image: "/t-shirt.jpg",
//   },
//   {
//     id: "ci_003",
//     variantId: "4",
//     name: "Áo khoác bomber lót lông",
//     color: "Nâu",
//     size: "S",
//     sku: "1-BROWN-S",
//     variantPrice: 293000,
//     image: "/t-shirt.jpg",
//   },
// ];

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
      </body>
    </html>
  );
}
