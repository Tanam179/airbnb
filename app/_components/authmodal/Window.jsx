/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
"use client";

import React, { useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";

import AuthModalContext from "@/_contexts/AuthModalContext";
import FormWrapper from "../authform/FormWrapper";

const Window = () => {
    const { isOpen, setIsOpen, step , setStep } = useContext(AuthModalContext);
    const [isClient, setIsClient] = useState(false);

    const handleCloseModal = () => {
        if(step === 'default') {
            setIsOpen(false);
        } else {
            setStep('default');
        }
    };

    useEffect(() => {
        setIsClient(true); // Set to true khi ở client-side
    }, []);

    useEffect(() => {
        if (isOpen) {
            // Disable scroll by adding the class
            document.body.classList.add("overflow-hidden");
        } else {
            // Enable scroll by removing the class
            document.body.classList.remove("overflow-hidden");
        }

        // Clean up: ensure scroll is re-enabled if modal closes
        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, [isOpen]);

    if (!isClient) {
        return null; // Chỉ render khi đang ở client-side
    }
    return createPortal(
        <CSSTransition
            in={isOpen}
            timeout={200}
            classNames="zoom"
            unmountOnExit
        >
            <div className="absolute inset-0 backdrop-blur-sm z-40 flex items-center justify-center">
                <div className="overlay absolute inset-0 z-0 bg-[rgba(0,0,0,0.3)]"></div>
                <FormWrapper/>
            </div>
        </CSSTransition>,
        document.body
    );
};

export default Window;
