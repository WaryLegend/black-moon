import Header from "@/app/_components/Header";
import Navigation from "@/app/_components/Navigation";
import LogoLink from "@/app/_components/LogoLink";
import User from "@/app/_components/User";
import SideNav from "@/app/_components/SideNav";
import Cart from "@/app/_components/Cart";
import Wishlist from "@/app/_components/Wishlist";
import CartProvider from "@/app/_context/CartProvider";

export const metadata = {
  title: "Welcome | Black & Moon",
  description:
    "Black & Moon is a modern fashion brand offering stylish, high-quality clothing. Discover the latest collections of shirts, dresses, pants, and accessories for men, women and kids.",
};

//test
// const cartItems = [
//   {
//     id: 1,
//     name: "Quần Ni Dry Túi Hộp",
//     color: "03 GRAY",
//     size: "Trẻ em 4-5Y(110)",
//     price: 391000,
//     quantity: 1,
//     image: "/t-shirt.jpg",
//     isNew: false,
//     sale: 5,
//   },
//   {
//     id: 2,
//     name: "Túi Bán Nguyệt Mini Đeo Chéo",
//     color: "09 BLACK",
//     size: "Trẻ em No Control",
//     price: 293000,
//     quantity: 5,
//     image: "/t-shirt.jpg",
//     isNew: false,
//     sale: null,
//   },
//   {
//     id: 3,
//     name: "Túi Bán Nguyệt Mini Đeo Chéo",
//     color: "09 BLACK",
//     size: "Trẻ em No Control",
//     price: 293000,
//     quantity: 1,
//     image: "/t-shirt.jpg",
//     isNew: true,
//     sale: null,
//   },
//   {
//     id: 4,
//     name: "Túi Bán Nguyệt Mini Đeo Chéo",
//     color: "09 BLACK",
//     size: "Trẻ em No Control",
//     price: 293000,
//     quantity: 3,
//     image: "/t-shirt.jpg",
//     isNew: false,
//     sale: 10,
//   },
// ];

export default function HomeLayout({ children }) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header>
        <LogoLink />
        <Navigation />
        <div className="flex items-center gap-2.5 sm:gap-4">
          <Wishlist />
          <CartProvider>
            <Cart />
          </CartProvider>
          <User />
          <SideNav />
        </div>
      </Header>

      {children}
    </div>
  );
}
