import { formatNumber } from '@/lib/formatter';
import { getBalanceData } from "@/services/dydx";

export async function BalanceCard({ address }: { address: string }) {
  const data = await getBalanceData(address, "dydx");

  return (
    <div
      style={{
        border: "1px solid black",
        padding: "1rem",
        margin: "1rem 0",
        textAlign: "left",
      }}
    >
      <li>Balance Info {formatNumber(data?.balance?.amount)} {data?.balance?.denom}</li>
    </div>
  );
}

export default BalanceCard;
