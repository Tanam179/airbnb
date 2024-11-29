'use client';

import { useRef, useState } from "react";
import DropdownContext from "@/_contexts/DropdownContext";
import OpenButton from "./OpenButton";
import Menus from "./Menus";
import Option from "./Option";

const Dropdown = ({ children }: { children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [coord, setCoord] = useState({});
    const buttonRef = useRef(null);

    return (
        <DropdownContext.Provider value={{ isOpen, setIsOpen, coord, setCoord, buttonRef }}>
            { children }
        </DropdownContext.Provider>
    );
};

Dropdown.OpenButton = OpenButton;
Dropdown.Menus = Menus;
Dropdown.Option = Option;

export default Dropdown;