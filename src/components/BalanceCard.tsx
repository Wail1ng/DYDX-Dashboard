"use client";
import { useBalanceData } from "@/hooks/dydx/useBalanceData";

export function BalanceCard({ address }: { address: string }) {
  const { data, loading, error } = useBalanceData(address, "dydx");

  if (loading) return <div>Chargement du solde...</div>;
  if (error)
    return <div>Erreur lors du chargement du solde: {error.message}</div>;

  return (
    <div
      style={{
        border: "1px solid black",
        padding: "1rem",
        margin: "1rem 0",
        textAlign: "left",
      }}
    >
      <h2>Balance Info</h2>
      <p>Amount: {data?.balance?.amount}</p>
      <p>Denom: {data?.balance?.denom}</p>
    </div>
  );
}

export default BalanceCard;
