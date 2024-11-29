/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { useContext, useEffect } from "react";
import { createPortal } from "react-dom";
import DropdownContext from "@/_contexts/DropdownContext";

const Menus = ({ children }: { children: React.ReactNode }) => {
    const { isOpen, coord, setIsOpen, buttonRef } = useContext(DropdownContext);

    useEffect(() => {
        document.addEventListener("click", (e: MouseEvent) => {
            if (e.target instanceof HTMLElement) {
                if (
                    buttonRef?.current &&
                    !buttonRef.current.contains(e.target)
                ) {
                    setIsOpen(false);
                }
            }
        });
    }, [setIsOpen, buttonRef]);


    if (isOpen === true) {
        return createPortal(
            <div
                className="z-10 absolute bg-white shadow-[0_0px_15px_-3px_rgb(0,0,0,0.3)] rounded-xl w-60 text-sm"
                style={{
                    top: `${coord?.top! + coord?.height! + 10}px`,
                    left: `${ coord?.right! - 240}px`,
                }}
            >
                {children}
            </div>,
            document.body
        );
    }
};

export default Menus;
