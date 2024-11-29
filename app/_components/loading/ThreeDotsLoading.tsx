import React from 'react';

const ThreeDotsLoading = () => {
    return (
        <div className='flex space-x-2 justify-center items-center h-full'>
            <div className='h-[10px] w-[10px] bg-[#ddd] rounded-full animate-bounce [animation-delay:-0.2s]'></div>
            <div className='h-[10px] w-[10px] bg-[#ddd] rounded-full animate-bounce [animation-delay:-0.1s]'></div>
            <div className='h-[10px] w-[10px] bg-[#ddd] rounded-full animate-bounce'></div>
        </div>
    );
};

export default ThreeDotsLoading;