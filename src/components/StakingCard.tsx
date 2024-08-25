"use client";
import React from "react";
import { useStakingData } from "../hooks/useStakingData";
import { AddressWallet } from "@/types/type";
import { stakingFormatter } from "@/utils/formatter";

const StakingCard = ({ address }: AddressWallet) => {
  const { data, loading, error } = useStakingData(address);

  const formattedData = data ? stakingFormatter(data) : null;
  if (loading) return <div>Chargement des données de staking...</div>;
  if (error)
    return (
      <div>
        Erreur lors du chargement des données de staking:{" "}
        {(error as Error).message}
      </div>
    );

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
      <p>Total Staked: {formattedData?.totalStaked}</p>
      <ul>
        {formattedData?.validators.map((validator, index) => (
          <div key={index}>
            <li>Validator: {validator.validatorAddress}</li>
            <li>Amount: {validator.amount}</li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default StakingCard;
