// src/pages/StockDetails.tsx
import { useParams } from "react-router";
import OrderBook from "../components/OrderBook";
import PriceChart from "../components/PriceChart";
import StockHeader from "../components/StockHeader";
import TradeHistory from "../components/TradeHistory";

export default function StockDetails() {
  const { stockId = "" } = useParams();

  return (
    <div className="grid gap-4">
      <StockHeader symbol={stockId} />

      <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
        <PriceChart symbol={stockId} />
        <OrderBook symbol={stockId} />
      </div>

      <TradeHistory />
    </div>
  );
}