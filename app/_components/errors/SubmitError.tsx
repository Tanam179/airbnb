import React from 'react';

const SubmitError = ({ title, message }: { title: string, message: string }) => {
    return (
        <div className='rounded-lg p-4 border border-[#ddd] flex items-center gap-3'>
            <div className='w-11 h-11 flex items-center justify-center rounded-full bg-[#C13515] text-[#fff]'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true" role="presentation" focusable="false" style={{display: 'block', height: '16px', width: '16px', fill: 'currentcolor'}}><path d="M8 12a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM9.6 0v9.6H6.4V0z"></path></svg>

            </div>
            <div className="information">
                <h2 className='text-sm font-bold text-[#222]'>{title}</h2>
                <p className="description text-sm text-[#6a6a6a]">{ message }</p>
            </div>
        </div>
    );
};

export default SubmitError;