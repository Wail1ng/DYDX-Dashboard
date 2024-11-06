import { getBalances } from '@/services/mintscan';
import { ComponentChart } from '@/components/Chart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { formatDate } from 'date-fns';

type CosmosInfoProps = {
  address: string;
  params: { fromDateTime: string, toDateTime: string, take: number }
}

export default async function CosmosInfo({ address, params }: CosmosInfoProps) {
  try {
    const balances = await getBalances(address, true, params);
    // @ts-ignore
    if (balances.length === 0) {
      return (
        <Card className="bg-gray-50">
          <CardHeader>
            <CardTitle>Available Balance Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">No balance data available</p>
          </CardContent>
        </Card>
      )
    }
    return (
      <Card className="">
        <CardHeader>
          <CardTitle>Available Balance Chart</CardTitle>
          <CardDescription>
            Showing total available balance for the date between {formatDate(params.fromDateTime, 'MMM d, yyyy')} to {formatDate(params.toDateTime, 'MMM d, yyyy')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ComponentChart chartData={balances} />
        </CardContent>
      </Card>
    );
  } catch (error) {
    return (
      <Card className="bg-red-50">
        <CardHeader>
          <CardTitle>Available Balance Chart</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">Error loading balances graph data</p>
        </CardContent>
      </Card>
    );
  }
}
