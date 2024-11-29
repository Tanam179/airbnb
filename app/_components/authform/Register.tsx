import React from 'react';
import Header from './Header';
import { IoMdClose } from 'react-icons/io';
import Button from '../button/Button';

const Register = () => {
    return (
        <div className="overflow-hidden z-10 bg-white rounded-xl modal md:w-[567px] w-full" >
            <Header title="Hoàn tất đăng ký" icon={IoMdClose}/>
            <div className="p-6 max-h-[670px] overflow-y-auto">
                <form autoComplete="off">
                    
                    
                        
                    <div className="mt-4">
                        <Button type="submit" label="Đồng ý và tiếp tục"/>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;