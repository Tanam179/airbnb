import { useContext, useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Header from "./Header";
import AuthModalContext from "@/_contexts/AuthModalContext";

const CormfirmOTP = ({ length = 4, onVerify, data, isLoading }: { length: number, onVerify: ( otp: string) => Promise<void>, data: string, isLoading: boolean }) => {
    const [otp, setOtp] = useState(new Array(length).fill(''));
    const { setStep } = useContext(AuthModalContext)
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);


    useEffect(() => {
        if(inputRefs.current.length > 0 && inputRefs.current[0] !== null) {
            inputRefs.current[0].focus();
        }
    }, [])

    const handleChange = function(ind:number, value: string) {
        const numericValue = value.replace(/[^0-9]/g, '');
        const newOtp = [...otp];
        newOtp[ind] = numericValue.substring(value.length - 1);
        setOtp(newOtp);

        if(numericValue && ind < length - 1  &&  inputRefs.current[ind + 1] !== null) {
            inputRefs.current[ind + 1]?.focus();
        }


        const combineOtp = newOtp.join('');
        if(combineOtp.length === length) {
            onVerify(combineOtp);
        }
    }


    const handleClick = function(ind: number) {
        const input = inputRefs.current[ind];
        if (input) {
            // Đặt con trỏ ở cuối nội dung
            if(otp.indexOf("")){
                inputRefs.current[otp.indexOf("")]?.focus();
            } else {
                const length = input.value.length;
                input.setSelectionRange(length, length);
            }
        }

    }

    const handleKeyDown = function(ind: number, e: React.KeyboardEvent<HTMLInputElement>) {
        if(e.key === "Backspace" && ind > 0 && !otp[ind]) {
            e.preventDefault();
            inputRefs.current[ind - 1]?.focus();
        }
    }

    return (
        <div className="overflow-hidden z-10 bg-white rounded-xl modal md:w-[567px] w-full" >
            <Header title="Xác nhận số điện thoại của bạn" icon={IoMdClose}/>
            <div className="p-6 max-h-[670px] overflow-y-auto">
                <div className="verification border-[#ddd] ">
                    <span className="font-medium block text-[#222] mb-6">Nhập mã mà chúng tôi đã gửi qua SMS tới số {data}:</span>
                    <form>
                        <div className="grid grid-cols-6 gap-4">
                            {
                                otp.map((el, ind) => (
                                    <input
                                        disabled={isLoading}
                                        ref={(input) => { inputRefs.current[ind] = input; }}
                                        className={`w-full h-[70px] text-center text-lg font-semibold outline-none border border-[#ddd] focus:border-[3px] focus:border-[#222] rounded-lg ${isLoading ? 'bg-[#f3f3f3] cursor-not-allowed' : 'bg-transparent cursor-default'}`}
                                        type="text" 
                                        inputMode="numeric" 
                                        pattern="[0-9]*" 
                                        key={ind} 
                                        onChange={(e) => handleChange(ind, e.target.value)} 
                                        onClick={() => handleClick(ind)} 
                                        onKeyDown={(e) => handleKeyDown(ind, e)}
                                        value={el}/>
                                ))
                            }

                        </div>
                    </form>
                </div>
            </div>
            <div className="mt-4">
                <div className="py-4 px-6 border-t border-t-[#ddd]">
                    <button onClick={() => setStep(prev => [...prev, 'another-methods-verify'])} className="font-bold underline p-[10px] hover:bg-[#f7f7f7] rounded-lg -translate-x-[10px]">Lựa chọn khác</button>
                </div>
            </div>
        </div>
        
    );
};

export default CormfirmOTP;