import Dashboard from "@/components/Dashboard";
import FilterDate from "@/components/RadioDateBalance";
import Search from "@/components/Search";

export default function HomePage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    fromDateTime?: string;
    toDateTime?: string;
  };
}) {

  const defaultAddress = process.env.NODE_ENV === 'development'
    ? process.env.DEFAULT_ADDRESS
    : '';

  const query = searchParams?.query || defaultAddress;

  const fromDateTime = searchParams?.fromDateTime || "";
  const toDateTime = searchParams?.toDateTime || "";
  const params = {
    fromDateTime,
    toDateTime,
    take: 20
  };


  return (
    <main className="flex flex-col items-center justify-between p-24">
      <div className="z-10 w-full items-center justify-between font-mono text-sm lg:flex flex-col">
        <Search placeholder="Search address..." />
        <FilterDate placeholder="Filter by date" />
        {query && <Dashboard address={query} params={params} />}
      </div>
    </main>
  );
}
