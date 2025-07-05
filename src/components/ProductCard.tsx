import React, { FC, memo, useState } from 'react'
import Rating from './Rating';
import ColorSwatch from './ColorSwatch';

interface ProductCardProps {
    images: Record<string, string>;
    title: string;
    price: number | string;
    currency?: string;
    colors?: { name?: string; color: string }[];
    rating?: number;
}

const ProductCard: FC<ProductCardProps> = memo(({
    images,
    title,
    price,
    currency = '$',
    colors = [],
    rating = 0,
}) => {
    const colorKeys = Object.keys(images)
    const [currentIndex, setCurrentIndex] = useState(0)
    const name = colors[currentIndex].name || 'Default Color'

    return (
        <div className="max-w-xs bg-white overflow-hidden group">
            <div className="relative">
                <img
                    src={images[colorKeys[currentIndex]]}
                    alt={`${title} in ${colorKeys[currentIndex]}`}
                    className="w-60 h-60 object-cover rounded-xl"
                />
            </div>
            <div className="px-1 py-3 space-y-2">
                <h3 className="text-[15px] text-gray-800 font-montserrat font-medium">{title}</h3>
                <div className='flex items-center space-x-1 mb-3'>
                    <p className="text-[15px] font-montserrat font-regular text-gray-900">
                        {new Intl.NumberFormat(undefined, {
                            style: 'currency',
                            currency,
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        }).format(Number(price))}
                    </p>
                    <p className='text-[15px] font-montserrat font-regular text-gray-900'>{currency}</p>
                </div>
                <div className="flex items-center space-x-2 mt-4">
                    {colors.map((c, idx) => (
                        <ColorSwatch
                            key={idx}
                            color={c.color}
                            onClick={() => setCurrentIndex(idx)}
                            isActive={idx === currentIndex}
                        />
                    ))}
                </div>
                <p className="mt-2 text-[12px] font-avenir font-[book] text-gray-600">{name}</p>
                <Rating rating={rating} />
            </div>
        </div>
    )
})

export default ProductCard
