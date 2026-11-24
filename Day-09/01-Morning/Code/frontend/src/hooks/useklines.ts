// src/hooks/useKlines.ts
import { useQuery } from "@tanstack/react-query";
import type { CandlestickData, UTCTimestamp } from "lightweight-charts";
import { binance } from "../lib/binance";

export type Interval = "1m" | "5m" | "15m";

type Kline = [number, string, string, string, string, ...unknown[]];

async function fetchKlines(symbol: string, interval: Interval): Promise<CandlestickData[]> {
  const { data } = await binance.get<Kline[]>("/klines", {
    params: { symbol, interval, limit: 120 },
  });

  return data.map(kline => ({
    time: (kline[0] / 1000) as UTCTimestamp,
    open: Number(kline[1]),
    high: Number(kline[2]),
    low: Number(kline[3]),
    close: Number(kline[4]),
  }));
}

export function useKlines(symbol: string, interval: Interval) {
  return useQuery({
    queryKey: ["klines", symbol, interval],
    queryFn: () => fetchKlines(symbol, interval),
    refetchInterval: 2_000,
  });
}