import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="flex flex-row justify-between items-center w-full p-4">
      <Link href="/">
        <Image
          src="/bifrost-full-mono.svg"
          alt="Bifrost Logo"
          width={100}
          height={100}
          className="invert"
        />
      </Link>
      <ConnectButton />
    </header>
  );
}
