import { NextRequest, NextResponse } from "next/server";
import prisma from "@/_libs/prismadb";

export async function POST(req: NextRequest) {
    const { email } = await req.json();
    try {
        const user = await prisma.user.findUnique({
            where: {
                email
            }                      
        });

        if(!user) {
            throw new Error('User not found')
        }

        const isOAuthUser = user.password === null;
        return NextResponse.json({ status: "Success", data: {
            isOAuthUser, 
            firstName: user.name?.split(' ')[0],
            image: user.image,
            email: user.email
        }}, { status: 200 })


    } catch (error) {
        let errorMessage;
        if (error instanceof Error) {
            errorMessage = error.message; // An toàn để truy cập
        }
        return NextResponse.json({ message: errorMessage }, { status: 403 })
    }

}