"use client";
import BalancesComponent from "@/components/balances-component";
import { useBalance, useAccount, useReadContracts } from "wagmi";
import { erc20Abi, Address } from "viem";
import { TOKEN_LIST } from "@/lib/constants";

export default function Page() {
  const { address } = useAccount();

  const {
    data: nativeBalance,
    isLoading: isLoadingNativeBalance,
    refetch: refetchNativeBalance,
  } = useBalance({
    address: address,
  });

  const {
    data: tokenBalances,
    isLoading: isTokenBalancesLoading,
    refetch: refetchTokenBalances,
  } = useReadContracts({
    contracts: [
      // DOT
      {
        abi: erc20Abi,
        address: TOKEN_LIST.filter((token) => token.symbol === "DOT")[0]
          .address as Address,
        functionName: "balanceOf",
        args: [address as Address],
      },
      // vETH
      {
        abi: erc20Abi,
        address: TOKEN_LIST.filter((token) => token.symbol === "vETH")[0]
          .address as Address,
        functionName: "balanceOf",
        args: [address as Address],
      },
      // vDOT
      {
        abi: erc20Abi,
        address: TOKEN_LIST.filter((token) => token.symbol === "vDOT")[0]
          .address as Address,
        functionName: "balanceOf",
        args: [address as Address],
      },
    ],
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <BalancesComponent
        nativeBalance={nativeBalance?.value ?? BigInt(0)}
        isNativeBalanceLoading={isLoadingNativeBalance}
        refetchNativeBalance={refetchNativeBalance}
        tokenBalances={
          tokenBalances?.map((token) => token.result ?? BigInt(0)) ?? []
        }
        isTokenBalancesLoading={isTokenBalancesLoading}
        refetchTokenBalances={refetchTokenBalances}
      />
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Yield Delegation Vault Component</h1>
      </div>
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Yield Delegation Vault Component</h1>
      </div>
    </div>
  );
}
