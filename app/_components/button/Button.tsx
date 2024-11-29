import ThreeDotsLoading from "../loading/ThreeDotsLoading";

interface IButton {
    type?: 'submit' | 'reset' | 'button' | undefined;
    label: string;
    onClick?: () => void;
    disabled?: boolean;
    outline?: boolean;
    small?: boolean;
    icon?: React.ComponentType; // Add support for icons in the future. For now, we'll just accept a React element.  // This could be a FontAwesome icon, a custom SVG, or even a simple text icon.  // If you want to use icons, make sure to install the necessary package (e.g., @fortawesome/fontawesome-svg-core, @fortawesome/free-solid-svg-icons, etc.) and import the desired icon.  // You
}

const Button = ({ type='button', label, onClick, disabled, outline, small, icon: Icon }: IButton) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`  relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition-all block w-full text-center
                ${ outline ? "bg-white border border-black text-black" : "bg-rose-500 border-rose-500 text-white" }
                ${ small ? "py-1 text-sm font-normal border-[1px] leading-4" : "h-[48px] text-[15px] font-semibold " }
                ${ disabled && "bg-[#696969]"}
            `}
        >
            <div className="absolute left-6 top-1/2 -translate-y-1/2">
                { Icon && <Icon />  }
            </div>
            { disabled ? <ThreeDotsLoading/> : label}
        </button>
    );
};

export default Button;
