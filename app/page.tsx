import Link from "next/link";
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center h-screen">
      <div className="flex flex-col gap-2 items-center">
        <h1 className="text-4xl font-bold">Bifrost Components</h1>
        <p className="text-lg">A collection of components for interacting with Bifrost protocol</p>
      </div>
      <div className="flex flex-col gap-4">
        <Link href="/mint-redeem-component">
          <div className="flex flex-row gap-2 items-center border rounded-lg p-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-foreground/10">
            Mint and Redeem Component
            <ArrowRight className="w-4 h-4" />
          </div>
        </Link>
        <Link href="/yield-delegation-vault-component">
          <div className="flex flex-row gap-2 items-center border rounded-lg p-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-foreground/10">
            Yield Delegation Vault Component
            <ArrowRight className="w-4 h-4" />
          </div>
        </Link>
      </div>
    </div>
  );
}