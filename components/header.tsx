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
          width={150}
          height={150}
          className="invert"
        />
      </Link>
      <ConnectButton />
    </header>
  );
}
