import React from "react";
import { getRewardsData } from "@/services/dydx"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export async function RewardsCard({
  delegator_address,
}: {
  delegator_address: string;
}) {
  const data = await getRewardsData(delegator_address);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Total Available Balance</CardTitle>
      </CardHeader>
      <CardContent>
        {data?.total.map((total, index) => (
          <div key={index}>
            <p>Amount: {total.amount}</p>
            <p>Denom: {total.denom}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default RewardsCard;
