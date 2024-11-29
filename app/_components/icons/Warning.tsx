import React from 'react';

const Warning = ({ className }: { className: string }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} 
            viewBox="0 0 16 16" aria-hidden="true" role="presentation" focusable="false" 
            style={{display: "block", height: "16px", width: "16px", fill: "currentcolor"}}>
                <path d="M7.24.21a1.5 1.5 0 0 1 1.99.43l.08.12 6.48 11.32a1.56 1.56 0 0 1 0 1.55 1.53 1.53 0 0 1-.54.56 1.5 1.5 0 0 1-.6.2l-.16.01H1.5a1.5 1.5 0 0 1-.92-.32 1.56 1.56 0 0 1-.45-1.86l.07-.14L6.69.76c.13-.23.32-.42.55-.55zM8 10.2a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm.8-6.6H7.2v5.2h1.6z"></path>
            </svg>
    );
};

export default Warning;