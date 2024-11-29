/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

const Select = ({setIsOneFieldFocus, defaultValue, label, options, onChange } : {setIsOneFieldFocus?: any, defaultValue: string, label: string, options: Array<{ name: string, code: string }>, onChange: any }) => {
    const [isFocus, setIsFocus] = useState(false);
    const handleFocus = () => {
        setIsFocus(true);
        setIsOneFieldFocus(true);
    };
    const handleBlur = () => {
        setIsFocus(false);
        setIsOneFieldFocus(false);
    };

    return (
        <div className={`custom-select relative h-[60px] ${isFocus ? 'z-10' : 'z-0'}`} >
            <div className={`absolute top-0 left-0 right-0 bottom-0 rounded-lg border-2 ${ isFocus ? 'border-[#222] ' : 'border-transparent' }`}></div>
            <label htmlFor="" className="absolute inset-0 z-10">
                <div className=" font-normal text-[#6A6A6A] text-sm absolute top-[8px] left-[11px]">
                    <span>{label}</span>
                </div>
                <select onChange={(e: any) => onChange(e)} onFocus={handleFocus} onBlur={handleBlur} className="border-none outline-none absolute top-0 p-[26px_36px_10px_12px] bg-transparent h-full w-full appearance-none rounded-lg" defaultValue={defaultValue}>
                    {options.map((el) => (
                        <option
                            key={el.name}
                            value={el.code}
                        >
                            {el.name} ({el.code})
                        </option>
                    ))}
                </select>
            </label>
            <div className="absolute top-1/2 right-3 -translate-y-1/2 z-1">
                <svg
                    style={{ display: "block", fill: "none", height: "16px", width: "16px", stroke: "currentcolor", strokeWidth: 4, overflow: "visible" }}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    aria-hidden="true"
                    role="presentation"
                    focusable="false"
                >
                    <path
                        fill="none"
                        d="M28 12 16.7 23.3a1 1 0 0 1-1.4 0L4 12"
                    ></path>
                </svg>
            </div>
            <div className={`custom-border absolute inset-0 border border-[#808080] -z-10`}></div>
        </div>
    );
};

export default Select;