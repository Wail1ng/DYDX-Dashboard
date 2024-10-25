import React from "react";
import { getAllBalanceData } from "@/services/dydx";
import { Card, CardHeader, CardContent, CardTitle } from "./ui/card";
import { formatNumber, formatUSDC } from "@/lib/formatter";

export async function RewardsCard({
  delegator_address,
}: {
  delegator_address: string;
}) {
  const data = await getAllBalanceData(delegator_address);
  const DENOM_USDC = process.env.NEXT_PUBLIC_DENOM_USDC;
  const DENOM_DYDX = process.env.NEXT_PUBLIC_DENOM_DYDX;
  const DENOM_STDYDX = process.env.NEXT_PUBLIC_DENOM_STDYDX;

  const denomConfig = {
    [DENOM_USDC || '']: { label: "USDC", format: formatUSDC, logo:"USDCoin.svg" },
    [DENOM_DYDX || '']: { label: "DYDX", format: formatNumber, logo:"dydx-circle.svg" },
    [DENOM_STDYDX || '']: { label: "STDYDX", format: formatNumber, logo:"stdydx.svg" },
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
            <div key={index} className="flex items-center space-x-2 mb-2">
              <img src={config.logo} alt={config.label}  width={24} height={24} />
              <p>{config.format(balanceData.amount)} {config.label}</p>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

export default RewardsCard;
