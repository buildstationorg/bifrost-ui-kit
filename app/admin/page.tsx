"use client";

import AdminBalancesComponent from "@/components/admin-balances-component";
import AdminMintComponent from "@/components/admin-mint-component";
import AdminGetTokenConversion from "@/components/admin-get-token-conversion";
import AdminSetTokenConversion from "@/components/admin-set-token-conversion";
import { useBalance, useAccount, useReadContracts } from "wagmi";
import { erc20Abi, Address } from "viem";
import { TOKEN_LIST2 } from "@/lib/constants";

export default function AdminPage() {
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
        address: TOKEN_LIST2.filter((token) => token.symbol === "DOT")[0]
          .address as Address,
        functionName: "balanceOf",
        args: [address as Address],
      },
      // vDOT
      {
        abi: erc20Abi,
        address: TOKEN_LIST2.filter((token) => token.symbol === "vDOT")[0]
          .address as Address,
        functionName: "balanceOf",
        args: [address as Address],
      },
    ],
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <AdminBalancesComponent
        nativeBalance={nativeBalance?.value ?? BigInt(0)}
        isNativeBalanceLoading={isLoadingNativeBalance}
        refetchNativeBalance={refetchNativeBalance}
        tokenBalances={
          tokenBalances?.map((token) => token.result ?? BigInt(0)) ?? []
        }
        isTokenBalancesLoading={isTokenBalancesLoading}
        refetchTokenBalances={refetchTokenBalances}
      />
      <AdminMintComponent />
      <div className="flex flex-col gap-4">
        <AdminGetTokenConversion />
        <AdminSetTokenConversion />
      </div>
    </div>
  );
}
