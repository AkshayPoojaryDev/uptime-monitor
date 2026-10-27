/**
 * checker.ts — Core HTTP check logic.
 * Called by the cron API route to probe each active monitor.
 */

export interface CheckResult {
  monitorId: string;
  url: string;
  status: number | null;
  latencyMs: number;
  ok: boolean;
  checkedAt: Date;
  error?: string;
}

/**
 * Probe a single URL and return timing + status.
 */
export async function checkUrl(
  monitorId: string,
  url: string,
  timeoutMs = 10_000
): Promise<CheckResult> {
  const start = Date.now();
  let status: number | null = null;
  let error: string | undefined;
  let ok = false;

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    const res = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      signal: controller.signal,
    });
    clearTimeout(timer);
    status = res.status;
    ok = res.ok;
  } catch (err) {
    error = err instanceof Error ? err.message : String(err);
  }

  return {
    monitorId,
    url,
    status,
    latencyMs: Date.now() - start,
    ok,
    checkedAt: new Date(),
    error,
  };
}

/**
 * Fetch all active monitors, run checks concurrently, and persist results.
 */
export async function runChecks(): Promise<CheckResult[]> {
  // TODO: import { listMonitors, saveCheckResult } from '@/lib/firestore';
  // const monitors = await listMonitors();
  // const results = await Promise.all(
  //   monitors.map((m) => checkUrl(m.id, m.url))
  // );
  // await Promise.all(results.map(saveCheckResult));
  // return results;
  return [];
}
