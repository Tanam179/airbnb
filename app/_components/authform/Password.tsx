import React from "react";
import { IoMdClose } from "react-icons/io";
import Link from "next/link";

import Button from "../button/Button";
import Header from "./Header";
import Input from "../input/Input";
import ValidateError from "../errors/ValidateError";
import SubmitError from "../errors/SubmitError";

// { control, name, error, onLogin: handleSubmit, callback }

const Password = ({
    control,
    name,
    error,
    onLogin: handleSubmit,
    callback,
    loginErrorMessage,
}) => {
    return (
        <div className="overflow-hidden z-10 bg-white rounded-xl modal md:w-[567px] w-full">
            <Header title="Đăng nhập" icon={IoMdClose} />
            <div className="p-6 max-h-[670px] overflow-y-auto">
                {loginErrorMessage && (
                    <div className="mb-4">
                        <SubmitError
                            title="Vui lòng thử lại lần nữa"
                            message={loginErrorMessage}
                        />
                    </div>
                )}
                <form autoComplete="off" onSubmit={handleSubmit(callback)}>
                    <Input
                        label="Mật khẩu"
                        id="password"
                        type="text"
                        name={name}
                        error={error}
                        control={control}
                    ></Input>
                    {error && <ValidateError message={error.message} />}
                    <div className="mt-4 mb-6">
                        <Button type="submit" label="Đăng nhập" />
                    </div>
                </form>
                <Link
                    href="/"
                    className="text-sm text-[#222] font-bold underline"
                >
                    Bạn đã quên mật khẩu?
                </Link>
            </div>
        </div>
    );
};

export default Password;
