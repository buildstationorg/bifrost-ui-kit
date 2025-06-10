"use client";

import { useState, useEffect } from "react";
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
  useReadContracts,
} from "wagmi";
import type { Token } from "@/types/token";
import Image from "next/image";
import {
  TOKEN_LIST,
  L2SLPX_CONTRACT_ADDRESS,
  YIELD_DELEGATION_VAULT_CONTRACT_ADDRESS,
} from "@/lib/constants";
import { useForm } from "@tanstack/react-form";
import type { AnyFieldApi } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import { parseEther, formatEther, Address, maxUint256, erc20Abi } from "viem";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  roundLongDecimals,
  formatNumberStringInput,
  formatNumberStringWithThousandSeparators,
} from "@/lib/utils";
import { Loader2, RefreshCcw, ArrowLeftRight } from "lucide-react";
import { l2SlpxAbi, yieldDelegationVaultAbi } from "@/lib/abis";
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

  const {
    data: dataBatch,
    isLoading: isDataBatchLoading,
    isError: isDataBatchError,
    error: dataBatchError,
    refetch: refetchDataBatch,
  } = useReadContracts({
    contracts: [
      // depositor records
      {
        address: YIELD_DELEGATION_VAULT_CONTRACT_ADDRESS,
        abi: yieldDelegationVaultAbi,
        functionName: "getDepositorRecord",
        args: [address as Address],
      },
      // vETH/ETH conversion info
      {
        address: L2SLPX_CONTRACT_ADDRESS,
        abi: l2SlpxAbi,
        functionName: "getTokenConversionInfo",
        args: ["0x0000000000000000000000000000000000000000"],
      },
      // vDOT/DOT conversion info
      {
        address: L2SLPX_CONTRACT_ADDRESS,
        abi: l2SlpxAbi,
        functionName: "getTokenConversionInfo",
        args: [
          TOKEN_LIST.filter((token) => token.symbol === "DOT")[0]
            .address as Address,
        ],
      },
    ],
  });

  console.log(dataBatch);

  const { data: hash, error, isPending, writeContract } = useWriteContract();

  // Batching
  // const {
  //   data: batchCallsId,
  //   isPending: isBatching,
  //   error: batchError,
  //   sendCalls,
  // } = useSendCalls();

  // const form = useForm({
  //   defaultValues: {
  //     amount: "",
  //   },
  //   onSubmit: async ({ value }) => {
  //     if (selectedToken?.symbol === "vETH") {
  //       writeContract({
  //         address: L2SLPX_CONTRACT_ADDRESS,
  //         abi: l2SlpxAbi,
  //         functionName: "createOrder",
  //         value: parseEther(value.amount),
  //         args: [
  //           "0x0000000000000000000000000000000000000000",
  //           parseEther(value.amount),
  //           0,
  //           "bifrost",
  //         ],
  //       });
  //     }

  //     if (selectedToken?.symbol === "vDOT") {
  //       if (availableCapabilities?.atomic?.status === "supported") {
  //         sendCalls({
  //           calls: [
  //             {
  //               to: TOKEN_LIST.filter((token) => token.symbol === "DOT")[0]
  //                 .address as Address,
  //               abi: erc20Abi,
  //               functionName: "approve",
  //               args: [L2SLPX_CONTRACT_ADDRESS, parseEther(value.amount)],
  //             },
  //             {
  //               to: L2SLPX_CONTRACT_ADDRESS,
  //               abi: l2SlpxAbi,
  //               functionName: "createOrder",
  //               args: [
  //                 TOKEN_LIST.filter((token) => token.symbol === "DOT")[0]
  //                   .address as Address,
  //                 parseEther(value.amount),
  //                 0,
  //                 "bifrost",
  //               ],
  //             },
  //           ],
  //         });
  //       }

  //       if (availableCapabilities?.atomic?.status !== "supported") {
  //         if (tokenAllowance === BigInt(0)) {
  //           writeContract({
  //             address: TOKEN_LIST.filter((token) => token.symbol === "DOT")[0]
  //               .address as Address,
  //             abi: erc20Abi,
  //             functionName: "approve",
  //             args: [L2SLPX_CONTRACT_ADDRESS, maxUint256],
  //           });
  //         }

  //         if (tokenAllowance && tokenAllowance >= parseEther(value.amount)) {
  //           writeContract({
  //             address: L2SLPX_CONTRACT_ADDRESS,
  //             abi: l2SlpxAbi,
  //             functionName: "createOrder",
  //             args: [
  //               TOKEN_LIST.filter((token) => token.symbol === "DOT")[0]
  //                 .address as Address,
  //               parseEther(value.amount),
  //               0,
  //               "bifrost",
  //             ],
  //           });
  //         }
  //       }
  //     }
  //   },
  // });

  // const { isLoading: isConfirming, isSuccess: isConfirmed } =
  //   useWaitForTransactionReceipt({
  //     hash,
  //   });

  // const { isLoading: isSendingCalls } = useWaitForCallsStatus({
  //   id: batchCallsId?.id,
  // });

  // const {
  //   data: batchCallsStatus,
  //   isLoading: isBatchCallsLoading,
  //   isSuccess: isBatchCallsSuccess,
  // } = useCallsStatus(
  //   batchCallsId
  //     ? {
  //         id: batchCallsId.id,
  //       }
  //     : {
  //         id: "",
  //       }
  // );

  // useEffect(() => {
  //   if (isConfirming || isSendingCalls) {
  //     setOpen(true);
  //   }
  // }, [isConfirming, isSendingCalls]);

  // useEffect(() => {
  //   if (isConfirmed) {
  //     refetchTokenAllowance();
  //   }
  // }, [isConfirmed, refetchTokenAllowance]);

  return (
    <div className="flex flex-col gap-4 w-full p-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Vault Deposits Management</h1>
        <p className="text-muted-foreground">
          Manage and withdraw your deposits from the Vault
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-xl font-bold">Overview</h2>
          <Button variant="secondary" size="icon" onClick={() => refetchDataBatch()}>
            <RefreshCcw />
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2 border border-muted-accent rounded-md p-4">
            <h2 className="text-md font-bold">vETH/ETH</h2>
            <p className="text-xl text-muted-foreground">
              {formatEther(
                dataBatch?.[1]?.result?.tokenConversionRate ?? BigInt(0)
              )}
            </p>
          </div>
          <div className="flex flex-col gap-2 border border-muted-accent rounded-md p-4">
            <h2 className="text-md font-bold">vDOT/DOT</h2>
            <p className="text-xl text-muted-foreground">
              {formatEther(
                dataBatch?.[2]?.result?.tokenConversionRate ?? BigInt(0)
              )}
            </p>
          </div>
        </div>
        <div className="col-span-2 flex flex-col gap-2 border border-muted-accent rounded-md p-4">
          <h2 className="text-md font-bold">Number of Deposits</h2>
          <p className="text-xl text-muted-foreground">
            {dataBatch?.[0]?.result?.totalNumberOfDeposits.toString()}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-bold">Deposits</h2>
          {
            dataBatch?.[0]?.result?.depositIds.map((depositId) => {
              return (
                <VaultDepositInfo key={depositId} depositId={depositId} />
              )
            })
          }
        </div>
      </div>
    </div>
  );
}

