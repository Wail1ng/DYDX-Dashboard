"use client";
import React from "react";
import { useDelegatorData } from "@/hooks/dydx/useDelegatorData";

export function DelegatorCard({
  delegator_address,
}: {
  delegator_address: string;
}) {
  const { data, loading, error } = useDelegatorData(delegator_address);

  if (loading) return <div>Chargement des récompenses...</div>;
  if (error)
    return <div>Erreur lors du chargement des récompenses: {error.message}</div>;

  return (
    <div
    style={{
      border: "1px solid black",
      padding: "1rem",
      margin: "1rem 0",
      textAlign: "left",
    }}
  >
    <h2>Delegator Info</h2>
    {data?.validators.map((validator, index) => (
      <div key={index}>
        <p>Validator Address: {validator.operator_address}</p>
        <p>Moniker: {validator.description.moniker}</p>
        <p>Status: {validator.status}</p>
        <p>Tokens: {validator.tokens}</p>
        <p>Delegator Shares: {validator.delegator_shares}</p>
        <p>Commission Rate: {validator.commission.commission_rates.rate}</p>
        <p>Unbonding Height: {validator.unbonding_height}</p>
        <p>Unbonding Time: {new Date(validator.unbonding_time).toLocaleString()}</p>
        <p>Min Self Delegation: {validator.min_self_delegation}</p>
        <h4>Commission Info</h4>
        <p>Max Rate: {validator.commission.commission_rates.max_rate}</p>
        <p>Max Change Rate: {validator.commission.commission_rates.max_change_rate}</p>
        <p>Last Update Time: {new Date(validator.commission.update_time).toLocaleString()}</p>
      </div>
    ))}
    <h3>Pagination Info</h3>
    <p>Next Key: {data?.pagination.next_key}</p>
    <p>Total: {data?.pagination.total}</p>
  </div>
  );
}

export default DelegatorCard;
