import { formatUSDC } from '@/lib/formatter';
import { getRewardsData } from "@/services/dydx"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export async function RewardsCard({ address }: { address: string }) {
  try {
    const data = await getRewardsData(address);

    // @ts-ignore
    if (!data.total) {
      return (
        <Card className="bg-gray-50">
          <CardHeader>
            <CardTitle>Claimable Rewards</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">No Claimable Rewards available</p>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card>
        <CardHeader>
          <CardTitle>Claimable Rewards</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-2">
            <img src="USDCoin.svg" alt="USDC" width={24} height={24} />
            <p>{formatUSDC(data?.total?.find(item => item.denom === "ibc/8E27BA2D5493AF5636760E354E46004562C46AB7EC0CC4C1CA14E9E20E2545B5")?.amount)} USDC</p>
          </div>
        </CardContent>
      </Card>
    );
  } catch (error) {
    return (
      <Card className="bg-red-50">
        <CardHeader>
          <CardTitle>Claimable Rewards</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">Error loading Claimable Rewards data</p>
        </CardContent>
      </Card>
    );
  }
}

export default RewardsCard;
