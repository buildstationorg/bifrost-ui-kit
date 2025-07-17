import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="scroll-m-20 text-7xl font-extrabold tracking-tight text-balance">
        Bifrost Build Kit
      </h1>
      <p className="text-muted-foreground text-2xl">
        A kit to build with Bifrost protocol
      </p>
      <Button className="w-fit">
        Get Started <ArrowRight />
      </Button>
    </div>
  );
}
