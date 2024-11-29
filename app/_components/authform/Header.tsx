import AuthModalContext from "@/_contexts/AuthModalContext";
import { useContext } from "react";
import { IconType } from "react-icons";

interface IModalHeader {
    title: string;
    icon: IconType;
    // handleOnClick: () => void | React.Dispatch<React.SetStateAction<number>>;
}

const Header = ({ icon: Icon, title }: IModalHeader) => {
    const { step, setIsOpen, setStep } = useContext(AuthModalContext);

    const handleCloseModal = function () {
        setIsOpen(false);
    }

    const handlePreviousModal = function () {
        setStep(prev => prev.slice(0, -1));
    }

    return (
        <div className="relative">
            <button onClick={step.length === 1 ? handleCloseModal : handlePreviousModal}
                className="w-8 h-8 flex items-center justify-center rounded-full absolute hover:bg-[#f7f7f7] z-40 left-8 top-1/2 -translate-x-1/2 -translate-y-1/2"
            >
                { step.length === 1 ? <Icon size={20}/> : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{display: "block", fill: "none", height: "16px", width: "16px", stroke: "currentcolor", strokeWidth: 3, overflow: "visible"}}><path fill="none" d="M20 28 8.7 16.7a1 1 0 0 1 0-1.4L20 4"></path></svg> }
            </button>
            <div className="border-b border-[#ddd]">
                <h3 className="min-h-[64px] text-base font-bold flex items-center justify-center">
                    { title }
                </h3>
            </div>
        </div>
    );
};

export default Header;
