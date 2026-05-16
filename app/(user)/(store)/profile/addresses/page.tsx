import AddShippingProfile from "@/components/user-menu/shipping-profile/AddShippingProfile";
import ShippingProfileList from "@/components/user-menu/shipping-profile/ShippingProfileList";

export default function ShippingProfilePage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-2xl font-bold">Địa chỉ giao hàng</h2>
        <AddShippingProfile />
      </div>
      <ShippingProfileList />
    </div>
  );
}
