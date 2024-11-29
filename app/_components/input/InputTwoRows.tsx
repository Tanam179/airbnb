import React, { cloneElement, ReactElement, useState } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface InputTwoRowsProps {
    children: ReactElement<{ setIsOneFieldFocus: React.Dispatch<React.SetStateAction<boolean>> }> | 
              ReactElement<{ setIsOneFieldFocus: React.Dispatch<React.SetStateAction<boolean>> }>[];
    error: boolean;
}

const InputTwoRows = ({ children, error }: InputTwoRowsProps) => {
    const [isOneFieldFocus, setIsOneFieldFocus] = useState(false);

    const childrenWithProps = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return cloneElement(child, { setIsOneFieldFocus });
        }
        return child; // Giữ nguyên nếu không phải React element
      });

    return (
        <div className={`flex flex-col custom-input-two-rows ${ isOneFieldFocus ? 'have-field-focus' : '' } relative ${error ? 'one-field-error' : ''}`}>
            { childrenWithProps }
        </div>
    );
};

export default InputTwoRows;


