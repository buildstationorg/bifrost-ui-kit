"use client";

import { useState } from "react";
import { useChainId, useReadContract } from "wagmi";
import { Address } from "viem";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Token } from "@/types/token";
import Image from "next/image";
import { l2SlpxAbi } from "@/lib/abis";
import { L2SLPX_CONTRACT_ADDRESSES } from "@/lib/constants";
import { ArrowRight, CircleSlash, ParkingMeter } from "lucide-react";
import { formatEther } from "viem";

export default function AdminGetTokenConversion() {
  const chainId = useChainId();

  // based on chainId which is a number, use switch case to get the correct contract address from the L2SLPX_CONTRACT_ADDRESSES object
  const l2SlpxContractAddress = getL2SlpxContractAddress(chainId);

  function getL2SlpxContractAddress(chainId: number) {
    switch (chainId) {
      case 11155111:
        return L2SLPX_CONTRACT_ADDRESSES.find(
          (contract) => contract.network === "sepolia"
        )?.address;
      case 84532:
        return L2SLPX_CONTRACT_ADDRESSES.find(
          (contract) => contract.network === "base-sepolia"
        )?.address;
      case 421614:
        return L2SLPX_CONTRACT_ADDRESSES.find(
          (contract) => contract.network === "arbitrum-sepolia"
        )?.address;
      case 97:
        return L2SLPX_CONTRACT_ADDRESSES.find(
          (contract) => contract.network === "bsc-testnet"
        )?.address;
      case 1301:
        return L2SLPX_CONTRACT_ADDRESSES.find(
          (contract) => contract.network === "unichain-sepolia"
        )?.address;
      case 420420421:
        return L2SLPX_CONTRACT_ADDRESSES.find(
          (contract) => contract.network === "westend-assethub"
        )?.address;
      default:
        return null;
    }
  }

  const [selectedToken, setSelectedToken] = useState<Token | null>(null);

  const tokens: Token[] = [
    {
      name: "Polkadot",
      symbol: "DOT",
      address: "0xCa8d2C658EB4833647202FE5a431cD52aF5812E2",
      network: "westend-assethub",
      decimals: 18,
      image: "/dot.svg",
    },
    {
      name: "Voucher DOT",
      symbol: "vDOT",
      address: "0x4565B7a881396F38dfF8e28830a0b614e3baC422",
      network: "westend-assethub",
      decimals: 18,
      image: "/vdot.svg",
    },
  ];

  const { data: conversionRate, isLoading } = useReadContract({
    address: l2SlpxContractAddress
      ? (l2SlpxContractAddress as Address)
      : undefined,
    abi: l2SlpxAbi,
    functionName: "getTokenConversionInfo",
    args: [selectedToken?.address as Address],
  });

  console.log(conversionRate);

  return (
    <div className="flex flex-col gap-4 w-full p-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Token Conversion Rates</h1>
        <p className="text-muted-foreground">Check the LST conversion rate</p>
      </div>
      <div className="flex flex-col gap-2">
        <Select
          onValueChange={(value) => {
            const token = tokens.find((token) => token.symbol === value);
            if (token) {
              setSelectedToken(token);
            }
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a token" />
          </SelectTrigger>
          <SelectContent>
            {tokens.map((token) => (
              <SelectCheckTokenConversion key={token.symbol} token={token} />
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2 rounded-lg border p-4">
        {selectedToken?.symbol === "DOT" ? (
          <div className="flex flex-row gap-2 items-center">
            <CircleSlash className="w-6 h-6" />
            <div className="flex flex-row gap-2">
              <p className="text-lg">1</p>
              <Image src="/dot.svg" alt="DOT" width={24} height={24} />
              <p>DOT</p>
            </div>
            <ArrowRight />
            <div className="flex flex-row gap-2 items-center">
              {isLoading ? (
                <Skeleton className="w-8 h-6" />
              ) : (
                <p className="text-lg">{formatEther(conversionRate?.tokenConversionRate ?? BigInt(0))}</p>
              )}
              <Image src="/vdot.svg" alt="vDOT" width={24} height={24} />
              <p>vDOT</p>
            </div>
          </div>
        ) : selectedToken?.symbol === "vDOT" ? (
          <div className="flex flex-row gap-2">
            <div className="flex flex-row gap-2">
              <p className="text-lg">1</p>
              <Image src="/vdot.svg" alt="vDOT" width={24} height={24} />
              <p>vDOT</p>
            </div>
            <ArrowRight />
            <div className="flex flex-row gap-2">
              <Image src="/dot.svg" alt="DOT" width={24} height={24} />
              <p>DOT</p>
            </div>
          </div>
        ) : (
          <p className="text-muted-foreground">Select a token</p>
        )}
        <div className="flex flex-row gap-2 items-center">
          <ParkingMeter className="w-6 h-6" />
          {selectedToken?.symbol ? (
            <>
              {isLoading ? (
                <Skeleton className="w-8 h-6" />
              ) : (
                <p className="text-lg">{formatEther(conversionRate?.orderFee ?? BigInt(0))}</p>
              )}
            </>
          ) : (
            <p className="text-muted-foreground">Select a token</p>
          )}
        </div>
      </div>
    </div>
  );
}

function SelectCheckTokenConversion({ token }: { token: Token }) {
  return (
    <SelectItem value={token.symbol}>
      <div className="flex flex-row gap-2 items-center justify-center">
        <Image src={token.image} alt={token.symbol} width={24} height={24} />
        <p className="text-lg">{token.name}</p>
        <p className="text-lg text-muted-foreground">{token.symbol}</p>
      </div>
    </SelectItem>
  );
}
