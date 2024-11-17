import React, { Suspense } from "react";
import CosmosInfo from "./CosmoStation";
import BalanceCard from "./BalanceCard";
import StakingCard from "./StakingCard";
import RewardsCard from "./RewardsCard";
import UnbondingCard from "./UnbondingCard";
import DelegationCard from "./DelegationCard";
import StakedBalanceCard from "./StakingCard";
import AllBalanceCard from "./AllBalanceCard";

const Dashboard = ({ address, params }: { address: string, params: { fromDateTime: string, toDateTime: string, take: number } }) => {
  return (
    <>
      <Suspense key={address} fallback={<p>loading CosmosInfo ....</p>}>
        <CosmosInfo address={address} params={params} />
      </Suspense>
      <div className="flex flex-wrap gap-2">
        <Suspense fallback={<p>loading ....</p>}>
          <BalanceCard address={address} />
          <RewardsCard address={address} />
        </Suspense>
        <Suspense fallback={<p>loading StakingCard....</p>}>
          <StakingCard delegator_address={address} />
        </Suspense>
        <Suspense fallback={<p>loading AllBalanceCard ....</p>}>
          <AllBalanceCard delegator_address={address} />
        </Suspense>
        {/* You can continue to add more cards here if needed */}
      </div>
    </>
  );
};

export default Dashboard;
