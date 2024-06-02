import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { hostname } from "os";
import {
  DynamicContextProvider,
  DynamicWidget,
} from "@dynamic-labs/sdk-react-core";
import { EthersExtension } from "@dynamic-labs/ethers-v5";

import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";

export default function Hero() {
  const router = useRouter();
  const startMeeting = async () => {
    const response = await fetch("/api/startMeeting");
    const data = await response.json();
    console.log(data);
    const roomId = data?.roomId;
    router.push(`/${roomId}`);
  };

  return (
    <DynamicContextProvider
      settings={{
        // Find your environment id at https://app.dynamic.xyz/dashboard/developer
        environmentId: "78ed312b-ff00-49e5-ab43-53abb4d89bf1",
      }}
    >
      <main className="flex min-h-screen flex-col items-center p-20 gap-16">
        <div className="flex flex-col gap-8 justify-center items-center">
          <div className="text-2xl md:text-3xl font-title font-bold">
            Briefly.AI
          </div>
          <div className="text-md font md:text-xl">
            Transforming minutes into meaningful summaries.
          </div>
          <DynamicWidget />
        </div>
        <div className="flex flex-col gap-16 justify-center items-center">
          <div className="text-lg md:text-2xl">Start your meeting now</div>
          <div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              onClick={startMeeting}
            >
              Start Meeting
            </button>
          </div>
        </div>
      </main>
    </DynamicContextProvider>
  );
}
