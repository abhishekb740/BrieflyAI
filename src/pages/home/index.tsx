"use client";
import React from "react";
import { useRouter } from "next/navigation";
import {
    DynamicWidget,
    useIsLoggedIn
} from "@dynamic-labs/sdk-react-core";
import { BackgroundBeams } from "@/component/ui/background-beams";

export default function Hero() {
    const router = useRouter();
    const isLoggedIn = useIsLoggedIn();
    const startMeeting = async () => {
        const response = await fetch("/api/startMeeting");
        const data = await response.json();
        const roomId = data?.roomId;
        router.push(`/${roomId}`);
    };

    return (
        <div className="relative min-h-screen">
            <BackgroundBeams className="absolute inset-0 z-0" />
            <main className="relative z-10 flex min-h-screen flex-row p-20">
                <div className="flex flex-col gap-16 justify-center items-center w-2/3">
                    <div className="flex flex-col gap-8 items-center">
                        <div className="text-2xl md:text-3xl font-title font-bold">
                            Briefly.AI
                        </div>
                        <div className="text-md font md:text-xl text-center">
                            Transforming minutes into meaningful summaries.
                        </div>
                        <DynamicWidget />
                    </div>
                    <div className="flex flex-col gap-16 items-center">
                        <div className="text-lg md:text-2xl">Start your meeting now</div>
                        <div>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                                onClick={startMeeting}
                            >
                                {isLoggedIn ? "Start Meeting" : "Please login and start meeting"}
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center items-center w-1/3">
                    <img src="/meeting1.svg" alt="Meeting Logo" className="max-w-full h-auto" />
                </div>
            </main>
        </div>
    );
}