function VaultDepositInfo({ depositId }: { depositId: bigint }) {

  const { data: vaultDepositRecord, isLoading: isVaultDepositRecordLoading, isError: isVaultDepositRecordError, error: vaultDepositRecordError, refetch: refetchVaultDepositRecord } = useReadContract({
    address: YIELD_DELEGATION_VAULT_CONTRACT_ADDRESS,
    abi: yieldDelegationVaultAbi,
    functionName: "getVaultDepositRecord",
    args: [depositId],
  });

  function formatTokenAddress(tokenAddress: Address) {
    if (tokenAddress === "0x8bFA30329F2A7A7b72fa4A76FdcE8aC92284bb94") {
      return "vDOT";
    }
    if (tokenAddress === "0x6e0f9f2d25CC586965cBcF7017Ff89836ddeF9CC") {
      return "vETH";
    }
    return "n/a";
  }

  return (
    <div className="flex flex-col gap-2 border border-muted-accent rounded-md p-4">
      <div className="flex flex-row items-center justify-between">
        <h2 className="text-md font-bold text-center bg-primary text-secondary rounded-md px-2 py-1 w-fit">{depositId}</h2>
        
        <Button variant="secondary" size="icon" onClick={() => refetchVaultDepositRecord()}>
          <RefreshCcw />
        </Button>
      </div>
      <div className="flex flex-col gap-2 items-end">
        <div className="flex flex-row items-end gap-2">
          <p className="text-3xl font-bold">
            {formatEther(vaultDepositRecord?.amountDeposited ?? BigInt(0))}
          </p>
          <p className="text-xl font-medium">
            {formatTokenAddress(vaultDepositRecord?.tokenAddress ?? "0x0000000000000000000000000000000000000000")}
          </p>
        </div>

        <div className="flex flex-row items-center gap-2">
          <p className="text-lg text-muted-foreground">{formatEther(vaultDepositRecord?.depositConversionRate ?? BigInt(0))}</p>
          <ArrowLeftRight className="w-4 h-4 text-muted-foreground" />
        </div>
      </div>
    </div>
  );
}