import React, { Suspense } from "react";
import CosmosInfo from "./CosmoStation";
import BalanceCard from "./BalanceCard";
import StakingCard from "./StakingCard";
import RewardsCard from "./RewardsCard";
import UnbondingCard from "./UnbondingCard";
import DelegatorCard from "./DelegatorCard";
import DelegationCard from "./DelegationCard";
import AllBalanceCard from "./AllBalanceCard";

const Dashboard = ({ address }: { address: string }) => {
  return (
    <>
      <Suspense key={address} fallback={<p>loading CosmosInfo ....</p>}>
        <CosmosInfo address={address} />
      </Suspense>

      <Suspense fallback={<p>loading StakingCard ....</p>}>
        <StakingCard address={address} />
      </Suspense>
      <Suspense fallback={<p>loading BalanceCard ....</p>}>
        <BalanceCard address={address} />
      </Suspense>

      <Suspense fallback={<p>loading UnbondingCard ....</p>}>
        <UnbondingCard delegator_address={address} />
      </Suspense>

      <Suspense fallback={<p>loading DelegationCard ....</p>}>
        <DelegationCard delegator_address={address} />
      </Suspense>
      <Suspense fallback={<p>loading DelegatorCard ....</p>}>
      <DelegatorCard delegator_address={address} />
      </Suspense>

      <Suspense fallback={<p>loading AllBalanceCard ....</p>}>
        <AllBalanceCard delegator_address={address} /> 
      </Suspense>
      <Suspense fallback={<p>loading RewardsCard ....</p>}>
        <RewardsCard delegator_address={address} />
      </Suspense>
    </>
  );
};

export default Dashboard;
