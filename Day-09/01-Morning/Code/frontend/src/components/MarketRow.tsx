// src/components/MarketRow.tsx
import { Link } from "react-router";
import { formatPair, formatPrice } from "../lib/format";

type MarketRowProps = {
  symbol: string;
  lastPrice: string;
  priceChangePercent: string;
};

export default function MarketRow({ symbol, lastPrice, priceChangePercent }: MarketRowProps) {
  const change = Number(priceChangePercent);

  return (
    <Link
      to={`/stocks/${symbol}`}
      className="grid grid-cols-3 px-4 py-3 hover:bg-zinc-800/60"
    >
      <span className="font-medium">{formatPair(symbol)}</span>
      <span className="text-right tabular-nums">{formatPrice(lastPrice)}</span>
      <span className={`text-right tabular-nums ${change >= 0 ? "text-lime-300" : "text-red-400"}`}>
        {change >= 0 ? "+" : ""}
        {change.toFixed(2)}%
      </span>
    </Link>
  );
}