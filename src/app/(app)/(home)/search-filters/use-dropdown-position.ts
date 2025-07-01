import { RefObject } from 'react';

export const useDropdownPosition = (
    ref: RefObject<HTMLDivElement | null> | RefObject<HTMLButtonElement>
) => {
    const getDropdownPosition = () => {
        if (!ref.current) return { top: 0, left: 0 };

        const rect = ref.current.getBoundingClientRect();
        const dropdownWidth = 240; // Width of the dropdown (w-60 = 15rem = 240px)

        // Calculate the initial position of the dropdown
        let top = rect.bottom + window.scrollY; // Position below the button
        let left = rect.left + window.scrollX; // Align with the left edge of the button

        // Check if the dropdown goes beyond the right edge of the viewport
        if (left + dropdownWidth > window.innerWidth) {
            // If it does, align it to the right edge of the button
            left = rect.right - dropdownWidth + window.scrollX;

            // If it still goes beyond the viewport, adjust to fit
            if (left < 0) {
                left = window.innerWidth - dropdownWidth - 16; // 16px for padding
            }
        }

        // Check if the dropdown goes beyond the left edge of the viewport
        if (left < 0) {
            // If it does, align it to the left edge of the viewport
            left = 16; // 16px for padding
        }

        return { top, left };
    };
    
    return { getDropdownPosition };
};