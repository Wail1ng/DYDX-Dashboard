import { formatNumber } from '@/lib/formater';
import { getBalances } from '@/services/comsostation';

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

function formatDYDX(amount: number): string {
  // Convertir de atto-DYDX (10^-18) à DYDX
  const inDYDX = amount / 1e18;
  // Utiliser Intl.NumberFormat pour un formatage propre
  return new Intl.NumberFormat('fr-FR', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  }).format(inDYDX) + ' DYDX';
}


export default async function CosmosInfo({ address }: CosmosInfoProps) {

    const token = process.env.REACT_APP_COSMOSTATION_API_KEY
    const balances = await getBalances(address, token);

    const delegationSums = sumDelegations(balances.balances);
    const grandTotal = delegationSums.reduce((total, item) => total + item.totalDelegation, 0);
    console.log('Somme totale de toutes les délégations:', formatNumber(grandTotal.toString()));

    // delegationSums.forEach(item => {
    //   console.log(`Timestamp: ${item.timestamp}, Délégation: ${formatDYDX(item.totalDelegation)}`);
    // });
    console.log('Total des délégations:', formatDYDX(grandTotal));

    return (
      <div>
        <h1>Informations sur les balances</h1>
        <ul>
          {formatDYDX(grandTotal)}
        </ul>
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