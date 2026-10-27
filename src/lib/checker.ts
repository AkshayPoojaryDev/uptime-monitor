// src/lib/checker.ts
export type CheckResult = {
  monitorId: string;
  status: "up" | "down";
  statusCode: number | null;
  responseMs: number;
  checkedAt: number;
  error?: string;
};

export async function checkUrl(
  monitorId: string,
  url: string,
  timeoutMs = 10_000
): Promise<CheckResult> {
  const start = Date.now();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, { signal: controller.signal });
    return {
      monitorId,
      status: res.ok ? "up" : "down",
      statusCode: res.status,
      responseMs: Date.now() - start,
      checkedAt: start,
    };
  } catch (err) {
    return {
      monitorId,
      status: "down",
      statusCode: null,
      responseMs: Date.now() - start,
      checkedAt: start,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  } finally {
    clearTimeout(timer);
  }
}