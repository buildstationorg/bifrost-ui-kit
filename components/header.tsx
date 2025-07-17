import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Header() {
  return (
    <header className="flex flex-row justify-between items-center w-full p-4">
      <Link href="/">
        <Image
          src="/bifrost-full-mono.svg"
          alt="Bifrost Logo"
          width={150}
          height={150}
          className="invert dark:invert-0"
        />
      </Link>
      <div className="flex flex-row gap-2">
        <ThemeToggle />
        <ConnectButton />
      </div>
    </header>
  );
}
