"use client";

import { useConfettiStore } from "@/hooks/use-confetti-store";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CheckCircle2, XCircle } from "lucide-react";
const CallbackPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const isSuccess = searchParams.get("success") ? searchParams.get("success") === "1" : false;
    const isFail = searchParams.get("fail") ? searchParams.get("fail") === "1" : false;
    const { onOpen } = useConfettiStore();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            router.push("/");
        }, 5000);

        return () => clearTimeout(timeoutId);
    }, [router]);
    useEffect(() => {
        if (isSuccess) onOpen();
    }, [isSuccess, onOpen]);

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);
    if (!isMounted) return null;
    return (
        <>
            {isSuccess && !isFail && (
                <Dialog open>
                    <DialogContent
                        showClose={false}
                        className="flex justify-center min-h-[20px] flex-col items-center py-20"
                    >
                        <CheckCircle2 className="w-16 h-16 text-green-600" />

                        <DialogHeader className="items-center">
                            <DialogTitle>{isSuccess && !isFail && "Payment Completed"}</DialogTitle>

                            <DialogDescription>This demo transaction is over</DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            )}
            {(!isSuccess || isFail) && (
                <Dialog open>
                    <DialogContent
                        showClose={false}
                        className="flex justify-center min-h-[20px] flex-col items-center py-20"
                    >
                        <XCircle className="w-16 h-16 text-red-600" />
                        <DialogHeader className="items-center">
                            <DialogTitle>{isSuccess && !isFail && "Payment Failed"}</DialogTitle>
                            <DialogDescription>This demo transaction is over</DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            )}
        </>
    );
};

export default CallbackPage;
