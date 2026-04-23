"use client";

import { useRouter } from "next/navigation";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";

function InvHeader() {
  const router = useRouter();

  return (
    <div className="flex w-full flex-wrap items-center justify-between gap-3">
      <h1 className="text-3xl font-semibold">Inventory history</h1>
      <button
        className="text-accent-600 hover:text-accent-700 flex items-center gap-1 hover:underline"
        onClick={() => router.back()}
      >
        <MdOutlineKeyboardDoubleArrowLeft className="h-5 w-5" /> Back to
        inventory
      </button>
    </div>
  );
}

export default InvHeader;
