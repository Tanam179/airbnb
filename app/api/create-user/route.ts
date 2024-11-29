import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import prisma from "@/_libs/prismadb";

export const POST = async function (req: NextRequest) {
    const { email, password, name, dateOfBirth } : { email: string, password: string, name: string, dateOfBirth: Date } = await req.json();
    const hashPassword = await bcrypt.hash(password, 12);

    try {
        const user = await prisma.user.create({
            data: { email, password: hashPassword, name, dateOfBirth, verified: new Date() }
        })
        if(!user) {
            return NextResponse.json({ message: 'Cannot create user' }, { status: 403 })
        }
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'OOPS! Something went wrong' }, { status: 500 })
    }

    return NextResponse.json({ message: 'User created successfully' }, { status: 201 })
}