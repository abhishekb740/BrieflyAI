import "@/styles/globals.css";
import type { AppProps } from "next/app";
import {
  DynamicContextProvider
} from "@dynamic-labs/sdk-react-core";
import { HuddleClient, HuddleProvider } from "@huddle01/react";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";

const huddleClient = new HuddleClient({
  projectId: "zMQHa6hH5hGrxfwYZp7z8I-1lWScI7UA",
  options: {
    activeSpeakers: {
      size: 8,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <DynamicContextProvider
      settings={{
        // Find your environment id at https://app.dynamic.xyz/dashboard/developer
        environmentId: "1567fade-6f87-42cd-b513-56de448a7740",
        walletConnectors: [
          EthereumWalletConnectors,
        ],
      }}
    >
      <HuddleProvider client={huddleClient}>
        <Component {...pageProps} />
      </HuddleProvider>
    </DynamicContextProvider>
  );
}
