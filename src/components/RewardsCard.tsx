import { formatUSDC } from '@/lib/formatter';
import { getRewardsData } from "@/services/dydx"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export async function RewardsCard({ address }: { address: string }) {
const data = await getRewardsData(address);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Claimable Rewards</CardTitle>
      </CardHeader>
      <CardContent>
      <p>{formatUSDC(data?.total?.find(item => item.denom === "ibc/8E27BA2D5493AF5636760E354E46004562C46AB7EC0CC4C1CA14E9E20E2545B5")?.amount)} USDC</p>
      </CardContent>
    </Card>
  );
}

export default RewardsCard;
