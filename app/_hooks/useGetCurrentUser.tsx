import prisma from "@/_libs/prismadb";
import { useSession } from "next-auth/react";

const useGetCurrentUser = () => {
    const { data: session } = useSession();
    return session?.user;
    
};

export default useGetCurrentUser;