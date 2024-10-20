'use client'
import { formatDYDX } from '@/lib/formatter';
import { getBalances, getBalances2 } from '@/services/mintscan';
import { ComponentChart } from '@/components/Chart';
import { formatDateToLocal } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { TrendingUp } from 'lucide-react';
import FilterDate from './RadioDateBalance';
import { useSearchParams } from 'next/navigation';

type CosmosInfoProps = {
  address: string;
}

function transformBalancesToChartData(balances: any[]) {
  return balances.map(balanceObj => {
    const timestamp = balanceObj.timestamp;

    // Sum up the delegation balances
    let totalDelegation: number = balanceObj.delegation.reduce((sum: number, delegationItem: any) => {
      const amount = parseFloat(delegationItem.balance.amount);
      return sum + amount;
    }, 0);
    return {
      timestamp: formatDateToLocal(timestamp),
      totalDelegation: formatDYDX(totalDelegation)
    };
  });
}

export default async function CosmosInfo({ address }: CosmosInfoProps) {
  // const searchParams = useSearchParams();
  // const fromParam = searchParams.get('fromDateTime');
  // const toParam = searchParams.get('toDateTime');
  // const params = {
  //   fromDateTime: fromParam,
  //   toDateTime: toParam,
  //   take: 20
  // };
  // console.log('params', params);

  const token = process.env.NEXT_PUBLIC_COSMOSTATION_API_KEY;
  if (!token) {
    throw new Error("NEXT_PUBLIC_COSMOSTATION_API_KEY is not defined");
  }
  const balances = await getBalances(address, true);
  const chartData = transformBalancesToChartData(balances.balances);
  /*     [
        {
          "timestamp": "January",
          "totalDelegation": 5765
        },
        {
          "timestamp": "February",
          "totalDelegation": 13605
        },
        {
          "timestamp": "March",
          "totalDelegation": 13770
        },
        {
          "timestamp": "April",
          "totalDelegation": 13940
        },
        {
          "timestamp": "July",
          "totalDelegation": 14385
        },
        {
          "timestamp": "August",
          "totalDelegation": 14180
        },
        {
          "timestamp": "September",
          "totalDelegation": 14050
        },
      ] */


  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Area Chart</CardTitle>
        <CardDescription>
          Showing total visitors for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ComponentChart chartData={chartData} />
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div>
          <FilterDate placeholder="Filter by date" />
        </div>
      </CardFooter>
    </Card>
  );
}