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

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Balance Available</CardTitle>
      </CardHeader>
      <CardContent>
        {data?.balances.map((balanceData: any, index: number) => (
          <div key={index}>
            <p>{balanceData.denom}</p>
            <p>
              {balanceData.denom === process.env.NEXT_PUBLIC_DENOM_UDSC
                ? formatUSDC(balanceData.amount)
                : balanceData.denom === process.env.NEXT_PUBLIC_DENOM_STDYDX
                  ? formatDYDX(balanceData.amount)
                  : balanceData.amount}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default RewardsCard;
