// src/components/OrderBook.tsx
import { useOrderbook, type Order } from "../hooks/useOrderbook";
import { formatPrice } from "../lib/format";

function OrderRows({ orders, color }: { orders: Order[]; color: string }) {
  return (
    <ul className="text-sm tabular-nums">
      {orders.map(([price, quantity]) => (
        <li key={price} className="flex justify-between py-0.5">
          <span className={color}>{formatPrice(price)}</span>
          <span className="text-zinc-300">{Number(quantity)}</span>
        </li>
      ))}
    </ul>
  );
}

export default function OrderBook({ symbol }: { symbol: string }) {
  const { data, isPending, error } = useOrderbook(symbol);

  return (
    <section className="panel">
      <h2 className="text-lg font-semibold">Order book</h2>

      <div className="mt-4 flex justify-between text-xs text-zinc-500">
        <span>Price (USDT)</span>
        <span>Amount</span>
      </div>

      {isPending && <p className="mt-4 text-zinc-400">Loading…</p>}
      {error && <p role="alert" className="error mt-4">{error.message}</p>}

      {data && (
        <div className="mt-2 grid gap-3">
          <OrderRows orders={[...data.asks].reverse()} color="text-red-400" />
          <OrderRows orders={data.bids} color="text-lime-300" />
        </div>
      )}
    </section>
  );
}