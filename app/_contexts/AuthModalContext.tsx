import { createContext } from "react";

interface IAuthModalContext {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    step: string[];
    setStep: React.Dispatch<React.SetStateAction<string[]>>;
    option: string | null;
    setOption: React.Dispatch<React.SetStateAction<string>>;
    userInfo: string,
    setUserInfo: React.Dispatch<React.SetStateAction<string>>,
    phoneCode: string,
    setPhoneCode: React.Dispatch<React.SetStateAction<string>>,
}

const AuthModalContext = createContext<IAuthModalContext>({
    isOpen: false,
    setIsOpen: () => {},
    step: ['login'],
    setStep: () => {},
    option: "phone",
    setOption: () => {},
    userInfo: '',
    setUserInfo: () => {},
    phoneCode: '',
    setPhoneCode: () => {},
});

export default AuthModalContext;