// src/pages/Stocks.tsx
import MarketRow from "../components/MarketRow";

const markets = [
  { symbol: "BTCUSDT", lastPrice: "62962.01000000", priceChangePercent: "-0.442" },
  { symbol: "ETHUSDT", lastPrice: "1780.78000000", priceChangePercent: "0.444" },
  { symbol: "SOLUSDT", lastPrice: "74.30000000", priceChangePercent: "0.392" },
  { symbol: "DOGEUSDT", lastPrice: "0.09412000", priceChangePercent: "-1.250" },
];

export default function Stocks() {
  return (
    <section className="panel">
      <h1 className="page-title">Spot markets</h1>
      <p className="mt-3 text-zinc-400">Live prices from Binance, updated every 10 seconds.</p>

      <div className="mt-8 overflow-hidden rounded-lg border border-zinc-800">
        <div className="grid grid-cols-3 bg-zinc-900 px-4 py-3 text-sm text-zinc-400">
          <span>Pair</span>
          <span className="text-right">Last price</span>
          <span className="text-right">24h change</span>
        </div>

        <div className="divide-y divide-zinc-800">
          {markets.map(market => (
            <MarketRow key={market.symbol} {...market} />
          ))}
        </div>
      </div>
    </section>
  );
}