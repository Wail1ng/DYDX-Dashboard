import React from "react";
import { getValidatorData } from "@/services/dydx";
import { formatDYDX } from "@/lib/formatter";

export async function DelegationCard({
  delegator_address,
}: {
  delegator_address: string;
}) {
  const data = await getValidatorData(delegator_address);

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
          <p>Shares: {formatDYDX(data.delegation_response.delegation.shares)}</p>
          <p>Balance: {formatDYDX(data.delegation_response.balance.amount)} {data.delegation_response.balance.denom}</p>
        </div>
      ) : (
        <p>No delegation data available.</p>
      )}
    </div>
  );
}

export default DelegationCard;
