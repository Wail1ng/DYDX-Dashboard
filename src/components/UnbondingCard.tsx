import React from "react";
import { getUnbondingData } from "@/services/dydx";

export async function UnbondingCard({
  delegator_address,
}: {
  delegator_address: string;
}) {
  const data = await getUnbondingData(delegator_address);


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
    {/* @ts-ignore */}
    {data?.unbonding_responses.map((unbondingResponse, index) => (
      <div key={index}>
        <p>Validator Address: {unbondingResponse.validator_address}</p>
        {/* @ts-ignore */}
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
