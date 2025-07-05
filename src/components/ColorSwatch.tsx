import React, { FC, memo } from 'react';

const ColorSwatch: FC<{ color: string; onClick: () => void; isActive: boolean }> = memo(({ color, onClick, isActive }) => (
    <button
        onClick={onClick}
        className={`w-4 h-4 rounded-full ${isActive ? 'ring-1 ring-offset-3 #767676' : ''}`}
        style={{ backgroundColor: color }}
        aria-label={`Select color ${color}`}
    />
))

export default ColorSwatch;