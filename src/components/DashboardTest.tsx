import React from "react";
import BalanceCard from "./BalanceCard";
import StakingCard from "./StakingCard";
import RewardsCard from "./AllBalanceCard";
import UnbondingCard from "./UnbondingCard";
import { DelegatorCard } from "./DelegationCard";
import DelegationCard from "./OldDelegationCard";
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
