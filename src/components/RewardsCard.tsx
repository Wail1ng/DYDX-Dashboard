import React from "react";
import { getRewardsData } from "@/services/dydx"

export async function RewardsCard({
  delegator_address,
}: {
  delegator_address: string;
}) {
    const data = await getRewardsData(delegator_address);

  return (
    <div
      style={{
        border: "1px solid black",
        padding: "1rem",
        margin: "1rem 0",
        textAlign: "left",
      }}
    >
      <h2>Rewards Info</h2>
      {data?.rewards.map((rewardData: any, index: number) => (
        <div key={index}>
          <p>Validator Address: {rewardData.validator_address}</p>
          {/* @ts-ignore */}
          {rewardData.reward.map((reward, idx) => (
            <div key={idx}>
              <p>Amount: {reward.amount}</p>
              <p>Denom: {reward.denom}</p>
            </div>
          ))}
        </div>
      ))}
      <h3>Total</h3>
      {/* @ts-ignore */}
      {data?.total.map((total, index) => (
        <div key={index}>
          <p>Amount: {total.amount}</p>
          <p>Denom: {total.denom}</p>
        </div>
      ))}
    </div>
  );
}

export default RewardsCard;
