import React from "react";
import { getDelegatorData } from "@/services/dydx";
import { formatNumber } from "@/lib/formatter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

export async function DelegationCard({
  delegator_address,
}: {
  delegator_address: string;
}) {
  try {
    const data = await getDelegatorData(delegator_address);

    if (!data.data) {
      return (
        <Card className="bg-gray-50">
          <CardHeader>
            <CardTitle>Validators data</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">No validators data available</p>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Validators data</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] w-full">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">Validator</TableHead>
                  <TableHead className="text-right">Staked Amount</TableHead>
                  <TableHead className="text-right">Commission</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.data?.validators.map((validator: any, index: number) => (
                  <TableRow key={validator.operator_address}>
                    <TableCell className="font-medium">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {validator.description.moniker.slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <a
                            href={validator.description.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium hover:underline"
                          >
                            {validator.description.moniker}
                          </a>
                          <span className="text-sm text-gray-500 truncate max-w-[200px]">
                            {validator.description.details}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="font-medium">
                        {parseFloat(validator.delegator_shares).toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500">DYDX</div>
                    </TableCell>
                    <TableCell className="text-right">
                      {(parseFloat(validator.commission.commission_rates.rate) * 100).toFixed(2)}%
                    </TableCell>
                    <TableCell className="text-right">
                      <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${validator.status === "BOND_STATUS_BONDED"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                        }`}>
                        {validator.status === "BOND_STATUS_BONDED" ? "Active" : "Inactive"}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    );
  } catch (error) {
    return (
      <Card className="bg-gray-50">
        <CardHeader>
          <CardTitle>Validators data</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">Error loading validators data</p>
        </CardContent>
      </Card>
    );
  }
}

export default DelegationCard;