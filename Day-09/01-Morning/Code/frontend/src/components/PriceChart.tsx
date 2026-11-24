// src/components/PriceChart.tsx
import { useEffect, useRef, useState } from "react";
import { CandlestickSeries, createChart, type ISeriesApi } from "lightweight-charts";
import { useKlines, type Interval } from "../hooks/useklines";

const INTERVALS: Interval[] = ["1m", "5m", "15m"];

export default function PriceChart({ symbol }: { symbol: string }) {
  const [activeInterval, setActiveInterval] = useState<Interval>("1m");
  const { data: candles, error } = useKlines(symbol, activeInterval);
  const containerRef = useRef<HTMLDivElement>(null);
  const seriesRef = useRef<ISeriesApi<"Candlestick">>(null);

  useEffect(() => {
    const chart = createChart(containerRef.current!, {
      autoSize: true,
      layout: { background: { color: "#181c19" }, textColor: "#a9b2a8" },
      grid: { vertLines: { color: "#262b26" }, horzLines: { color: "#262b26" } },
      timeScale: { timeVisible: true },
    });

    seriesRef.current = chart.addSeries(CandlestickSeries, {
      upColor: "#b5ed83",
      wickUpColor: "#b5ed83",
      downColor: "#f87171",
      wickDownColor: "#f87171",
      borderVisible: false,
    });

    return () => chart.remove();
  }, []);

  useEffect(() => {
    if (candles) seriesRef.current?.setData(candles);
  }, [candles]);

  return (
    <section className="panel flex flex-col">
      <div className="flex gap-2">
        {INTERVALS.map(value => (
          <button
            key={value}
            onClick={() => setActiveInterval(value)}
            className={value === activeInterval ? "btn-primary" : "btn-secondary"}
          >
            {value}
          </button>
        ))}
      </div>

      {error && <p role="alert" className="error mt-4">{error.message}</p>}

      <div ref={containerRef} className="mt-4 min-h-105 flex-1" />
    </section>
  );
}