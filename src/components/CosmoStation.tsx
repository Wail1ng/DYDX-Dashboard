import { formatDYDX } from '@/lib/formatter';
import { getBalances } from '@/services/mintscan';
import { ComponentChart } from '@/components/Chart';
import { formatDateToLocal } from '@/lib/utils';

type CosmosInfoProps = {
  address: string;
}

function sumDelegations(balances: any[]) {
  return balances.map(balanceObj => {
    // Pour chaque objet dans le tableau balances
    const totalDelegation = balanceObj.delegation.reduce((sum: number, delegationItem: any) => {
      // Convertir le montant de string en number et l'ajouter à la somme
      const amount = parseFloat(delegationItem.balance.amount);
      return sum + amount;
    }, 0);

    return {
      timestamp: balanceObj.timestamp,
      totalDelegation
    };
  });
}
function transformBalancesToChartData(balances: any[]) {
  return balances.map(balanceObj => {
    const timestamp = balanceObj.timestamp;

    // Sum up the delegation balances
    let totalDelegation: number = balanceObj.delegation.reduce((sum: number, delegationItem: any) => {
      const amount = parseFloat(delegationItem.balance.amount);
      return sum + amount;
    }, 0);
    return {
      timestamp: formatDateToLocal(timestamp),
      totalDelegation:formatDYDX(totalDelegation)
    };
  });
}

export default async function CosmosInfo({ address }: CosmosInfoProps) {

    const token = process.env.REACT_APP_COSMOSTATION_API_KEY;
    if (!token) {
        throw new Error("REACT_APP_COSMOSTATION_API_KEY is not defined");
    }
    const balances = await getBalances(address, token);

    const delegationSums = sumDelegations(balances.balances);
    const grandTotal = delegationSums.reduce((total, item) => total + item.totalDelegation, 0);
    const chartData = transformBalancesToChartData(balances.balances);

    return (
      <div>
        <h1>Informations sur les balances</h1>
          <ComponentChart chartData={chartData} />
          <ul> 
          {delegationSums.map((delegationSum, index) => (
            <div key={index}>
              <li>Timestamp: {delegationSum.timestamp}</li>
              <li>Total Delegation: {formatDYDX(delegationSum.totalDelegation)}</li>
            </div>
          ))}
        </ul>
      </div>
    );
}