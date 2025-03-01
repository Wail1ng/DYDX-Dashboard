import React from "react";
import { getDelegatorData } from "@/services/dydx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export async function DelegatorCard({
  delegator_address,
}: {
  delegator_address: string;
}) {
  const data = await getDelegatorData(delegator_address);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Delegator Info</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[330px] pr-4">
          {data?.validators.map((validator: any, index: number) => (
            <React.Fragment key={index}>
              {index > 0 && <Separator className="my-4" />}
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Avatar>
                    <AvatarFallback>{validator.description.moniker.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <h3 className="text-lg font-semibold"><a href={validator.description.website} target="_blank">{validator.description.moniker}</a></h3>
                </div>
                <div className="flex items-center space-x-2">
                  <p>{validator.description.details}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">Delegator Shares</Badge>
                  <span>{parseFloat(validator.delegator_shares).toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">Commission Rate</Badge>
                  <span>{(parseFloat(validator.commission.commission_rates.rate) * 100).toFixed(2)}%</span>
                </div>
              </div>
            </React.Fragment>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

export default DelegatorCard;
