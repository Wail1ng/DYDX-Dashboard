import React from "react";
import { AddressWallet } from "@/types/type";
import { stakingFormatter, formatNumber } from "@/lib/formatter";
import { getStakingData } from "@/services/dydx";
import { Card, CardHeader, CardContent, CardTitle } from "./ui/card";

const StakingCard = async ({ address }: AddressWallet) => {
  try {
    let data = await getStakingData(address);
    const formattedData = data ? stakingFormatter(data) : null;

    if (!data.data) {
      return (
        <Card className="bg-gray-50">
          <CardHeader>
            <CardTitle>Staking Info</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">No Staking data available</p>
          </CardContent>
        </Card>
      );
    }
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
  } catch (error) {
    return (
      <Card className="bg-gray-50">
        <CardHeader>
          <CardTitle>Staking Info</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">Error loading Staking data</p>
        </CardContent>
      </Card>
    );
  }
};

export default StakingCard;
