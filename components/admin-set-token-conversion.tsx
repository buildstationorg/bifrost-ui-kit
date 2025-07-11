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
  useWriteContract,
  useChainId,
  useConfig,
} from "wagmi";
import type { Token } from "@/types/token";
import Image from "next/image";
import { useForm } from "@tanstack/react-form";
import type { AnyFieldApi } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import { parseEther, Address, formatEther } from "viem";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Loader2 } from "lucide-react";
import { TransactionStatus } from "@/components/transaction-status";
import { L2SLPX_CONTRACT_ADDRESSES } from "@/lib/constants";


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

export default function AdminSetTokenConversion() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const config = useConfig();
  const chainId = useChainId();
  const [open, setOpen] = useState(false);

  const { data: hash, error, isPending, writeContract } = useWriteContract();

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

  const form = useForm({
    defaultValues: {
      selectedToken: "",
      operation: "",
      tokenConversionRate: "",
    },
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  useEffect(() => {
    if (isConfirming) {
      setOpen(true);
    }
  }, [isConfirming]);

  return (
    <div className="flex flex-col gap-4 w-full p-4">
      <div className="flex flex-col gap-2">
        <p className="text-muted-foreground">Set the LST conversion rate</p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div className="flex flex-col gap-4">
          <form.Field name="selectedToken">
            {(field) => (
              <Select
                value={field.state.value}
                onValueChange={(value) => {
                  field.handleChange(value);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a token" />
                </SelectTrigger>
                <SelectContent>
                  {tokens.map((token) => (
                    <SelectToken key={token.symbol} token={token} />
                  ))}
                </SelectContent>
              </Select>
            )}
          </form.Field>
          <form.Field name="operation">
            {(field) => (
              <Select
                value={field.state.value}
                onValueChange={(value) => {
                  field.handleChange(value);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select an operation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Mint</SelectItem>
                  <SelectItem value="1">Redeem</SelectItem>
                </SelectContent>
              </Select>
            )}
          </form.Field>
          <div className="flex flex-col gap-2 rounded-lg border p-4">
            <div>
              {/* A type-safe field component*/}
              <form.Field
                name="tokenConversionRate"
                validators={{
                  onChange: ({ value }) =>
                    !value
                      ? "Please enter a token conversion rate"
                      : parseEther(value) < 0
                      ? "Token conversion rate must be greater than 0"
                      : undefined,
                }}
              >
                {(field) => (
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-row gap-2 items-center justify-between">
                      <p className="text-muted-foreground">Conversion rate</p>
                    </div>
                    <div className="flex flex-row gap-2">
                      {isDesktop ? (
                        <input
                          id={field.name}
                          name={field.name}
                          value={field.state.value || ""}
                          onChange={(e) => field.handleChange(e.target.value)}
                          className="bg-transparent text-4xl outline-none w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          type="number"
                          placeholder="0"
                          required
                        />
                      ) : (
                        <input
                          id={field.name}
                          name={field.name}
                          value={field.state.value || ""}
                          onChange={(e) => field.handleChange(e.target.value)}
                          className="bg-transparent text-4xl outline-none w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          type="number"
                          inputMode="decimal"
                          pattern="[0-9]*"
                          placeholder="0"
                          required
                        />
                      )}
                    </div>
                    <FieldInfo field={field} />
                  </div>
                )}
              </form.Field>
            </div>
          </div>
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <Button
                size="lg"
                className="hover:cursor-pointer text-lg font-bold"
                type="submit"
                disabled={!canSubmit || isSubmitting || isPending}
              >
                {isSubmitting || isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Please confirm in wallet
                  </>
                ) : (
                  <>Submit</>
                )}
              </Button>
            )}
          </form.Subscribe>
        </div>
      </form>
      <TransactionStatus
        hash={hash}
        isPending={isPending}
        isConfirming={isConfirming}
        isConfirmed={isConfirmed}
        error={error as BaseError}
        config={config}
        chainId={chainId}
        open={open}
        onOpenChange={setOpen}
      />
    </div>
  );
}

function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {!field.state.meta.isTouched ? (
        <em>Please enter an amount to mint</em>
      ) : field.state.meta.isTouched && !field.state.meta.isValid ? (
        <em
          className={`${
            field.state.meta.errors.join(",") ===
            "Please enter an amount to mint"
              ? ""
              : "text-red-500"
          }`}
        >
          {field.state.meta.errors.join(",")}
        </em>
      ) : (
        <em className="text-green-500">ok!</em>
      )}
      {field.state.meta.isValidating ? "Validating..." : null}
    </>
  );
}

function SelectToken({ token }: { token: Token }) {
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
