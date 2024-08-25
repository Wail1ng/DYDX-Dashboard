import Dashboard from "@/components/Dashboard";
import Search from "@/components/Search";
import { Suspense } from "react";

export default function HomePage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const query =
    searchParams?.query || "dydx144lgmly4qlgnuftqw8z8lpf80ggdw4ju3e3mcx";

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full items-center justify-between font-mono text-sm lg:flex flex-col">
        <Search placeholder="Search address..." />
        <Suspense key={query}>
          <Dashboard address={query} />
        </Suspense>
      </div>
    </main>
  );
}
