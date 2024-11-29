import AuthModalContext from "@/_contexts/AuthModalContext";
import { useContext } from "react";
import LoginWithPhone from "./LoginWithPhone";
import LoginWithEmail from "./LoginWithEmail";


const FormWrapper = () => {
    const { option } = useContext(AuthModalContext);

    return (
        option === 'phone' ? <LoginWithPhone /> : <LoginWithEmail /> 
    )
    
};

export default FormWrapper;