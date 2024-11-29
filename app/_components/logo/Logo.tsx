
import Link from "next/link";
import Image from "next/image";
import logo from "@/../public/airbnb.svg";

const Logo = () => {
    return (
        <Link href="/">
            <Image
                src={logo}
                alt="airbnb logo"
                width={100}
                quality={100}
                className="md:block hidden"
                priority
            />
        </Link>
    );
};

export default Logo;
