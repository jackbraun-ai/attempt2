import { NextResponse } from 'next/server';
import yahooFinance from 'yahoo-finance2';

type OhlcRow = {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  timestamp: number;
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const symbol = searchParams.get('symbol') || 'GME';
    const yearsParam = searchParams.get('years') || '10';
    const years = Math.max(1, Math.min(50, parseInt(yearsParam, 10) || 10));

    const now = new Date();
    const from = new Date(now);
    from.setFullYear(now.getFullYear() - years);

    const results = await yahooFinance.historical(symbol, {
      period1: from,
      period2: now,
      interval: '1d'
    });

    type YahooHistoricalRow = {
      date: Date | string;
      open?: number | null;
      high?: number | null;
      low?: number | null;
      close?: number | null;
      volume?: number | null;
    };

    const rows: OhlcRow[] = ((results as unknown as YahooHistoricalRow[]) || [])
      .filter((r: YahooHistoricalRow) => r && typeof r.close === 'number' && typeof r.high === 'number' && typeof r.low === 'number')
      .map((r: YahooHistoricalRow) => {
        const d = new Date(r.date);
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const dd = String(d.getDate()).padStart(2, '0');
        return {
          date: `${yyyy}-${mm}-${dd}`,
          open: Number(r.open ?? r.close),
          high: Number(r.high),
          low: Number(r.low),
          close: Number(r.close),
          volume: Number(r.volume ?? 0),
          timestamp: d.getTime()
        };
      })
      .sort((a, b) => a.timestamp - b.timestamp);

    return NextResponse.json({ symbol, years, count: rows.length, rows });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { error: 'Failed to fetch data', details: message },
      { status: 500 }
    );
  }
}


