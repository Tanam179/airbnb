import React from 'react';
import Header from './Header';
import { IoMdClose } from 'react-icons/io';
import Button from '../button/Button';
import Sms from '../icons/Sms';
import WhatsApp from '../icons/WhatsApp';
import Phone from '../icons/Phone';

const MethodsVerifyOTP = ({ data, onChange, option, onResend }: { data: string, onChange: (value: string) => void, option: string, onResend: (phone: string, phoneCode: string) => Promise<void> }) => {
    return (
        <div className="overflow-hidden z-10 bg-white rounded-xl modal md:w-[567px] w-full" >
            <Header title="Lựa chọn khác" icon={IoMdClose}/>
            <div className="p-6 max-h-[670px] overflow-y-auto verification-methods">
                <div className="border-[#ddd] ">
                    <p className="font-medium block text-[#222] mb-1">Chọn cách khác để nhận mã xác minh theo số điện thoại {data}</p>
                    <span className='text-xs text-[#717171] mb-4'>Hãy đảm bảo đã bật thông báo.</span>
                </div>
                <div className='py-6 border-b border-b-[#ddd]'>
                <label htmlFor="verify-sms" className='flex items-center justify-between cursor-pointer'>
                    <div className="flex gap-4 items-center">
                        <Sms/>
                        <div className="flex flex-col">
                            <h3 className='font-bold'>Tin nhắn văn bản (SMS)</h3>
                            <p className='text-[#6A6A6A] text-sm'>Chúng tôi sẽ gửi mã cho bạn qua tin nhắn.</p>
                        </div>
                    </div>
                    <div>
                        <input onChange={e => onChange(e.target.value)} type="radio" name='verify_option' id="verify-sms" value="sms" checked={ option === 'sms' }/>
                        <div></div>
                    </div>
                </label>
            </div>
            <div className='py-6 border-b border-b-[#ddd]'>
                <label htmlFor='verify-whatsapp' className='flex items-center justify-between cursor-pointer'>
                    <div className="flex gap-4 items-center">
                        <WhatsApp/>
                        <div className="flex flex-col">
                            <h3 className='font-bold'>WhatsApp</h3>
                            <p className='text-[#6A6A6A] text-sm'>Chúng tôi sẽ gửi mã qua Wi-Fi.</p>
                        </div>
                    </div>
                    <div>
                        <input onChange={e => onChange(e.target.value)} type="radio" name='verify_option' id="verify-whatsapp" value="whatsapp"  checked={ option === 'whatsapp' }/>
                        <div></div>
                    </div>
                </label>
            </div>
            <div className='py-6 border-b border-b-[#ddd]'>
                <label htmlFor='verify-voice' className='flex items-center justify-between cursor-pointer'>
                    <div className="flex gap-4 items-center">
                        <Phone/>
                        <div className="flex flex-col">
                            <h3 className='font-bold'>Cuộc gọi điện thoại</h3>
                            <p className='text-[#6A6A6A] text-sm'>Chúng tôi sẽ gọi cho bạn để cung cấp mã.</p>
                        </div>
                    </div>
                    <div>
                        <input onChange={e => onChange(e.target.value)} type="radio" id="verify-voice" value="voice" name='verify_option' checked={ option === 'voice' }/>
                        <div></div>
                    </div>
                </label>
            </div>
                <div className="mt-16 pt-10">
                    <Button onClick={() => onResend(data.split(' ')[1], data.split(' ')[0])} label='Gửi lại mã'/>
                </div>
            </div>
        </div>
    );
};

export default MethodsVerifyOTP;