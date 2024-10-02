"use client";
import React from "react";
import { useRewardsData } from "@/hooks/dydx/useRewardsData";

export function RewardsCard({
  delegator_address,
}: {
  delegator_address: string;
}) {
  const { data, loading, error } = useRewardsData(delegator_address);

  if (loading) return <div>Chargement des récompenses...</div>;
  if (error)
    
    return <div>Erreur lors du chargement des récompenses: {error.message}</div>;

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
      {data?.rewards.map((rewardData, index) => (
        <div key={index}>
          <p>Validator Address: {rewardData.validator_address}</p>
          {rewardData.reward.map((reward, idx) => (
            <div key={idx}>
              <p>Amount: {reward.amount}</p>
              <p>Denom: {reward.denom}</p>
            </div>
          ))}
        </div>
      ))}
      <h3>Total</h3>
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
