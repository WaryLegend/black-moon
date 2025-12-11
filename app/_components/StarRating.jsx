"use client";

import { useState } from "react";
import FractionalStar from "@/app/_components/FractionalStar";
import { STAR_LENGTH } from "@/app/_utils/constants";

export default function StarRating({ onChange }) {
  const [rating, setRating] = useState(0); // Mặc định 0
  const [hover, setHover] = useState(0);

  const handleClick = (value) => {
    setRating(value);
    if (onChange) onChange(value);
  };

  return (
    <div className="flex items-center">
      {Array.from({ length: STAR_LENGTH }).map((_, index) => {
        const currentValue = hover || rating;
        const fill = currentValue > index ? 100 : 0; // Fill đầy (100%) hoặc rỗng (0%)

        return (
          <div
            key={index}
            className="cursor-pointer"
            onMouseEnter={() => setHover(index + 1)}
            onMouseLeave={() => setHover(0)}
            onClick={() => handleClick(index + 1)}
          >
            <FractionalStar
              fillPercent={fill}
              className="text-accent-500 mx-1 transition-all"
              size={24}
            />
          </div>
        );
      })}
      <span className="text-primary-700 ml-2 text-lg font-medium">
        {hover || rating}/5
      </span>
    </div>
  );
}
