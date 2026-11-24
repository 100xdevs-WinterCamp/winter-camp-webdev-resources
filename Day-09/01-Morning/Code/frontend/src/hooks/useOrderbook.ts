// src/hooks/useOrderbook.ts
import { useQuery } from "@tanstack/react-query";
import { binance } from "../lib/binance";

export type Order = [price: string, quantity: string];

type Orderbook = {
  lastUpdateId: number;
  bids: Order[];
  asks: Order[];
};

async function fetchOrderbook(symbol: string): Promise<Orderbook> {
  const { data } = await binance.get("/depth", {
    params: { symbol, limit: 10 },
  });
  return data;
}

export function useOrderbook(symbol: string) {
  return useQuery({
    queryKey: ["orderbook", symbol],
    queryFn: () => fetchOrderbook(symbol),
    refetchInterval: 2_000,
  });
}