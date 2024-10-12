import { formatNumber } from '@/lib/formatter';
import { getBalanceData } from "@/services/dydx";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';

export async function BalanceCard({ address }: { address: string }) {
  const data = await getBalanceData(address, "dydx");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Available Balance</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{formatNumber(data?.balance?.amount)} {data?.balance?.denom}</p>
      </CardContent>
    </Card>
  );
}

export default BalanceCard;
