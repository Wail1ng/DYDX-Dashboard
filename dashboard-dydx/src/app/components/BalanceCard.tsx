"use client"
import { useEffect, useState } from "react"

export function BalanceCard({address}) {
console.log(address)
const [data, setData] = useState(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
useEffect(() => {
    let isMounted = true;

    const fetchBalanceData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://dydx-rest.publicnode.com/cosmos/bank/v1beta1/balances/${address}/by_denom?denom=adydx`
        );
        const result = await response.json();
        console.log("result",result)
        if (isMounted) {
          setData(result);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error ? err : new Error("An unknown error occurred")
          );
          setData(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    // fetchBalanceData();

    return () => {
      isMounted = false;
    };
})
    return (
        <div>
            <h2>Balance: {}</h2>
            <ul>
                <li>address: {address}</li>
            </ul>
        </div>
    )
}