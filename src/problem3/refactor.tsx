interface WalletBalance {
  id: string; // added a unique identifier (UUID) for better key usage
  currency: string;
  amount: number;
  blockchain: string; // kept as string for unknown blockchains
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

type Blockchain = "Osmosis" | "Ethereum" | "Arbitrum" | "Zilliqa" | "Neo"; // defined known blockchain types

const WalletPage: React.FC = () => {
  const balances = useWalletBalances();
  const prices = usePrices();

  const getPriority = (blockchain: Blockchain | string): number => {
    switch (blockchain) {
      case "Osmosis":
        return 100;
      case "Ethereum":
        return 50;
      case "Arbitrum":
        return 30;
      case "Zilliqa":
        return 20;
      case "Neo":
        return 20;
      default:
        return -99;
    }
  };

  const sortedAndFormattedBalances = useMemo(() => {
    return balances
      .filter(
        (balance) => balance.amount > 0 && getPriority(balance.blockchain) > -99
      ) // filtering out non-positive amounts and low-priority blockchains
      .sort(
        (lhs, rhs) => getPriority(rhs.blockchain) - getPriority(lhs.blockchain)
      ) // sorting by priority in descending order
      .map((balance) => ({
        ...balance,
        formatted: balance.amount.toFixed(2), // formatting amount to two decimal places
      }));
  }, [balances, prices]);

  const rows = sortedAndFormattedBalances.map((balance) => {
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow
        key={balance.id} // using unique id for better key handling
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    );
  });

  return <div>{rows}</div>;
};
