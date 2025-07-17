"use client";

import * as React from "react";
import {
  RainbowKitProvider,
  getDefaultWallets,
  getDefaultConfig,
} from "@rainbow-me/rainbowkit";
import { trustWallet, ledgerWallet } from "@rainbow-me/rainbowkit/wallets";
import { sepolia, baseSepolia, westendAssetHub } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, http } from "wagmi";

const { wallets } = getDefaultWallets();

const paseoPassethub = {
  id: 420420422,
  name: 'Paseo Passethub',
  network: 'paseo-passethub',
  nativeCurrency: {
    name: 'PAS',
    symbol: 'PAS',
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ['https://testnet-passet-hub-eth-rpc.polkadot.io'],
    },
  },
  blockExplorers: {
    default: { name: 'Blockscout', url: 'https://blockscout-passet-hub.parity-testnet.parity.io' },
  },
} as const;


const config = getDefaultConfig({
  appName: "BIFROST_EVM_MINT", // Name your app
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!, // Enter your WalletConnect Project ID here
  wallets: [
    ...wallets,
    {
      groupName: "Other",
      wallets: [trustWallet, ledgerWallet],
    },
  ],
  chains: [sepolia, baseSepolia, westendAssetHub, paseoPassethub],
  transports: {
    [sepolia.id]: http(process.env.NEXT_PUBLIC_RPC_URL_SEPOLIA!),
    [baseSepolia.id]: http(process.env.NEXT_PUBLIC_RPC_URL_BASE_SEPOLIA!),
    [westendAssetHub.id]: http(process.env.NEXT_PUBLIC_RPC_URL_WESTEND_ASSETHUB!),
    [paseoPassethub.id]: http(process.env.NEXT_PUBLIC_RPC_URL_PASEO_PASSETHUB!),
  },
  ssr: true, // Because it is Nextjs's App router, you need to declare ssr as true
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
