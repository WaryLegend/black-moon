import Link from "next/link";
import { MdOutlineShoppingCart, MdShoppingCart } from "react-icons/md";

function Cart() {
  const length = 2; // test

  return (
    <Link
      href="/cart"
      className="group hover:text-accent-700 relative flex items-center justify-center p-1"
    >
      <MdOutlineShoppingCart className="h-5 w-5 group-hover:hidden" />
      <MdShoppingCart className="hidden h-5 w-5 group-hover:block" />
      {length > 0 && (
        <span className="absolute top-0 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
          {length}
        </span>
      )}
    </Link>
  );
}

export default Cart;
