import { useState } from "react";
import Button from "./Button";
import Window from "./Window";
import AuthModalContext from "@/_contexts/AuthModalContext";

const AuthModal = ({ children }: { children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState(['login', 'verify-otp']);
    const [option, setOption] = useState('phone');
    const [userInfo, setUserInfo] = useState('');
    const [phoneCode, setPhoneCode] = useState('+84');

    return (
        <AuthModalContext.Provider value={{ isOpen, setIsOpen, step, setStep, option, setOption, userInfo, setUserInfo, phoneCode, setPhoneCode }}>
            { children }
        </AuthModalContext.Provider>
    );
};

AuthModal.Button = Button;
AuthModal.Window = Window

export default AuthModal;