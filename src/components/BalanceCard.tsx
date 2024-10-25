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
      <div className="flex items-center space-x-2 mb-2">
        <img src="dydx-circle.svg" alt="DYDX" width={24} height={24} />
        <p>{formatNumber(data?.balance?.amount)} DYDX</p>
      </div>
        </CardContent>
    </Card>
  );
}

export default BalanceCard;
