"use client";
import React from "react";
import { Inter, Roboto } from "next/font/google";
import { useRouter } from "next/navigation";
import { DynamicWidget, useIsLoggedIn } from "@dynamic-labs/sdk-react-core";
import { BackgroundBeams } from "@/component/ui/background-beams";
import toast, { Toaster } from "react-hot-toast";
import { FlipWords } from "@/component/ui/flip-words";
const afacad = Inter({ subsets: ["latin"] });
const roboto = Roboto({
  weight: ["300"],
  style: ["italic"],
  subsets: ["latin"],
  display: "swap",
});
export default function Hero() {
    const words = ["Conduct", "Summarise", "Analyse"];
  const router = useRouter();
  const isLoggedIn = useIsLoggedIn();
  const startMeeting = async () => {
    const response = await fetch("/api/startMeeting");
    const data = await response.json();
    const roomId = data?.roomId;
    router.push(`/${roomId}`);
  };
  const notify = () =>
    toast("Please Login First!", {
      icon: "🔒",
      duration: 4000,
    });
  return (
    <div className="relative min-h-screen">
      <BackgroundBeams className="absolute inset-0 z-0" />
      <main className="relative z-10 flex min-h-screen flex-row p-20">
        <div className="flex flex-col gap-16 justify-center items-center w-2/3">
          <div className="flex flex-col gap-8 items-center">
              <div className="text-6xl mx-auto font-normal text-neutral-600 dark:text-neutral-400">
                <FlipWords words={words} className="text-7xl py-2 font-semibold"/>
                your meetings with <span className="text-blue-500">Briefly.ai</span>
              </div>
              <br/>
            <DynamicWidget
              innerButtonComponent={
                <span>Log in with your wallet or email</span>
              }
            />
            {/* <div className="text-2xl font md:text-2xl text-center">
              <span className={roboto.className}>
                Transforming minutes into meaningful summaries
              </span>
            </div>
            <br /> */}
          </div>
          <div className="flex flex-col gap-6 items-center">
            <div className="text-lg md:text-4xl text-slate-300">Start an instant meeting</div>
            <div>
              <button
                className="border border-white text-white px-5 py-3 rounded-lg font-semibold"
                onClick={isLoggedIn ? startMeeting : notify}
              >
                {isLoggedIn ? "Start Meeting" : "Please login to start meeting"}
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center w-1/3">
          <img
            src="/meeting1.svg"
            alt="Meeting Logo"
            className="max-w-full h-auto"
          />
        </div>
      </main>
      <Toaster />
    </div>
  );
}
