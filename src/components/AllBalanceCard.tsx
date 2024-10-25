import React from "react";
import { getAllBalanceData } from "@/services/dydx";
import { Card, CardHeader, CardContent, CardTitle } from "./ui/card";
import { formatDYDX, formatNumber, formatUSDC } from "@/lib/formatter";

export async function RewardsCard({
  delegator_address,
}: {
  delegator_address: string;
}) {
  const data = await getAllBalanceData(delegator_address);
  const DENOM_USDC = process.env.NEXT_PUBLIC_DENOM_UDSC;
  const DENOM_DYDX = process.env.NEXT_PUBLIC_DENOM_STDYDX;
  const DENOM_ETH = process.env.NEXT_PUBLIC_DENOM_ETH;

  const denomConfig = {
    [DENOM_USDC || '']: { label: "USDC", format: formatUSDC },
    [DENOM_DYDX || '']: { label: "DYDX", format: formatDYDX },
    [DENOM_ETH || '']: { label: "ETH", format: formatNumber },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Balance Available</CardTitle>
      </CardHeader>
      <CardContent>
        {data?.balances.map((balanceData: { denom: string; amount: string | number }, index: number) => {
          const config = denomConfig[balanceData.denom] || { label: balanceData.denom, format: (amount: string) => amount };
          return (
            <div key={index}>
              <p>{config.label}</p>
              <p>{config.format(balanceData.amount)}</p>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

export default RewardsCard;
