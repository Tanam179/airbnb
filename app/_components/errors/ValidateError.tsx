import React from 'react';

const ValidateError = ({ message }: { message: string }) => {
    return (
        <div className="flex items-center text-xs text-red-500 mt-2 gap-2 font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-label="Lỗi" role="img" focusable="false" style={{display: "block", height: "12px", width: "12px", fill: "currentcolor"}}><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zm0 10.2a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm.8-6.6H7.2v5.2h1.6z"></path></svg>
            <span>{message}</span>
        </div>
    );
};

export default ValidateError;