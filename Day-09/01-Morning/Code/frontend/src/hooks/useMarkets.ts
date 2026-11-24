// src/hooks/useMarkets.ts
import { useQuery } from "@tanstack/react-query";
import { binance } from "../lib/binance";

export type Market = {
  symbol: string;
  lastPrice: string;
  priceChangePercent: string;
};

async function fetchMarkets(symbols: string[]): Promise<Market[]> {
  const { data } = await binance.get("/ticker/24hr", {
    params: { symbols: JSON.stringify(symbols) },
  });
  return data;
}

export function useMarkets(symbols: string[]) {
  return useQuery({
    queryKey: ["markets", symbols],
    queryFn: () => fetchMarkets(symbols),
    refetchInterval: 10_000,
  });
}