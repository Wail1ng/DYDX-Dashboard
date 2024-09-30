import { getBalances } from '@/lib/comsostation';

type CosmosInfoProps = {
  address: string;
}

export default async function CosmosInfo({ address }: CosmosInfoProps) {
    // TODO ADD TOKEN
    const token = process.env.REACT_APP_COSMOSTATION_API_KEY
    const balances = await getBalances(address, token);

    return (
      <div>
        <h1>Informations sur les balances</h1>
        <ul>
          {JSON.stringify(balances)}
        </ul>
      </div>
    );
}