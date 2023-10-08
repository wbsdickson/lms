import Stripe from "stripe";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import axios from "axios";
import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";

export type CheckoutItem = {
    name: string;
    quantity: number;
    price: number;
    img?: string;
    id: string;
};
export type User = {
    name: string;
    email: string;
    id: string;
};
export type Checkout = {
    items: Array<CheckoutItem>;
    to: string;
    from: User;
    taxRate: number;

    successURL: string;
    failURL: string;
    webhook: string;
};

export async function POST(req: Request, { params }: { params: { courseId: string } }) {
    try {
        const user = await currentUser();

        if (!user || !user.id || !user.emailAddresses?.[0]?.emailAddress) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const course = await db.course.findUnique({
            where: {
                id: params.courseId,
                isPublished: true,
            },
        });
        if (!course || !course.id) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        let checkout: Checkout = {
            to: "Dickson LMS Limited",
            from: {
                id: user.id,
                name: user.firstName + "_" + user.lastName,
                email: user.emailAddresses[0].emailAddress,
            },
            taxRate: 0,
            items: [
                {
                    id: course.id,
                    name: course.title,
                    quantity: 1,
                    price: course?.price || 0,
                    img: course?.imageUrl + "",
                },
            ],
            successURL: process.env.DWPAY_SUCCESS_URL!,
            failURL: process.env.DWPAY_FAIL_URL!,
            webhook: `${process.env.NEXT_PUBLIC_APP_URL}/api/dw-webhook`,
        };
        const response = await axios.post(process.env.DWPAY_URL!, checkout);

        return NextResponse.json({ url: response.data.url });
    } catch (error) {
        console.log("[COURSE_ID_CHECKOUT]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
