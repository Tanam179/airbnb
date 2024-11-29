import React, { useContext, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";

import Button from "../button/Button";
import AuthModalContext from "@/_contexts/AuthModalContext";
import Register from "./Register";
import Password from "./Password";
import Header from "./Header";
import SocialLogin from "./SocialLogin";
import Input from "../input/Input";
import ValidateError from "../errors/ValidateError";
import { emailLogin } from "@/_libs/actions";
import OAuthUser from "./OAuthUser";

const emailSchema = yup.object().shape({
    email: yup
        .string()
        .required("Email không được để trống")
        .matches(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "Định dạng email không hợp lệ"
        ),
});

const passwordSchema = yup.object().shape({
    password: yup
        .string()
        .required("Mật khẩu không được để trống"),
});

const registerSchema = yup.object().shape({
    email: yup
        .string()
        .required("Email không được để trống")
        .matches(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "Định dạng email không hợp lệ"
        ),
    password: yup
        .string()
        .matches(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/,
            "Mật khẩu phải chứa ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt."
        )
        .required("Mật khẩu không được để trống"),
    firstName: yup.string().required("Tên không được để trống"),
    lastName: yup.string().required("Họ không được để trống"),
    dateOfBirth: yup
        .date()
        .required("Ngày sinh không được để trống ")
        .max(new Date(), "Ngày sinh không hợp lệ"),
});

const getSchema = (step) => {
    switch (step) {
        case 'login':
            return emailSchema;
        case 'register':
            return registerSchema;
        case 'password':
            return passwordSchema;
        default:
            return emailSchema;
    }
};

const LoginWithEmail = () => {
    const { step, setStep, setIsOpen } = useContext(AuthModalContext);
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [infoOAuth, setInfoOAuth] = useState({});
    const router = useRouter();
    const currentStep = step[step.length - 1];
    console.log(currentStep);

    const {
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm({ resolver: yupResolver(getSchema(currentStep)) });

    useEffect(() => {
        reset(); // Reset form mỗi khi step thay đổi
        setErrorMessage('');
    }, [step, reset]);

    const onSubmit = async function (data) {
        try {
            const response = await fetch("/api/check-user", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: data.email }),
            });

            if (!response.ok) {
                throw new Error("Email không tồn tại");
            }

            const result = await response.json();
            setEmail(data.email);
            if(result.data.isOAuthUser) {
                setInfoOAuth({ image: result.data.image, firstName: result.data.firstName })
                setStep(prev => [...prev, 'user-oauth']);
            } else {
                setStep(prev => [...prev, 'password']);
            }
        } catch (error) {
            console.log(error);
            setStep(prev => [...prev, 'register']);
        }
    };

    const onAuthentication = async function (data) {
        try {
            const result = await emailLogin({ email, password: data.password });
            console.log(result);
            router.refresh();
            setStep(['login']);
            setIsOpen(false);
        } catch (error) {
            setErrorMessage(error.message.split(". Read")[0]);
        }
    };

    if (currentStep === 'login') {
        console.log(true);
        return (
            <div className="overflow-hidden z-10 bg-white rounded-xl modal md:w-[567px] w-full">
                <Header title="Đăng nhập hoặc đăng ký" icon={IoMdClose} />
                <div className="p-6 max-h-[670px] overflow-y-auto">
                    <div className="title mt-2 mb-8">
                        <h2 className="text-[22px] font-semibold leading-[1.625rem] ">
                            Chào mừng bạn đến với Airbnb
                        </h2>
                    </div>
                    <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                        <Input
                            control={control}
                            id="email"
                            label="Email"
                            name="email"
                            type="text"
                            error={errors && errors.email}
                        ></Input>
                        {errors && errors.email && (
                            <ValidateError message={errors.email.message} />
                        )}

                        <div className="mt-4">
                            <Button type="submit" label="Tiếp tục" />
                        </div>
                    </form>
                    <SocialLogin />
                </div>
            </div>
        );
    } else if (currentStep === 'register') {
        return <Register />;
    } else if (currentStep === 'password') {
        return (
            <Password
                control={control}
                name="password"
                error={errors && errors.password}
                onLogin={handleSubmit}
                callback={onAuthentication}
                loginErrorMessage={errorMessage}
            />
        );
    } else if(currentStep === 'user-oauth') {
        return (
            <OAuthUser info={infoOAuth} email={email}/>
        )
    }
};

export default LoginWithEmail;
