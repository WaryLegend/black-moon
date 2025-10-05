"use client";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useState } from "react";
import Button from "@/app/_components/Button";

function QuantityInput({ name, defaultValue = 0 }) {
  const [value, setValue] = useState(defaultValue);

  return (
    <div>
      <div className="bg-primary-100 inline-flex items-center rounded-full px-4 py-2">
        <Button
          icon
          disabled={value <= 1}
          onClick={() => setValue((v) => Math.max(1, v - 1))}
          className="hover:text-accent-700 p-3 disabled:opacity-50"
          type="button"
        >
          <FaMinus className="h-3 w-3 transition-all" />
        </Button>
        <span className="px-4 text-center text-lg font-medium">{value}</span>
        <Button
          icon
          // disabled={value >= maxQuanity}
          onClick={() => setValue((v) => v + 1)}
          className="hover:text-accent-700 p-3 disabled:opacity-50"
          type="button"
        >
          <FaPlus className="h-3 w-3 transition-all" />
        </Button>

        {/* hidden input to send value*/}
        <input type="hidden" name={name} value={value} />
      </div>
    </div>
  );
}

export default QuantityInput;
