import React, { Fragment, useContext } from 'react';
import Button from '../button/Button';
import Facebook from '../icons/Facebook';
import Google from '../icons/Google';
import Apple from '../icons/Apple';
import Email from '../icons/Email';
import AuthModalContext from '@/_contexts/AuthModalContext';
import { facebookLogin, googleLogin } from '@/_libs/actions';
import Phone from '../icons/Phone';

const SocialLogin = () => {
    const { option, setOption } = useContext(AuthModalContext);

    const handleChangeOption = function () {
        setOption(prev => prev === 'phone' ? 'email' : 'phone')
    }
    
    return (
        <Fragment>
            <div className="my-4 font-normal text-xs  flex items-center after:w-full after:h-[1px] after:bg-[#ddd] after:ml-4 before:w-full before:h-[1px] before:bg-[#ddd] before:mr-4">
                        <span>hoặc</span>
                    </div>
            <div className='flex flex-col gap-[18px]'>
                <Button onClick={() => facebookLogin()} icon={Facebook} outline label='Tiếp tục với Facebook'/>
                <Button onClick={() => googleLogin()} icon={Google} outline label='Tiếp tục với Google'/>
                <Button icon={Apple} outline label='Tiếp tục với Apple'/>
                <Button onClick={handleChangeOption} icon={option === 'email' ? Phone : Email} outline label={ option === 'email' ? 'Tiếp tục với điện thoại' : 'Tiếp tục bằng email' }/>
            </div>

        </Fragment>
    );
};

export default SocialLogin;