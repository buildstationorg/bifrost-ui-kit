import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Header() {
  return (
    <header className="flex flex-row justify-between items-center w-full p-4">
      <h1 className="text-2xl font-bold">Bifrost</h1>
      <ConnectButton />
    </header>
  );
}