import DropdownContext from "@/_contexts/DropdownContext";
import React, { useContext, useEffect } from "react";

const OpenButton = ({ children }: { children: React.ReactNode }) => {
    const { setIsOpen, setCoord, buttonRef } = useContext(DropdownContext);

    useEffect(() => {
        const updateCoord = () => {
            if (buttonRef?.current) {
                const rect = buttonRef.current.getBoundingClientRect();
                setCoord({
                    top: rect.top,
                    left: rect.left,
                    right: rect.right,
                    bottom: rect.bottom,
                    x: rect.x,
                    y: rect.y,
                    width: rect.width,
                    height: rect.height,
                });
            }
        };
    
        // Cập nhật vị trí ngay khi component mount
        updateCoord();
    
        // Thêm event listener
        window.addEventListener("resize", updateCoord);
    
        // Gỡ bỏ event listener khi component unmount
        return () => {
            window.removeEventListener("resize", updateCoord);
        };
    }, [setCoord, buttonRef]);

    const handleToggeDropdown = function () {
        setIsOpen((prev) => !prev);
    };

    const cloneEl = React.cloneElement(children as React.ReactElement, {
        onClick: handleToggeDropdown,
        ref: buttonRef,
    });

    return cloneEl;
};

export default OpenButton;
