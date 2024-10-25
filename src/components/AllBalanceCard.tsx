import React from "react";
import { getAllBalanceData } from "@/services/dydx";
import { Card, CardHeader, CardContent, CardTitle } from "./ui/card";

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
            <p>{balanceData.amount}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default RewardsCard;
