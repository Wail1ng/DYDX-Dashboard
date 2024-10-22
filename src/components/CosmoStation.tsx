import { getBalances } from '@/services/mintscan';
import { ComponentChart } from '@/components/Chart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

type CosmosInfoProps = {
  address: string;
  params: { fromDateTime: string, toDateTime: string, take: number }
}

export default async function CosmosInfo({ address, params }: CosmosInfoProps) {

  const balances = await getBalances(address, true, params);

  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Area Chart</CardTitle>
        <CardDescription>
          Showing total visitors for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ComponentChart chartData={balances} />
      </CardContent>
    </Card>
  );
}