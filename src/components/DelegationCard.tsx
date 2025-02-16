"use client"; // Ensuring this is a Client Component

import React, { useEffect, useState } from "react";
import { getDelegatorData, getStakingData } from "@/services/dydx";
import { formatNumber } from "@/lib/formatter"; // Import the formatNumber function
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

interface Validator {
  operator_address: string;
  description: {
    moniker: string;
    details: string;
    website: string;
  };
  commission: {
    commission_rates: {
      rate: string;
    };
  };
  status: string;
}

// Adding a type for staking balance
interface ValidatorWithBalance extends Validator {
  stakedBalance?: string;
}

export async function DelegationCard({
  delegator_address,
}: {
  delegator_address: string;
}) {
  const [validatorsWithBalance, setValidatorsWithBalance] = useState<ValidatorWithBalance[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch initial delegator data
        const data = await getDelegatorData(delegator_address);

        if (data?.data?.validators?.length) {
          // Fetch staked balances for each validator
          const validators = data.data.validators;
          const balances = await Promise.all(
            validators.map(async (validator: Validator) => {
              const stakingData = await getStakingData(delegator_address);
              const stakedBalance = stakingData?.data?.delegation_responses.find(
                (delegation) => delegation.delegation.validator_address === validator.operator_address
              )?.balance?.amount;

              return {
                ...validator,
                stakedBalance: stakedBalance || "0", // Default to "0" if no balance found
              };
            })
          );

          setValidatorsWithBalance(balances);
        }
      } catch (error) {
        console.error("Error fetching staking data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [delegator_address]);

  // Loading state
  if (loading) {
    return (
      <Card className="bg-gray-50">
        <CardHeader>
          <CardTitle>Loading Staked Balances...</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">Please wait while we fetch the data.</p>
        </CardContent>
      </Card>
    );
  }

  // If no data available
  if (!validatorsWithBalance.length) {
    return (
      <Card className="bg-gray-50">
        <CardHeader>
          <CardTitle>Staked Balances</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">No staked balances available</p>
        </CardContent>
      </Card>
    );
  }

  // Render the table with validators and staked balances
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Staked Balances</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Staked Amount</TableHead>
                <TableHead className="text-center">Validator</TableHead>
                <TableHead className="text-right">Commission</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {validatorsWithBalance.map((validator, index) => (
                <TableRow key={validator.operator_address}>
                  <TableCell className="text-center">
                    <div className="font-medium">
                      {/* Using formatNumber to format the staked balance */}
                      {formatNumber(parseFloat(validator.stakedBalance || "0"))} DYDX
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8"
      </Card>
