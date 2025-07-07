import type { BalancesProps } from "@/types/shared";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { formatEther } from "viem";
import { roundLongDecimals } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";

export default function AdminBalancesComponent({
  nativeBalance,
  isNativeBalanceLoading,
  refetchNativeBalance,
  tokenBalances,
  isTokenBalancesLoading,
  refetchTokenBalances,
}: BalancesProps) {

  async function handleRefetchAllBalances() {
    await refetchNativeBalance();
    await refetchTokenBalances();
  }

  return (
    <div className="flex flex-col gap-4 w-full p-4">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row justify-between gap-2">
          <h1 className="text-2xl font-bold">Tokens</h1>
          <Button
            className="hover:cursor-pointer"
            size="icon"
            onClick={handleRefetchAllBalances}
          >
            <RefreshCcw />
          </Button>
        </div>
        <p className="text-muted-foreground">Current wallet balances</p>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row justify-between gap-2">
          <div className="flex flex-row gap-2 items-center justify-center">
            <Image src="/dot.svg" alt="Westend" width={48} height={48} />
            <div className="flex flex-col">
              <p className="text-xl font-semibold">Westend</p>
              <p className="text-muted-foreground">Westend Asset Hub</p>
            </div>
          </div>
          <div className="flex flex-col text-right">
            <div className="text-xl">
              {isNativeBalanceLoading ? (
                <Skeleton className="w-12 h-4" />
              ) : (
                roundLongDecimals(
                  formatEther((nativeBalance as bigint) || BigInt(0)),
                  6
                )
              )}
            </div>
            <p className="text-muted-foreground">WND</p>
          </div>
        </div>
        <div className="flex flex-row justify-between gap-2">
          <div className="flex flex-row gap-2 items-center justify-center">
            <Image src="/dot.svg" alt="Polkadot" width={48} height={48} />
            <div className="flex flex-col">
              <p className="text-xl font-semibold">Polkadot</p>
              <p className="text-muted-foreground">Westend Asset Hub</p>
            </div>
          </div>
          <div className="flex flex-col text-right">
            <div className="text-xl">
              {isTokenBalancesLoading ? (
                <Skeleton className="w-12 h-4" />
              ) : (
                roundLongDecimals(
                  formatEther((tokenBalances?.[0] as bigint) || BigInt(0)),
                  6
                )
              )}
            </div>
            <p className="text-muted-foreground">DOT</p>
          </div>
        </div>
        <div className="flex flex-row justify-between gap-2">
          <div className="flex flex-row gap-2 items-center justify-center">
            <Image
              src="/vdot.svg"
              alt="Voucher Polkadot"
              width={48}
              height={48}
            />
            <div className="flex flex-col">
              <p className="text-xl font-semibold">Voucher DOT</p>
              <p className="text-muted-foreground">Westend Asset Hub</p>
            </div>
          </div>
          <div className="flex flex-col text-right">
            <div className="text-xl">
              {isTokenBalancesLoading ? (
                <Skeleton className="w-12 h-4" />
              ) : (
                roundLongDecimals(
                  formatEther((tokenBalances?.[2] as bigint) || BigInt(0)),
                  6
                )
              )}
            </div>
            <p className="text-muted-foreground">vDOT</p>
          </div>
        </div>
      </div>
    </div>
  );
}
