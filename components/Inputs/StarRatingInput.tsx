import { useState, MouseEvent } from "react";
import { Star } from "lucide-react";

type StarRatingProps = {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
};

export function StarRatingInput({
  value,
  onChange,
  disabled = false,
}: StarRatingProps) {
  const [hover, setHover] = useState<number | null>(null);

  const handleClick = (e: MouseEvent<HTMLButtonElement>, starValue: number) => {
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - left;
    const isHalf = clickX < width / 2;
    onChange(isHalf ? starValue - 0.5 : starValue);
  };

  const handleMouseMove = (
    e: MouseEvent<HTMLButtonElement>,
    starValue: number
  ) => {
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const moveX = e.clientX - left;
    const isHalf = moveX < width / 2;
    setHover(isHalf ? starValue - 0.5 : starValue);
  };

  const displayValue = hover ?? value;

  return (
    <div className="flex items-center space-x-1">
      {Array.from({ length: 5 }, (_, i) => {
        const starValue = i + 1;
        const isFilled = displayValue >= starValue;
        const isHalf = !isFilled && displayValue + 0.5 >= starValue;

        return (
          <button
            type="button"
            key={starValue}
            disabled={disabled}
            onClick={(e) => handleClick(e, starValue)}
            onMouseMove={(e) => handleMouseMove(e, starValue)}
            onMouseLeave={() => setHover(null)}
            className="relative focus:outline-none w-6 h-6"
          >
            {/* Filled / Half star */}
            <Star
              className={`absolute top-0 left-0 h-6 w-6 ${
                isFilled
                  ? "fill-yellow-400 text-yellow-400"
                  : isHalf
                    ? "fill-yellow-400 text-yellow-400 [clip-path:inset(0_50%_0_0)]"
                    : "text-gray-300"
              }`}
            />
            {/* Outline star */}
            <Star className="h-6 w-6 text-gray-300" />
          </button>
        );
      })}
    </div>
  );
}
