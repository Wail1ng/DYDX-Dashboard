"use client";
import React from "react";
import { useAllBalanceData } from "@/hooks/useAllBalanceData";

export function RewardsCard({
  delegator_address,
}: {
  delegator_address: string;
}) {
  const { data, loading, error } = useAllBalanceData(delegator_address);

  if (loading) return <div>Chargement des balances...</div>;
  if (error)
    return <div>Erreur lors du chargement des balances: {error.message}</div>;

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
      {data?.balances.map((balanceData, index) => (
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
