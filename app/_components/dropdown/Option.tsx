import DropdownContext from "@/_contexts/DropdownContext";
import Link from "next/link";
import React, { useContext } from "react";

const Option = ({ href, children, onClick, bolder }: { bolder?: boolean, children: string, href?: string, onClick?: () => void }) => {
    const { setIsOpen } = useContext(DropdownContext);

    if(href) {
        return <Link className={`flex hover:bg-neutral-100 px-4 py-[10px] ${!bolder ? 'font-medium' : 'font-semibold text-black'} transition `} href={href}>{ children }</Link>
    }

    const handleClick = () => {
        if(onClick && typeof onClick === "function") {
            onClick();
        }
        setIsOpen(false);
    }

    return <button className={`flex hover:bg-neutral-100 px-4 py-[10px] w-full ${!bolder ? 'font-medium' : 'font-semibold text-black'} transition`} onClick={handleClick}>{ children }</button> 
};

export default Option;