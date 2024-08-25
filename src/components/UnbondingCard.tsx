"use client";
import React from "react";
import { useUnbondingData } from "@/hooks/useUnbondingData";
// import { UnbondingData } from "@/types/type";

export type UnbondingData = {
  unbonding_responses: {
    delegator_address: string;
    validator_address: string;
    entries: {
      creation_height: string;
      completion_time: string;
      initial_balance: string;
      balance: string;
      unbonding_id: string;
      unbonding_on_hold_ref_count: string;
    }[];
  }[];
  pagination: {
    next_key: string;
    total: string;
  };
};

export function UnbondingCard({
  delegator_address,
}: {
  delegator_address: string;
}) {
  const { data, loading, error } = useUnbondingData(delegator_address);

  if (loading) return <div>Chargement des récompenses...</div>;
  if (error)
    return <div>Erreur lors du chargement des récompenses: {error.message}</div>;

  console.log('data', data);

  return (
    <div
    style={{
      border: "1px solid black",
      padding: "1rem",
      margin: "1rem 0",
      textAlign: "left",
    }}
  >
    <h2>Unbonding Info</h2>
    {data?.unbonding_responses.map((unbondingResponse, index) => (
      <div key={index}>
        <p>Validator Address: {unbondingResponse.validator_address}</p>
        {unbondingResponse.entries.map((entry, idx) => (
          <div key={idx}>
            <p>Creation Height: {entry.creation_height}</p>
            <p>Completion Time: {new Date(entry.completion_time).toLocaleString()}</p>
            <p>Initial Balance: {entry.initial_balance}</p>
            <p>Balance: {entry.balance}</p>
            <p>Unbonding ID: {entry.unbonding_id}</p>
            <p>Unbonding On Hold Ref Count: {entry.unbonding_on_hold_ref_count}</p>
          </div>
        ))}
      </div>
    ))}
    <h3>Pagination Info</h3>
    <p>Next Key: {data?.pagination.next_key}</p>
    <p>Total: {data?.pagination.total}</p>
  </div>
  );
}

export default UnbondingCard;
