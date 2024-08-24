import Image from "next/image";
import { BalanceCard } from "./components/BalanceCard";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <BalanceCard address={"dydx144lgmly4qlgnuftqw8z8lpf80ggdw4ju3e3mcx"}></BalanceCard>
      </div>
    </main>
  );
}
