import React, { FC, memo } from 'react'
import ColorSwatch from './ColorSwatch'


const ColorPalette: FC<{ colors?: string[] }> = memo(({ colors = [] }) => {
    if (colors.length === 0) return null
    return (
        <div className="flex items-center mb-4">
            <span className="mr-2 text-sm font-medium text-gray-700">Colors:</span>
            <div className="flex space-x-2">
                {colors.map((c, i) => (
                    <ColorSwatch key={i} color={c} onClick={function (): void {
                        throw new Error('Function not implemented.')
                    }} isActive={false} />
                ))}
            </div>
        </div>
    )
})

export default ColorPalette