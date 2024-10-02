export const formatNumber = (value: string) => {
    try {
      const num = BigInt(value);
      const dydx = Number(num) / 1e18;
      return dydx.toLocaleString(undefined, { 
        minimumFractionDigits: 2,
        maximumFractionDigits: 2 
      });
    } catch (error) {
      console.error('Error formatting number:', error);
      return '0.00';
    }
  };

