"use client";

import axios from "axios";
import MuxPlayer from "@mux/mux-player-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";

import { cn } from "@/lib/utils";
import { useConfettiStore } from "@/hooks/use-confetti-store";

interface VideoPlayerProps {
    isLocked: boolean;
    videoUrl: string;
}

export const VideoPlayerBasic = ({ isLocked, videoUrl }: VideoPlayerProps) => {
    return (
        <div className="relative aspect-video">
            {isLocked && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary">
                    <Lock className="h-8 w-8" />
                    <p className="text-sm">This chapter is locked</p>
                </div>
            )}
            {!isLocked && (
                <video controls>
                    <source src={videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            )}
        </div>
    );
};
