import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";

export async function POST(req: NextRequest) {
    const { phoneNumber, phoneCode, otp } = await req.json();
    const phone = `${phoneCode}${phoneNumber.slice(1)}`;
    console.log("Phone", phone);
    console.log("Phone Code", phoneCode);

    const accountSid = process.env.ACCOUNT_SID;
    const authToken = process.env.ACCOUNT_TOKEN;
    const client = twilio(accountSid, authToken);

    try {
        const res = await client.verify.v2
            .services("VA5a66625497086c42f3249d577ecee080")
            .verificationChecks.create({
                code: otp,
                to: phone,
            });
        console.log('Response verify otp', res);

        if (res.status !== "approved") {
            throw new Error("Invalid OTP");
        }
        return NextResponse.json({ status: "Success" }, { status: 200 });
    } catch (err) {
        let errorMessage;
        if (err instanceof Error) {
            errorMessage = err.message; // An toàn để truy cập
        }
        return NextResponse.json({ message: errorMessage }, { status: 403 });
    }
}
