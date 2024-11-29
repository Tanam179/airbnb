import Image from "next/image";
import { IoMdClose } from "react-icons/io";
import Header from "./Header";
import Button from "../button/Button";
import { googleLogin } from "@/_libs/actions";
import Google from "../icons/Google";
import Email from "../icons/Email";

const OAuthUser = ({ info, email }: { info: { firstName: string, image: string }, email: string }) => {
    return (
        <div className="overflow-hidden z-10 bg-white rounded-xl modal md:w-[567px] w-full">
            <Header title={`Chào mừng bạn quay trở lại, ${info.firstName}`} icon={IoMdClose} />
            <div className="p-6 max-h-[670px] overflow-y-auto">
                <div className="flex items-center justify-center">
                    <Image src={info.image} width={120} height={120} alt="avatar" />
                </div>
                <div className="flex items-center justify-center">
                    <Email/>
                    <p>{email}</p>
                </div>
                <div className="flex "></div>
                <Button onClick={() => googleLogin()} icon={Google} outline label='Tiếp tục với Google'/>
            </div>
        </div>
    );
};

export default OAuthUser;
