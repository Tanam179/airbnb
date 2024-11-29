import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";

import Navbar from "./_components/navbar/Navbar";
import "@/_styles/globals.css";
import ToasterProvider from "./providers/ToasterProvider";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { getCurrentUserServer } from "./utils/getUser";



const nunito = Nunito_Sans({
    display: "swap",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800"],
    variable: "--font-nunito",
});

export const metadata: Metadata = {
    title: {
        default:
            "Airbnb | Nhà nghỉ dưỡng cho thuê, cabin, nhà trên bãi biển, nhà trong rừng, v.v.",
        template: "Airbnb | %s",
    },
    description: "Airbnb Clone",
};

export default async function RootLayout({ children, session }) {
    const currentUser = await getCurrentUserServer();

    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${nunito.variable} antialiased`}>
                <SessionProvider session={session}>
                    <ToasterProvider />
                    <div className="max-w-[2360px] w-full">
                        <Navbar currentUser={currentUser}/>
                        {children}
                    </div>
                </SessionProvider>
            </body>
        </html>
    );
}
