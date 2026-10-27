/**
 * stats.ts — Uptime percentage and latency percentile calculations.
 * Works purely on in-memory arrays of CheckRecord; no Firestore dependency.
 */

export interface CheckRecord {
  ok: boolean;
  latencyMs: number;
  checkedAt: Date;
}

/**
 * Calculate uptime percentage over the supplied check records.
 * Returns a value in [0, 100].
 */
export function uptimePercent(records: CheckRecord[]): number {
  if (records.length === 0) return 100;
  const successes = records.filter((r) => r.ok).length;
  return (successes / records.length) * 100;
}

/**
 * Calculate a latency percentile (default p95) across all records.
 * @param records   Array of check records.
 * @param percentile 0–100 (e.g. 95 for p95).
 */
export function latencyPercentile(
  records: CheckRecord[],
  percentile = 95
): number {
  if (records.length === 0) return 0;
  const sorted = [...records].sort((a, b) => a.latencyMs - b.latencyMs);
  const idx = Math.ceil((percentile / 100) * sorted.length) - 1;
  return sorted[Math.max(0, idx)].latencyMs;
}

/**
 * Convenience: return both uptime % and p95 latency for a set of records.
 */
export function computeStats(records: CheckRecord[]): {
  uptimePct: number;
  p95LatencyMs: number;
} {
  return {
    uptimePct: uptimePercent(records),
    p95LatencyMs: latencyPercentile(records, 95),
  };
}
