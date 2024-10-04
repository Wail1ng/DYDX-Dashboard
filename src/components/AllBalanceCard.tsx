import React from "react";
import { getAllBalanceData } from "@/services/dydx";

export async function RewardsCard({
  delegator_address,
}: {
  delegator_address: string;
}) {
  const data = await getAllBalanceData(delegator_address);

  return (
    <div
      style={{
        border: "1px solid black",
        padding: "1rem",
        margin: "1rem 0",
        textAlign: "left",
      }}
    >
      <h2>All Balance Info</h2>
      {data?.balances.map((balanceData: any, index: number) => (
        <div key={index}>
          <p>Denom: {balanceData.denom}</p>
          <p>Amount: {balanceData.amount}</p>
        </div>
      ))}
      <h3>Pagination Info</h3>
      <p>Next Key: {data?.pagination.next_key}</p>
      <p>Total: {data?.pagination.total}</p>
    </div>
  );
}

export default RewardsCard;
