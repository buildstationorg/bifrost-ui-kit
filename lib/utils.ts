import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function roundLongDecimals(string?: string, decimals?: number) {
  if (!string || !decimals) {
    return "-";
  }

  if (string === "0") {
    return "0";
  }

  // if stringToNumber doesn't have decimals, don't add them
  if (!string.includes(".")) {
    return string;
  }

  const stringToNumber = Number(string);
  return stringToNumber.toFixed(decimals);
}