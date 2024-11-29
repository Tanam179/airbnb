import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";

export async function POST(req: NextRequest) {
    const { method, phoneNumber, phoneCode } = await req.json();
    
    let channel;
    switch (method) {
        case "voice":
            channel = "call";
            break;
        case "whatsapp":
            channel = "whatsapp";
            break;
        default:
            channel = "sms";
    }


    const phone = `${phoneCode}${phoneNumber.slice(1)}`;

    const accountSid = process.env.ACCOUNT_SID;
    const authToken = process.env.ACCOUNT_TOKEN;
    const client = twilio(accountSid, authToken);

    try {
        const res = await client.verify.v2
            .services("VA5a66625497086c42f3249d577ecee080")
            .verifications.create({
                to: phone,
                channel: channel,
            });
        console.log(res);
    } catch (err) {
        let errorMessage;
        if (err instanceof Error) {
            errorMessage = err.message; // An toàn để truy cập
        }
        return NextResponse.json({ message: errorMessage }, { status: 403 });
    }

    return NextResponse.json({ status: "Success" }, { status: 200 });
}
