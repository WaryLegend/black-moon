"use client";

import Spinner from "@/components/ui/Spinner";

import ShippingProfileItem from "./ShippingProfileItem";
import { useShippingProfiles } from "./useShippingProfiles";

function ShippingProfileList() {
  const { data: profiles, isPending } = useShippingProfiles();

  if (isPending) {
    return (
      <div className="flex items-center justify-center py-6">
        <Spinner type="mini" size={28} color="var(--color-accent-600)" />
      </div>
    );
  }

  if (!profiles || profiles.length === 0) {
    return (
      <p className="text-center text-gray-600">Bạn chưa có địa chỉ nào.</p>
    );
  }

  return (
    <div className="space-y-4">
      {profiles.map((profile) => (
        <ShippingProfileItem key={profile.id} profile={profile} />
      ))}
    </div>
  );
}

export default ShippingProfileList;
