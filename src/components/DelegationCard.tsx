"use client";
import React from "react";
import { useDelegationData } from "@/hooks/dydx/useDelegationData";

export function DelegationCard({
  delegator_address,
}: {
  delegator_address: string;
}) {
  const { data, loading } = useDelegationData(delegator_address);

  if (loading) return <div>Chargement des délégations...</div>;

  return (
    <div
      style={{
        border: "1px solid black",
        padding: "1rem",
        margin: "1rem 0",
        textAlign: "left",
      }}
    >
      <h2>Delegation Info</h2>
      {data?.delegation_response ? (
        <div>
          <p>Delegator Address: {data.delegation_response.delegation.delegator_address}</p>
          <p>Validator Address: {data.delegation_response.delegation.validator_address}</p>
          <p>Shares: {data.delegation_response.delegation.shares}</p>
          <p>Balance: {data.delegation_response.balance.amount} {data.delegation_response.balance.denom}</p>
        </div>
      ) : (
        <p>No delegation data available.</p>
      )}
    </div>
  );
}

export default DelegationCard;
