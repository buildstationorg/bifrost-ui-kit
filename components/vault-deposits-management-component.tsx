"use client";

import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  type BaseError,
  useWaitForTransactionReceipt,
  useReadContract,
  useWriteContract,
  useCapabilities,
  useSendCalls,
  useAccount,
  useChainId,
  useConfig,
  useWaitForCallsStatus,
  useCallsStatus,
} from "wagmi";
import type { Token } from "@/types/token";
import Image from "next/image";
import { TOKEN_LIST, L2SLPX_CONTRACT_ADDRESS } from "@/lib/constants";
import { useForm } from "@tanstack/react-form";
import type { AnyFieldApi } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import { parseEther, formatEther, Address, maxUint256, erc20Abi } from "viem";
import { useMediaQuery } from "@/hooks/use-media-query";
import { roundLongDecimals, formatNumberStringInput, formatNumberStringWithThousandSeparators } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { l2SlpxAbi } from "@/lib/abis";
import { TransactionStatus } from "@/components/transaction-status";

const tokens: Token[] = TOKEN_LIST.filter(
  (token) => token.symbol === "vDOT" || token.symbol === "vETH"
);

export default function VaultDepositsManagementComponent() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [open, setOpen] = useState(false);
  const config = useConfig();
  const chainId = useChainId();
  const { address } = useAccount();
  const { data: availableCapabilities } = useCapabilities({
    account: address,
    chainId: chainId,
  });

  const { data: tokenAllowance, refetch: refetchTokenAllowance } =
    useReadContract({
      address: TOKEN_LIST.filter((token) => token.symbol === "DOT")[0]
        .address as Address,
      abi: erc20Abi,
      functionName: "allowance",
      args: [address as Address, L2SLPX_CONTRACT_ADDRESS],
    });

  const { data: hash, error, isPending, writeContract } = useWriteContract();

  // Batching
  const {
    data: batchCallsId,
    isPending: isBatching,
    error: batchError,
    sendCalls,
  } = useSendCalls();

  const form = useForm({
    defaultValues: {
      amount: "",
    },
    onSubmit: async ({ value }) => {
      if (selectedToken?.symbol === "vETH") {
        writeContract({
          address: L2SLPX_CONTRACT_ADDRESS,
          abi: l2SlpxAbi,
          functionName: "createOrder",
          value: parseEther(value.amount),
          args: [
            "0x0000000000000000000000000000000000000000",
            parseEther(value.amount),
            0,
            "bifrost",
          ],
        });
      }

      if (selectedToken?.symbol === "vDOT") {
        if (availableCapabilities?.atomic?.status === "supported") {
          sendCalls({
            calls: [
              {
                to: TOKEN_LIST.filter((token) => token.symbol === "DOT")[0]
                  .address as Address,
                abi: erc20Abi,
                functionName: "approve",
                args: [L2SLPX_CONTRACT_ADDRESS, parseEther(value.amount)],
              },
              {
                to: L2SLPX_CONTRACT_ADDRESS,
                abi: l2SlpxAbi,
                functionName: "createOrder",
                args: [
                  TOKEN_LIST.filter((token) => token.symbol === "DOT")[0]
                    .address as Address,
                  parseEther(value.amount),
                  0,
                  "bifrost",
                ],
              },
            ],
          });
        }

        if (availableCapabilities?.atomic?.status !== "supported") {
          if (tokenAllowance === BigInt(0)) {
            writeContract({
              address: TOKEN_LIST.filter((token) => token.symbol === "DOT")[0]
                .address as Address,
              abi: erc20Abi,
              functionName: "approve",
              args: [L2SLPX_CONTRACT_ADDRESS, maxUint256],
            });
          }

          if (tokenAllowance && tokenAllowance >= parseEther(value.amount)) {
            writeContract({
              address: L2SLPX_CONTRACT_ADDRESS,
              abi: l2SlpxAbi,
              functionName: "createOrder",
              args: [
                TOKEN_LIST.filter((token) => token.symbol === "DOT")[0]
                  .address as Address,
                parseEther(value.amount),
                0,
                "bifrost",
              ],
            });
          }
        }
      }
    },
  });

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const { isLoading: isSendingCalls } = useWaitForCallsStatus({
    id: batchCallsId?.id,
  });

  const {
    data: batchCallsStatus,
    isLoading: isBatchCallsLoading,
    isSuccess: isBatchCallsSuccess,
  } = useCallsStatus(
    batchCallsId
      ? {
          id: batchCallsId.id,
        }
      : {
          id: "",
        }
  );

  useEffect(() => {
    if (isConfirming || isSendingCalls) {
      setOpen(true);
    }
  }, [isConfirming, isSendingCalls]);

  useEffect(() => {
    if (isConfirmed) {
      refetchTokenAllowance();
    }
  }, [isConfirmed, refetchTokenAllowance]);

  return (
    <div className="flex flex-col gap-4 w-full p-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold"></h1>
        <p className="text-muted-foreground">Deposit to the Yield Delegation Vault</p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div className="flex flex-col gap-4">
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
                <SelectDepositToken key={token.symbol} token={token} />
              ))}
            </SelectContent>
          </Select>
      <TransactionStatus
        hash={hash || batchCallsStatus?.receipts?.[0]?.transactionHash}
        isPending={isPending || isSendingCalls}
        isConfirming={isConfirming || isBatchCallsLoading}
        isConfirmed={isConfirmed || isBatchCallsSuccess}
        error={(error as BaseError) || (batchError as BaseError)}
        config={config}
        chainId={chainId}
        open={open}
        onOpenChange={setOpen}
      />
    </div>
  );
}


function SelectWithdrawToken({ token }: { token: Token }) {
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
