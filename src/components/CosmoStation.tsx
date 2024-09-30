'use client';

import { useState, useEffect } from 'react';
const BASE_URL = 'https://apis.mintscan.io/v1';

type CosmosInfoProps = {
  address: string;
}

export default function CosmosInfo({ address }: CosmosInfoProps) {
    const token = process.env.REACT_APP_COSMOSTATION_API_KEY;
    const [balances, setBalances] = useState([]);
  async function fetchBalances() {
  try {
   const response = await fetch(
    `${BASE_URL}/dydx/accounts/${address}/balances`,
    {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${token}`
        }
    }
    );

    const data = await response.json();
    setBalances(data);
  } catch (error) {
    console.error('Erreur lors de la récupération des balances:', error);
  }
}
  useEffect(() => {
    fetchBalances();
  }, []);

  return (
    <div>
      <h1>Informations sur les balances</h1>
      <ul>
        {JSON.stringify(balances)}
      </ul>
    </div>
  );
}