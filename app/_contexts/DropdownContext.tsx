import { createContext } from "react";

interface IDropdownContext {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    coord: {[props: string]: number} | null,
    setCoord: React.Dispatch<React.SetStateAction<{[props: string]: number}>>
    buttonRef: React.RefObject<HTMLElement> | null;
}

const DropdownContext = createContext<IDropdownContext>({
    isOpen: false,
    setIsOpen: () => {},
    coord: null,
    setCoord: () => {},
    buttonRef: null,
});

export default DropdownContext;