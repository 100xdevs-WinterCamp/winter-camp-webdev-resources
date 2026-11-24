// src/components/StockHeader.tsx
import { useMarkets } from "../hooks/useMarkets";
import { formatPair, formatPrice } from "../lib/format";

export default function StockHeader({ symbol }: { symbol: string }) {
  const { data, error } = useMarkets([symbol]);
  const market = data?.[0];
  const change = Number(market?.priceChangePercent ?? 0);

  return (
    <header className="panel flex flex-wrap items-baseline gap-x-6 gap-y-2">
      <h1 className="text-2xl font-semibold">{formatPair(symbol)}</h1>

      {market && (
        <>
          <span className="text-2xl tabular-nums">{formatPrice(market.lastPrice)}</span>
          <span className={change >= 0 ? "text-lime-300" : "text-red-400"}>
            {change >= 0 ? "+" : ""}
            {change.toFixed(2)}% today
          </span>
        </>
      )}

      {error && <p role="alert" className="error">{error.message}</p>}
    </header>
  );
}