import CartItem from "@/app/_components/CCartPage/CartItem";

function CartList({ cartItems }) {
  return (
    <ul className="divide-primary-300 flex flex-col divide-y">
      {cartItems.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
    </ul>
  );
}

export default CartList;
