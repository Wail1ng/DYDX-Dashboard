import React from "react";
import CosmosInfo from "./CosmoStation";

const Dashboard = ({ address }: { address: string }) => {
  return (
    <div>
      <CosmosInfo address={address} />
    </div>
  );
};

export default Dashboard;
