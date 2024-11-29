import { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

import AuthModalContext from "@/_contexts/AuthModalContext";
import phoneCountriesCode from "@/_libs/phoneData";
import Button from "../button/Button";
import ConfirmOTP from "./CormfirmOTP";
import Warning from "../icons/Warning";
import SocialLogin from "./SocialLogin";
import { IoMdClose } from "react-icons/io";
import Header from "./Header";
import InputTwoRows from "../input/InputTwoRows";
import Select from "../input/Select";
import Input from "../input/Input";
import MethodsVerifyOTP from "./MethodsVerifyOTP";

interface PhoneLogin {
    phoneNumber: string;
}

const schema = yup
    .object({
        phoneNumber: yup.string()
           .min(10, "Số điện thoại phải có ít nhất 10 chữ số")
           .matches(
                /^0[1-9]\d{8}$/, 'Số điện thoại không hợp lệ.'
            )
           .required("Số điện thoại không được để trống"),
    })
    .required()

const LoginWithPhone = () => {
    const { step, setStep, phoneCode, setPhoneCode } = useContext(AuthModalContext);
    const { control, handleSubmit, formState: { errors }, reset } = useForm<PhoneLogin>({ defaultValues: { phoneNumber: ''}, resolver: yupResolver(schema)});
    const [verifyType, setVerifyType] = useState('sms');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [phone, setPhone] = useState('');
    const currentStep = step[step.length - 1];

    useEffect(() => {
        reset(); // Reset form mỗi khi step thay đổi
    }, [step, reset]);

    const handleChangeVerifyType = function(value: string) {
        setVerifyType(value);
    }


    const onSubmit: SubmitHandler<PhoneLogin> = async function({ phoneNumber }) {
        try {
            setIsLoading(true);
            const result = await fetch('/api/send-otp', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ method: verifyType, phoneNumber, phoneCode }) });
            if(!result.ok) {
                throw new Error('Hiện tại chúng tôi đang sử dụng bản trial nên chỉ số điện thoại đăng ký mới sử dụng được. Xin vui lòng dùng phương thức khác! ')
            }
            setPhone(phoneNumber);
            setStep(prev => [...prev, 'verify-otp']);
        } catch (error) {
            if(error instanceof Error) {
                setErrorMessage(error.message);
            }
        } finally {
            setIsLoading(false);
        }
    }

    const handleResendOTP = async function( phone: string, phoneCode: string) {
        try {
            setIsLoading(true);
            const result = await fetch('/api/send-otp', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ method: verifyType, phoneNumber: phone, phoneCode }) });
            if(!result.ok) {
                throw new Error('Hiện tại chúng tôi đang sử dụng bản trial nên chỉ số điện thoại đăng ký mới sử dụng được. Xin vui lòng dùng phương thức khác! ')
            }
            setStep(prev => prev.slice(0, -1));
        } catch (error) {
            if(error instanceof Error) {
                setErrorMessage(error.message);
            }
        } finally {
            setIsLoading(false);
        }
    }
    
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPhoneCode(e.target.value)
    }

    const handleVerifyOTP = async function(otp: string): Promise<void> {
        try {
            setIsLoading(true);
            const response = await fetch('/api/verify-otp', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ phoneNumber: phone, phoneCode, otp }) });
            if (!response.ok) {
                // Parse JSON từ server để lấy thông tin chi tiết lỗi
                throw new Error('Lỗi cmnr');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }


    if(currentStep === 'login') {
        return (
            <div className="overflow-hidden z-10 bg-white rounded-xl modal md:w-[567px] w-full" >
                <Header title="Đăng nhập hoặc đăng ký" icon={IoMdClose}/>
                <div className="p-6 max-h-[670px] overflow-y-auto">
                <div className="title mt-2 mb-8">
                    <h2 className="text-[22px] font-semibold leading-[1.625rem] ">
                        Chào mừng bạn đến với Airbnb
                    
                    </h2>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                    <InputTwoRows error={errors && errors.phoneNumber ? true : false}>
                        <Select defaultValue={phoneCode} label="Quốc gia/Khu vực" options={phoneCountriesCode} onChange={handleChange}/>
                        <Input control={control} name="phoneNumber" isTag error={errors && errors.phoneNumber ? true : false} type="number" id="phone_number" label="Số điện thoại">
                            <span className="tag">{ phoneCode }</span>
                        </Input>
                    </InputTwoRows>
                    <div className="flex flex-col">
                        { errors && errors.phoneNumber && <div className="flex items-center text-xs text-red-500 mt-2 gap-2 font-medium">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-label="Lỗi" role="img" focusable="false" style={{display: "block", height: "12px", width: "12px", fill: "currentcolor"}}><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zm0 10.2a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm.8-6.6H7.2v5.2h1.6z"></path></svg>
                            <span>{errors.phoneNumber.message}</span>
                            </div>}
                        <div className="term mt-2 text-[#222] leading-4 text-sm font-normal">
                            <span>
                                Chúng tôi sẽ gọi điện hoặc nhắn tin cho bạn để xác nhận số điện thoại. Có áp dụng phí dữ liệu và phí tin nhắn tiêu chuẩn. <a className="underline font-semibold" href="https://www.airbnb.com.vn/help/article/2855" target="_blank" rel="noopener noreferrer">Chính sách về quyền riêng tư</a>
                            </span>
                        </div>
                        { errorMessage && <div className="py-4 px-6 flex items-center border border-[#ddd] mt-5 rounded-lg text-sm gap-6">
                            <Warning className="flex-shrink-0"/>
                            <p>{errorMessage}</p>
                        </div>}
                    </div>
                    <div className="mt-4">
                        <Button type="submit" disabled={isLoading} label="Tiếp tục"/>
                    </div>
                </form>
                    <SocialLogin/>
                </div>
            </div>
        )
    } else if(currentStep === 'verify-otp') {
        return (
            <ConfirmOTP length={6} onVerify={handleVerifyOTP} data={`${ phoneCode } ${phone}`} isLoading={isLoading}/>
        );
    } else if(currentStep === 'another-methods-verify') {
        return <MethodsVerifyOTP onChange={handleChangeVerifyType} data={`${ phoneCode } ${phone}`} option={verifyType} onResend={handleResendOTP}/>
    }

};

export default LoginWithPhone;
