import WishItem from "@/app/_components/CWishlistPage/WishItem";

function WishList({ items: wishItems }) {
  return (
    <ul className="divide-primary-300 flex flex-col divide-y">
      {wishItems.map((item) => (
        <WishItem key={item.id} item={item} />
      ))}
    </ul>
  );
}

export default WishList;
