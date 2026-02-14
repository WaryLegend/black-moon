import { useCartStore } from "@/contexts/CartStore";
import CheckItem from "./CheckItem";

function CheckItemList() {
  const { items } = useCartStore();

  return (
    <ul className="divide-primary-300 flex max-h-96 flex-col divide-y overflow-y-auto rounded-lg">
      {items.map((item) => (
        <CheckItem key={item.id} item={item} />
      ))}
    </ul>
  );
}

export default CheckItemList;
