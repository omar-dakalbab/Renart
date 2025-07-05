import React, { FC, memo } from "react";
import { Star } from "lucide-react";

const HalfStar: FC = () => (
    <div className="relative w-4 h-4">
        <Star className="absolute top-0 left-0 w-4 h-4 text-[#D9D9D9]" fill="currentColor" />
        <Star
            className="absolute top-0 left-0 w-4 h-4 text-[#E6CA97]"
            fill="currentColor"
            style={{ clipPath: "polygon(0 0, 50% 0, 50% 100%, 0% 100%)" }}
        />
    </div>
);

const Rating: FC<{ rating?: number }> = memo(({ rating = 0 }) => {
    const fullStars = Math.floor(rating);
    const hasHalf = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

    return (
        <div className="flex items-center">
            {Array.from({ length: fullStars }).map((_, i) => (
                <Star
                    key={`full-${i}`}
                    className="w-4 h-4 text-[#E6CA97]"
                    fill="currentColor"
                />
            ))}
            {hasHalf && <HalfStar key="half" />}
            {Array.from({ length: emptyStars }).map((_, i) => (
                <Star
                    key={`empty-${i}`}
                    className="w-4 h-4 text-[#D9D9D9]"
                    fill="currentColor"
                />
            ))}
            <span className="ml-2 text-[14px] font-avenir font-book text-gray-700">
                {rating.toFixed(1)} / 5
            </span>
        </div>
    );
});

export default Rating;
