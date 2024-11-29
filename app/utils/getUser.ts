import { auth } from "@/_libs/auth";
import prisma from "@/_libs/prismadb";

export const getCurrentUserServer = async function() {
    const session = await auth();

    console.log(session);

    if(!session?.user) {
        return null;
    }

    if(session.user?.email) {
        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email
            }
        });

        return currentUser
    }

}
