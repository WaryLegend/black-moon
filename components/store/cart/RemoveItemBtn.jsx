import { useCartStore } from "@/context/CartStore";
import { HiXMark } from "react-icons/hi2";
import Button from "@/components/ui/Button";

function RemoveItemBtn({ id }) {
  const { removeItem } = useCartStore();

  return (
    <Button
      aria-label="Remove item"
      icon
      className="hover:text-accent-700 rounded-full font-bold"
      onClick={() => removeItem(id)}
    >
      <HiXMark className="h-6 w-6" />
    </Button>
  );
}

export default RemoveItemBtn;
