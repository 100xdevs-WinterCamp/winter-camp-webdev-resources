import MarketRow from "../components/MarketRow";
import { useMarkets } from "../hooks/useMarkets";

const SYMBOLS = [
  "BTCUSDT",
  "ETHUSDT",
  "BNBUSDT",
  "SOLUSDT",
  "XRPUSDT",
  "DOGEUSDT",
  "ADAUSDT",
  "TRXUSDT",
  "LINKUSDT",
  "AVAXUSDT",
];

export default function Stocks() {
  const { data: markets, isPending, error } = useMarkets(SYMBOLS);

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

        {isPending && <p className="px-4 py-6 text-zinc-400">Loading markets…</p>}
        {error && <p role="alert" className="error px-4 py-6">{error.message}</p>}

        <div className="divide-y divide-zinc-800">
          {markets?.map(market => (
            <MarketRow key={market.symbol} {...market} />
          ))}
        </div>
      </div>
    </section>
  );
}