// import ModalContext from "@/_contexts/ModalContext";
import AuthModalContext from "@/_contexts/AuthModalContext";
import React, { useContext } from "react";

const Button = ({ children }: { children: React.ReactNode }) => {
    const { setIsOpen } = useContext(AuthModalContext);


    const handleToggelModal = function () {
        setIsOpen((prev) => !prev);
    };

    const cloneEl = React.cloneElement(children as React.ReactElement, {
        onClick: handleToggelModal,
    });

    return cloneEl;
};

export default Button;
