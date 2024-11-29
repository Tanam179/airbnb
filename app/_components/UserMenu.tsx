/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Dropdown from "./dropdown";
import AuthModal from "./authmodal/AuthModal";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "./avatar";
import { signOut } from "next-auth/react"

const UserMenu = ({ currentUser }: { currentUser: any }) => {
    return (
        <div className="relative">
            <div className="flex items-center gap-3">
                <div className="md:block hidden hover:bg-neutral-100 px-4 py-3 rounded-full font-semibold text-sm transition cursor-pointer">
                    <span>Cho thuê chỗ ở qua Airbnb</span>
                </div>
                <Dropdown>
                    <Dropdown.OpenButton>
                        <div className="flex items-center gap-3 border-neutral-200 hover:shadow-md md:px-2 md:py-1 p-4 border rounded-full transition cursor-pointer">
                            <AiOutlineMenu />
                            <div className="md:block hidden">
                                <Avatar currentUser={currentUser}/>
                            </div>
                        </div>
                    </Dropdown.OpenButton>
                    {
                        !currentUser ? 
                            <AuthModal>
                                <Dropdown.Menus>
                                    <div className="py-2">
                                        <AuthModal.Button>
                                            <Dropdown.Option bolder>Đăng nhập</Dropdown.Option>
                                        </AuthModal.Button>
                                        <AuthModal.Button>
                                            <Dropdown.Option>Đăng ký</Dropdown.Option>
                                        </AuthModal.Button>
                                    </div>
                                    <hr />
                                    <div className="py-2">
                                        <Dropdown.Option>
                                            Cho thuê chỗ ở qua Airbnb
                                        </Dropdown.Option>
                                        <Dropdown.Option>
                                            Trãi nghiệm tổ chức
                                        </Dropdown.Option>
                                        <Dropdown.Option>
                                            Trung tâm trợ giúp
                                        </Dropdown.Option>
                                    </div>
                                </Dropdown.Menus>
                                <AuthModal.Window />
                            </AuthModal> :
                            <Dropdown.Menus>
                                <div className="py-2">
                                    <Dropdown.Option bolder href="/tin-nhan">Tin nhắn</Dropdown.Option>
                                    <Dropdown.Option bolder href="/chuyen-di">Chuyến đi</Dropdown.Option>
                                    <Dropdown.Option bolder href="/danh-sach-yeu-thich">
                                        Danh sách yêu thích
                                    </Dropdown.Option>
                                </div>
                                <hr />
                                <div className="py-2">
                                    <Dropdown.Option href="/quan-ly-nha-cho-thue-phong">
                                        Quản lý nhà / Phòng cho thuê
                                    </Dropdown.Option>
                                    <Dropdown.Option href="/to-chuc-trai-nghiem">
                                        Tổ chức trãi nghiệm
                                    </Dropdown.Option>
                                    <Dropdown.Option href="/tai-khoan">
                                        Tài khoản
                                    </Dropdown.Option>
                                </div>
                                <hr />
                                <div className="py-2">
                                    <Dropdown.Option href="/trung-tam-tro-giup">
                                        Trung tâm trợ giúp
                                    </Dropdown.Option>
                                    <Dropdown.Option onClick={signOut}>
                                        Đăng xuất
                                    </Dropdown.Option>

                                </div>
                            </Dropdown.Menus>
                        }
                    
                </Dropdown>
            </div>
        </div>
    );
};

export default UserMenu;
