export interface BalancesProps {
  nativeBalance: bigint;
  isNativeBalanceLoading: boolean;
  refetchNativeBalance: () => void;
  tokenBalances: bigint[];
  isTokenBalancesLoading: boolean;
  refetchTokenBalances: () => void;
}