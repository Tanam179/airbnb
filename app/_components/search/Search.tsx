"use client";

import { BiSearch } from "react-icons/bi";

const Search = () => {
    return (
        <div className="shadow-sm hover:shadow-sm py-2 border rounded-full w-full md:w-auto transition cursor-pointer">
            <div className="flex flex-row justify-between items-center">
                <div className="px-6 font-semibold text-sm">
                    <span>Địa điểm bất kỳ</span>
                </div>
                <div className="sm:block flex-1 border-x hidden px-6 font-semibold text-center text-sm">
                    <span>Tuần bất kỳ</span>
                </div>
                <div className="flex items-center gap-3 pr-3 pl-6 text-gray-600 text-sm">
                    <div className="sm:block hidden">
                        <span>Thêm khách</span>
                    </div>
                    <div className="bg-rose-500 p-2 rounded-full text-white">
                        <BiSearch size={18} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Search;
