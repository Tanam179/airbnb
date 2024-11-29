import NextAuth, { CredentialsSignin } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import prisma from "./prismadb";

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        Credentials({
            id: "email-login",
            name: "Email Account",
            credentials: {
                email: { type: "text", label: "Email" },
                password: { type: "password", label: "Password" },
            },
            async authorize(credentials) {
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email as string,
                    },
                });

                const isCorrectPassword = await bcrypt.compare(
                    credentials.password as string,
                    user?.password as string
                );
                if (!isCorrectPassword) {
                    throw new CredentialsSignin(
                        "Thông tin đăng nhập không hợp lệ. Vui lòng thử lại."
                    );
                }

                const userInfo = {
                    email: user?.email,
                    password: user?.password,
                    name: user?.name,
                    dateOfBirth: user?.dateOfBirth,
                };

                return userInfo;
            },
        }),
        Credentials({
            id: "phone-login",
            name: "Phone Account",
            credentials: {
                username: { type: "text", label: "Username" },
                password: { type: "password", label: "Password" },
            },
            async authorize({ request }) {
                const response = await fetch(request);
                if (!response.ok) return null;
                return (await response.json()) ?? null;
            },
        }),
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
            allowDangerousEmailAccountLinking: true
        }),
        Facebook({
            clientId: process.env.AUTH_FACEBOOK_ID,
            clientSecret: process.env.AUTH_FACEBOOK_SECRET,
        }),
        GitHub({
            clientId: process.env.AUTH_GITHUB_ID,
            clientSecret: process.env.AUTH_GITHUB_SECRET,

        }),
    ],
    pages: {
        signIn: "/",
    },
    debug: process.env.NODE_ENV === "development",
    session: {
        strategy: "jwt",
    }
});
