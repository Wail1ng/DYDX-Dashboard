// components/Dashboard.js
import React from "react";
import StakingCard from "./StakingCard";
import BalanceCard from "./BalanceCard";
import RewardsCard from "./RewardsCard";
import UnbondingCard from "./UnbondingCard";
import DelegatorCard from "./DelegatorCard";
import DelegationCard from "./DelegationCard";
import AllBalanceCard from "./AllBalanceCard";

const Dashboard = ({ address }: { address: string }) => {
  return (
    <div>
      <StakingCard address={address} />
      <BalanceCard address={address} />
      <RewardsCard delegator_address={address} />
      <UnbondingCard delegator_address={address} />
      <DelegatorCard delegator_address={address} />
      <DelegationCard delegator_address={address} />
      <AllBalanceCard delegator_address={address} />
    </div>
  );
};

export default Dashboard;
