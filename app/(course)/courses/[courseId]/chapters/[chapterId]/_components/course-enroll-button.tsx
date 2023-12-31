"use client";

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";

interface CourseEnrollButtonProps {
    price: number;
    courseId: string;
}

export const CourseEnrollButton = ({ price, courseId }: CourseEnrollButtonProps) => {
    const [isLoading, setIsLoading] = useState(false);

    const onDWPay = async () => {
        try {
            setIsLoading(true);

            const response = await axios.post(`/api/courses/${courseId}/checkout/dw`);

            window.location.assign(response.data.url);
        } catch {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };
    const onClick = async () => {
        try {
            setIsLoading(true);

            const response = await axios.post(`/api/courses/${courseId}/checkout`);

            window.location.assign(response.data.url);
        } catch {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <Button onClick={onDWPay} disabled={isLoading} size="sm" className="w-full md:w-auto my-4 md:my-0 md:mx-4">
                DW Pay {formatPrice(price)}
            </Button>
            <Button onClick={onClick} disabled={isLoading} size="sm" className="w-full md:w-auto">
                Enroll for {formatPrice(price)}
            </Button>
        </div>
    );
};
