import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="flex flex-row justify-between items-center w-full p-4">
      <Link href="/">
        <h1 className="text-2xl font-bold">Bifrost</h1>
      </Link>
      <ConnectButton />
    </header>
  );
}