import { NextResponse } from "next/server";

import { db } from "@/lib/db";

type DWWebhook = {
    courseId: string;
    userId: string;
    eventType: string;
};
export async function POST(req: Request) {
    console.log("dw webhook triggered");

    let { courseId, userId, eventType }: DWWebhook = await req.json();
    if (eventType === "checkout.session.completed") {
        if (!userId || !courseId) {
            return new NextResponse(`Webhook Error: Missing metadata`, { status: 400 });
        }

        await db.purchase.create({
            data: {
                courseId: courseId,
                userId: userId,
            },
        });
    } else {
        return new NextResponse(`Webhook Error: Unhandled event type ${eventType}`, { status: 200 });
    }

    return new NextResponse(null, { status: 200 });
}
