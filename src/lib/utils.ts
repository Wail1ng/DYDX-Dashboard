import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { formatDYDX } from "@/lib/formatter";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// export function formatDateToLocal(date: string) {
//   return new Date(date).toLocaleString()
// }
export const formatDateToLocal = (
  dateStr: string,
  locale: string = 'en-US',
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export function transformBalancesToChartData(balances: any[]) {
  return balances.map(balanceObj => {
    const timestamp = balanceObj.timestamp;

    // Sum up the delegation balances
    let totalDelegation: number = balanceObj.delegation.reduce((sum: number, delegationItem: any) => {
      const amount = parseFloat(delegationItem.balance.amount);
      return sum + amount;
    }, 0);
    return {
      timestamp: formatDateToLocal(timestamp),
      totalDelegation: formatDYDX(totalDelegation)
    };
  });
}
