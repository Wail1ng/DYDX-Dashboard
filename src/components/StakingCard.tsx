import React from "react";
import { AddressWallet } from "@/types/type";
import { stakingFormatter, formatNumber } from "@/lib/formatter";
import { getStakingData } from "@/services/dydx";

const StakingCard = async ({ address }: AddressWallet) => {
  let data = await getStakingData(address, "token");

  const formattedData = data ? stakingFormatter(data) : null;

  return (
    <div
      style={{
        border: "1px solid black",
        padding: "1rem",
        margin: "1rem 0",
        textAlign: "left",
      }}
    >
      <h2>Staking Info</h2>
      <p>Total Staked: {formatNumber(formattedData?.totalStaked)}</p>
      <ul>
        {/* @ts-ignore */}
        {formattedData?.validators.map((validator, index) => (
          <div key={index}>
            <li>Validator: {validator.validatorAddress}</li>
            <li>Amount: {formatNumber(validator.amount)} DYDX</li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default StakingCard;
