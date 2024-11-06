import { formatNumber } from '@/lib/formatter';
import { getBalanceData } from "@/services/dydx";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';

export async function BalanceCard({ address }: { address: string }) {
  try {
    const data = await getBalanceData(address, "dydx");
    if (!data?.balance?.amount) {
      return (
        <Card className="bg-gray-50">
          <CardHeader>
            <CardTitle>Available Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">No balance data available</p>
          </CardContent>
        </Card>
      );
    }
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
  } catch (error) {
    return (
      <Card className="bg-red-50">
        <CardHeader>
          <CardTitle>Available Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">Error loading balance data</p>
        </CardContent>
      </Card>
    );
  }
}

export default BalanceCard;
