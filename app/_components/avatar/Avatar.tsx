

import Image from "next/image";
import defaultAvatar from "@/../public/default-avatar.svg";

const Avatar = ({ currentUser }) => {
    
    return (
        <Image src={ currentUser ? currentUser.image ? currentUser.image : defaultAvatar : defaultAvatar} quality={80} className="rounded-full flex-shrink-1" width={30} height={30}  alt="user avatar"/>
    );
};

export default Avatar;