/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState } from 'react';
import { useController } from 'react-hook-form';

const Input = ({ setIsOneFieldFocus, control, name, type="text", id, error, label, isTag = false, isIcon = false, children}: { setIsOneFieldFocus?: React.Dispatch<React.SetStateAction<boolean>>, control: any, name: string, type: string, id: string, error?: boolean, label: string, isTag?: boolean, isIcon?: boolean, children?: React.ReactNode }) => {
    const [isFocus, setIsFocus] = useState(false);
    const handleFocus = () => {
        setIsFocus(true);
        if(setIsOneFieldFocus) {
            setIsOneFieldFocus(true); 
        }
    };
    const handleBlur = () => {
        setIsFocus(false);
        field.onBlur(); 
        if(setIsOneFieldFocus) {
            setIsOneFieldFocus(false);
        }
    };

    
    const { field } = useController({ name, control });
    const inputRef = useRef<HTMLInputElement | null>(null);

    const setRef = (el: HTMLInputElement | null) => {
        inputRef.current = el; // Save the element to inputRef
        field.ref(el); // Pass the element to React Hook Form
    };

    const handleClickFocus = function() {
        if (inputRef.current) {
            inputRef.current.focus(); // Trigger focus
        }        
    }


    return (
        <div onClick={handleClickFocus} className={`${ isFocus ? error ? 'bg-red-50' : 'bg-transparent' : 'bg-transparent'} custom-input ${isTag ? 'have-tag' : ''} ${isIcon ? 'have-icon' : ''} relative h-[60px] ${isFocus ? 'z-10' : 'z-0'}`}>
            <div className={`absolute top-0 left-0 right-0 bottom-0 rounded-lg border-2 ${ isFocus ? error ? 'border-red-500' : 'border-[#222]' : 'border-transparent' } -z-10`}></div>
            <input
                type={type} 
                onFocus={handleFocus} 
                id={id} 
                placeholder=" "
                onBlur={handleBlur}
                onChange={field.onChange}
                name={field.name}
                ref={setRef}
                className={`bg-transparent outline-none`}
                />
            <label className={` ${error ? isFocus ? '!text-red-500 !font-bold' :'!text-red-500 !font-normal' : ''}`} htmlFor={id}>{label}</label>
            { children }
            <div className={`custom-border absolute inset-0 border ${error ? isFocus ? 'border-[#808080]' : 'border-red-500' : 'border-[#808080]'} -z-20 `}></div>
        </div>
    );
};

export default Input;